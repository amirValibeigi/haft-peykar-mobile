'use strict';

export interface JSONModelProps {
  [key: string]: unknown | undefined;
  mapTo?: {[key: string]: object} | undefined | null;
  helperMapTo?: {[key: string]: (obj: any) => any} | undefined | null;
  defMapTo?: {[key: string]: object} | undefined | null;
}
export interface JSONModelConstructableType {
  new (json?: unknown): JSONModel;
}

export default class JSONModel implements JSONModelProps {
  [key: string]: unknown | undefined;

  /**
   * @type {{[key:String]:Object}}
   * @example
   *
   * // map to object
   * mapTo={'test':TestModel}
   * nowMap()
   *
   * // map to object, ignore null
   * mapTo={'test!':TestModel}
   * nowMap()
   *
   * // map to Array object
   * mapTo={'test![]':TestModel}
   * nowMap()
   *
   */
  mapTo?: {[key: string]: object} | undefined | null;

  /**
   * @type {{[key:String]:Function}}
   * @example
   *
   * // map to object
   * mapTo={'permissions[]':TestModel}
   * helperMapTo={'permissions':(item)=>{return {title:item}}}
   * nowMap()
   */
  helperMapTo?: {[key: string]: (obj: any) => any} | undefined | null;

  /**
   * @type {{[key:String]:Object}}
   * @example
   *
   * // map to object
   * mapTo={'test!':TestModel}
   * defMapTo={'test':new TestModel()}
   * nowMap()
   *
   */
  defMapTo?: {[key: string]: object} | undefined | null;

  constructor(json: JSONModelProps | undefined | null = {}) {
    if (this.validate(json as JSONModel)) {
      Object.assign(this, json);
      this.loadExtra(json as JSONModel);
    }
  }

  validate(json?: JSONModel) {
    return json !== undefined && json !== null;
  }

  loadExtra(_json: JSONModel) {
    //ignore
  }

  /**
   *
   * @param {{[key:String]:String}} hash
   *
   * @example
   * id => appID, first_name => firstName
   * pass args as `{id: 'appID', first_name: 'firstName'}`
   */
  keyMapper(hash: {[key: string]: string}) {
    for (const key in hash) {
      if (this.hasOwnProperty(key)) {
        this[hash[key]] = this[key];
        delete this[key];
      }
    }
  }

  clone() {
    return Object.assign(Object.create(this), this);
  }

  nowMap() {
    if (this.mapTo) {
      for (const key in this.mapTo) {
        if (Object.hasOwnProperty.call(this.mapTo, key)) {
          const classElement: JSONModelConstructableType = this.mapTo[
            key
          ] as JSONModelConstructableType;
          const isIgnoreNull = key.includes('!');
          const isArray = key.includes('[]');
          const fKey: string = key.replace('[]', '').replace('!', '');

          if (isArray && (this[fKey] || isIgnoreNull)) {
            if (!(this[fKey] instanceof Array)) {
              throw Error(
                `JsonModel: property ${
                  Object.getPrototypeOf(this)?.constructor?.name
                }.${fKey} object not assignable to array`,
              );
            }

            this[fKey] = (
              (this[fKey] ?? this.defMapTo?.[fKey] ?? []) as Array<unknown>
            ).map(
              v =>
                new classElement(
                  (this.helperMapTo?.[fKey] &&
                    this.helperMapTo?.[fKey].call(null, v)) ??
                    v,
                ),
            );
            return;
          }

          if (this[fKey] || isIgnoreNull) {
            this[fKey] = new classElement(
              this[fKey] ?? this.defMapTo?.[fKey] ?? {},
            );
          }
        }
      }
    }
  }

  toObject() {
    try {
      return JSON.parse(JSON.stringify(this));
    } catch (error) {
      //ignore
    }
  }
}
