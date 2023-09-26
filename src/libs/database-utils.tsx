import QueryBuilder, {WhereOperatorType} from 'react-native-realm-query';

import Database from '@Database';
import FilterModel from '@models/filter.model';
import {JSONModelConstructableType} from '@models/json.model';
import Realm from 'realm';

import {deepAssign} from './utils';

export type ResultType<T> = Realm.Results<T & Realm.Object>;
export type ObjSchemaType<T> = ResultType<T> | (T & Realm.Object)[];

type anyObject = {[key: string]: any};
type withObjectType = {key: string; append: string; class: string};

export function globalFiltered<T extends object>(
  obj: QueryBuilder<T>,
  filter?: FilterModel<T>,
  schema?: string,
) {
  if (schema && filter?.filters) {
    if (Object.hasOwnProperty.call(filter?.filters, schema)) {
      const vObjFilter: any = (filter.filters as any)[schema];

      for (const vKey in vObjFilter) {
        if (Object.hasOwnProperty.call(vObjFilter, vKey)) {
          const vValues = vObjFilter[vKey] as any[];
          const vField = vKey.replace(`${schema}.`, '');

          vValues.forEach(vValue => {
            let vOperatorSql: WhereOperatorType = '=';

            if (vValue && vValue !== 'null') {
              if (!filter.accurate && !isFinite(vValue)) {
                vOperatorSql = 'CONTAINS';
              }
            }

            if (vValue && (vValue.o || vValue.v || vValue.v1)) {
              const [mV, mO] = getSafeOperator(vValue);

              if (mO === 'between') {
                return obj.orWhereBetween(vField, mV[0], mV[1]);
              }

              obj.orWhere(vField, mO, mV[0]);
              return;
            }

            obj.orWhere(
              vField,
              vOperatorSql,
              vValue === 'null' ? null : vValue,
            );
          });
        }
      }
    }
  }

  obj.when(filter?.sortOrder && filter.sortField, qb => {
    qb.sort(
      filter!.sortField as keyof T,
      filter!.sortOrder === 'DESC' ? 'DESC' : 'ASC',
    );
  });

  obj.when(filter?.first && filter?.rows, qb => {
    qb.limit(filter!.rows, filter!.first);
  });
}

function getSafeOperator(value: {o?: any; v?: any; v1?: any}) {
  if (!(value instanceof Array)) {
    return [value, '='];
  }

  let operator = '=';
  switch (value.o) {
    case '>':
      operator = '>';
      break;

    case '>=':
      operator = '>=';
      break;

    case '<':
      operator = '<';
      break;

    case '<=':
      operator = '<=';
      break;

    case '!':
    case '!=':
    case '<>':
      operator = '!=';
      break;

    case '~':
    case '~=':
    case 'like':
      operator = 'like';
      break;

    case '[]':
    case 'between':
      operator = 'between';
      break;

    default:
      break;
  }

  if (operator === 'between') {
    return [[value.v, value.v1], operator];
  }

  if (operator === 'like') {
    return [value.v, operator];
  }

  return [value.v, operator];
}

export function mapTo<T>(realm: any, obj: any, def?: T[]): T[] | undefined {
  if (!realm) {
    return def;
  }

  return JSON.parse(JSON.stringify(realm ?? [])).map((v: any) => {
    return new (obj as JSONModelConstructableType)(v);
  });
}

export function idMapTo<T>(objs: T | undefined | null): T | T[] | undefined {
  if (objs instanceof Array) {
    return objs.map(idMapTo);
  }

  if (objs) {
    if (Object.hasOwnProperty.call(objs, '_id')) {
      return objs;
    }

    return deepAssign(objs, {
      _id: new Realm.BSON.ObjectID(),
    });
  }
}

export function withClass<T>(
  obj: ObjSchemaType<T>,
  classes: string | string[] | withObjectType[],
): ObjSchemaType<T> {
  if (obj.length === 0) {
    return obj;
  }

  if (typeof classes === 'string') {
    return withClass(obj, (classes as string).split(','));
  }

  if (classes instanceof Array<string> && typeof classes[0] === 'string') {
    return withClass(
      obj,
      (classes as string[]).map((_class: string) => {
        const _key = _class
          .replace(/(ies)\b/g, 'y_id')
          .replace(/(s)\b/g, '_id');
        return {class: _class, key: _key, append: _key.replace(/(_id)\b/g, '')};
      }),
    );
  }
  (classes as withObjectType[]).forEach((_key: withObjectType) => {
    const _objects = Database.objects(_key.class).filtered(
      obj
        .map(_o => (_o as anyObject)[_key.key])
        .filter(_id => _id > 0)
        .map(_id => `id=${_id}`)
        .join(' or '),
    );

    for (let index = 0; index < obj.length; index++) {
      const element = obj[index];
      const _objectId = (element as anyObject)[_key.key];
      (element as anyObject)[_key.append] = _objects.find(
        _o => ((_o as anyObject)?.id ?? -1) === _objectId ?? -2,
      ) as any;
    }
  });

  return obj;
}
