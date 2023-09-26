import {PermissionsAndroid} from 'react-native';
import React, {DependencyList} from 'react';

/**
 * check and request permission
 * @param permissions short name PermissionsAndroid.request
 */
export const getPermission = async (
  ...permissions: Array<string | Array<string>>
) => {
  const vPermissions = permissions.flat();

  for (const vPermissionKey in vPermissions) {
    const vPermission = vPermissions[vPermissionKey];
    const resultCheck = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS[vPermission],
    );

    if (resultCheck) {
      continue;
    }

    const requestPer = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS[vPermission],
    );

    if (requestPer !== PermissionsAndroid.RESULTS.GRANTED) {
      return Promise.reject(false);
    }
  }
  return Promise.resolve(true);
};

export function deepAssign(...objects: any[]) {
  const isObject = (obj: any) => obj && typeof obj === 'object';

  return objects.reduce((prev, obj) => {
    if (typeof obj === 'undefined') {
      return prev;
    }

    Object.keys(obj).forEach(key => {
      const pVal = prev[key];
      const oVal = obj[key];

      if (Array.isArray(pVal) && Array.isArray(oVal)) {
        prev[key] = pVal.concat(...oVal);
      } else if (isObject(pVal) && isObject(oVal)) {
        prev[key] = deepAssign(pVal, oVal);
      } else {
        prev[key] = oVal;
      }
    });

    return prev;
  }, {});
}

export function deepClone<T>(obj: T, parser?: any) {
  if (parser) {
    return parser(JSON.parse(JSON.stringify(obj))) as T;
  }
  return JSON.parse(JSON.stringify(obj)) as T;
}

export function removeOfObject(object: any, ...names: string[]) {
  const _obj = {...object};

  names.forEach(name => {
    if (Object.hasOwnProperty.call(_obj, name)) {
      delete _obj[name];
    }
  });

  return _obj;
}

export function ModelToObj(model?: any) {
  try {
    return JSON.parse(JSON.stringify(model));
  } catch (error) {
    //ignore
  }
  return {};
}

export function transformObjectToGlobalStyle(
  name: string,
  obj: {[key: string]: any},
  ...objs: any
) {
  let newObj: {[key: string]: any} = {};
  Object.keys(obj).forEach(key => {
    newObj[`$${name}_${key}`] = obj[key];
  });

  return Object.assign(newObj, ...objs);
}

interface DebounceCallback<T> {
  (...args: Array<T>): void;
}

export function debounceInput<T>(
  callback: DebounceCallback<T>,
  delay = 1000,
): DebounceCallback<T> {
  let timeout: NodeJS.Timeout;

  return ((...args: T[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      callback(...args);
    }, delay);
  }) as any;
}

export function useDebounceInput<T extends Function>(
  callback: T,
  delay = 1000,
  deps: DependencyList,
): T {
  const refTimeout = React.useRef<NodeJS.Timeout>();

  const makerFunc = React.useCallback(
    (...args: any[]) => {
      if (refTimeout.current) {
        clearTimeout(refTimeout.current);
      }

      refTimeout.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [delay, ...(deps ?? [])],
  );

  return makerFunc as any;
}

export type TFormatData<T> =
  | T
  | {
      id: string;
      _empty: boolean;
    };

export function formatData<T>(data?: T[], numColumns = 2) {
  const vData: Array<TFormatData<T>> = [...(data ?? [])];

  if (vData.length === 0) {
    return data;
  }

  const numberOfFullRows = Math.floor(vData!.length / numColumns);

  let numberOfElementsLastRow = vData!.length - numberOfFullRows * numColumns;
  while (
    numberOfElementsLastRow !== numColumns &&
    numberOfElementsLastRow !== 0
  ) {
    vData!.push({
      id: `blank_${numberOfElementsLastRow}`,
      _empty: true,
    });
    numberOfElementsLastRow++;
  }

  return vData;
}
