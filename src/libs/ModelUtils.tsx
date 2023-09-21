import t from './Translate';

const ErrorProperties = ['error', 'errors', 'message', 'messages'];
export const STATUS = Object.freeze({
  ERROR: 'error',
  ERROR_ACCESS_DENIED: 'error_access_denied',
  ERROR_AUTH: 'error_auth',
  ERROR_DELETED: 'error_deleted',
  ERROR_RECORD: 'error_record',
  ERROR_UPDATED: 'error_updated',
  OTHER: 'other',
  SUCCESS: 'success',
  SUCCESS_DELETED: 'success_deleted',
  SUCCESS_RECORD: 'success_record',
  SUCCESS_UPDATED: 'success_updated',
});

function getStatus(message: string): string {
  switch (message) {
    case t('error.access_denied'):
      return STATUS.ERROR_ACCESS_DENIED;

    default:
      return STATUS.OTHER;
  }
}

/**
 * @param {Array<String>} messages
 * @param {any} obj
 * @param {String} name
 * @param {Array<Number>} getRange split messages (just Array obj) and return array or string
 */
function pushMessage(
  messages: Array<string>,
  obj: any,
  name: string,
  getRange?: Array<number>,
) {
  const element = obj[name];
  if (element !== undefined) {
    if (element instanceof Array) {
      if (getRange) {
        messages.push(...element.splice(getRange[0], getRange[1]));
        return;
      }

      messages.push(...element);
      return;
    }
    messages.push(element);
  }
}

/**
 *
 * @param obj
 * @param def
 * @param options
 * @param options.isArray false return array
 * @param options.isStatus false return [status:STATUS,messages:Array<String>]
 * @param options.properties Which one of the property
 * @param options.getRange split messages (just Array obj) and return array or string
 */
export function getMessage(
  obj?: any,
  def?: string,
  options?: Partial<{
    isArray: false;
    isStatus: boolean;
    properties: Array<string>;
    getRange: Array<number>;
  }>,
): string;
export function getMessage(
  obj?: any,
  def?: string,
  options?: Partial<{
    isArray: true;
    isStatus: boolean;
    properties: Array<string>;
    getRange: Array<number>;
  }>,
): (string | string[])[];
export function getMessage(
  obj?: any,
  def?: string,
  options?: Partial<{
    isArray: boolean;
    isStatus: boolean;
    properties: Array<string>;
    getRange: Array<number>;
  }>,
): string | (string | string[])[] {
  let messages: Array<string> = [];

  if (obj) {
    if (typeof obj === 'string') {
      messages = [obj];
    } else {
      (options?.properties ?? ErrorProperties).forEach(prop => {
        pushMessage(messages, obj, prop, options?.getRange);
      });
    }
  }

  if (def && messages.length === 0) {
    messages = [def];
  }

  if (options?.isArray === true) {
    return messages;
  }

  if (options?.isStatus === true) {
    return [getStatus(messages[0]), messages];
  }

  return messages[0];
}

export function compareObjects(...objs: any[]) {
  let index = 1;

  if (objs.length <= 1) {
    return true;
  }

  do {
    const firstObject = JSON.stringify(objs[index - 1] ?? {});
    const secondObject = JSON.stringify(objs[index] ?? {});

    if (firstObject !== secondObject) {
      return false;
    }

    index++;
  } while (index < objs.length);

  return true;
}

export function diffIds<O>(arrOne?: Array<any>, arrTwo?: Array<any>): Array<O> {
  let vArrOne: any = arrOne ?? [];
  let vArrTwo: any = arrTwo ?? [];

  if (typeof vArrOne[0] === 'object') {
    vArrOne = vArrOne.map((v: any) => v.id ?? -1);
  }

  if (typeof vArrTwo[0] === 'object') {
    vArrTwo = vArrTwo.map((v: any) => v.id ?? -1);
  }

  return [
    ...vArrOne.filter((item: any) => vArrTwo.indexOf(item) < 0 && item !== -1),
    ...vArrTwo.filter((item: any) => vArrOne.indexOf(item) < 0 && item !== -1),
  ] as O[];
}
