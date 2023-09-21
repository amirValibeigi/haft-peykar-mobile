import {DeepKey, DeepValue, PropToArray} from 'types/Utils';

import JSONMaker from '@libs/JSONMaker';

import JSONModel from './JSONModel';

export const DEFAULT_ROWS = 10;

export type FilterObjectType = {[key: string]: object | object[]};

type FiltersType<T extends object> = {
  [K in DeepKey<T>]: K extends keyof T
    ? PropToArray<T[K]>
    : Array<DeepValue<T, K>>;
};

type OnlyKeys<T extends object> = keyof FiltersType<T>;
interface FilterModelType<T extends object> {
  filters?: Partial<FiltersType<T>>;
  first?: number;
  rows?: number;
  accurate?: boolean;
  sortField?: string;
  sortOrder?: 'ASC' | 'DESC';
  removeVarNull?: boolean;
  dataMode?: 0 | 1 | 2;
  removeVars?: string[];
  [key: string]: unknown | undefined;
}

export default class FilterModel<T extends object> extends JSONModel {
  static safeInstance: (obj?: Partial<FilterModel<any>>) => FilterModel<any>;
  [key: string]: unknown | undefined;

  declare filters?: Partial<FiltersType<T>>;

  declare first?: number;

  declare rows?: number;

  declare accurate?: boolean;

  declare sortField?: keyof T | string;

  declare sortOrder?: 'ASC' | 'DESC';

  declare removeVarNull?: boolean;

  declare removeVars?: string[];

  declare dataMode?: 0 | 1 | 2;

  constructor(props: FilterModelType<T>) {
    super(props);

    if (typeof props?.first === 'undefined') {
      this.first = 0;
    }
    if (typeof props?.rows === 'undefined') {
      this.rows = DEFAULT_ROWS;
    }
    if (typeof props?.accurate === 'undefined') {
      this.accurate = false;
    }
    if (typeof props?.sortOrder === 'undefined') {
      this.sortOrder = 'DESC';
    }
    if (typeof props?.sortField === 'undefined') {
      this.sortField = 'id';
    }
    if (typeof props?.removeVarNull === 'undefined') {
      this.removeVarNull = true;
    }
    if (typeof props?.dataMode === 'undefined') {
      this.dataMode = 0;
    }
  }

  makeParam = (): FilterModel<T> => {
    const jsonMaker = new JSONMaker();

    for (const key in this.filters) {
      if (Object.hasOwnProperty.call(this.filters, key)) {
        if (this.removeVarNull) {
          if (this.filters[key as OnlyKeys<T>] instanceof Array) {
            (this.filters[key as OnlyKeys<T>] as any) = (
              this.filters[key as OnlyKeys<T>] as Array<string>
            ).filter(item => !(!item || item?.length === 0));
          }

          if (
            !this.filters[key as OnlyKeys<T>] ||
            (this.filters[key as OnlyKeys<T>] as Array<string>)?.length === 0
          ) {
            continue;
          }
        }
        jsonMaker.addKey(key, this.filters[key as OnlyKeys<T>] as any);
      }
    }
    const tmp = jsonMaker.build();

    return {
      ...this,
      filters: tmp,
      makeParam: undefined,
      removeVarNull: undefined,
    };
  };

  removeVarsMP(...vars: string[] | string[][]) {
    const baseObject = this.makeParam();
    const _removesVar = (vars.length > 0 ? vars : this.removeVars) ?? [];

    _removesVar.flat()?.forEach(_keyRemove => {
      let _object = baseObject;
      const keys = JSONMaker.getKeys(_keyRemove);

      keys.forEach((__keyRemove, i) => {
        if (Object.hasOwnProperty.call(_object, __keyRemove)) {
          if (keys.length - 1 === i) {
            delete (_object as any)[__keyRemove];
            return;
          }
          _object = (_object as any)[__keyRemove];
        }
      });
    });

    return baseObject;
  }
}

FilterModel.safeInstance = (obj?: any) => {
  if (obj instanceof FilterModel) {
    return obj;
  }

  return new FilterModel(obj ?? {});
};
