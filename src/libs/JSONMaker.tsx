class JSONMaker {
  declare static getKeys: (key: string) => string[];
  #map: Map<string, object> = new Map();
  #keyNow = '';
  #indexMap: Map<string, number> = new Map();

  /**
   * @param {String} name key with - split keys
   * @example fullName-name => {fullName:{name:VALUE}}
   * @param {Object|Array<Object>} obj value
   * @returns {JSONMaker}
   */
  addKey(name: string, ...obj: any[]): JSONMaker {
    this.#keyNow = name;

    obj?.forEach(el => this.addValue(el));

    return this;
  }

  /**
   * @param {Object} obj value
   * @returns {JSONMaker}
   */
  addValue(obj: object): JSONMaker {
    let keyTmp = this.#keyNow;

    this.#indexMap.set(keyTmp, (this.#indexMap.get(keyTmp) ?? -1) + 1);

    keyTmp += `-${this.#indexMap.get(keyTmp) ?? 0}`;

    this.#map.set(keyTmp, obj);

    return this;
  }

  /**
   * export json
   * @returns {Object}
   */
  build() {
    // let tmp = Map();
    let tmp = {},
      done = {};

    this.#map.forEach((value, key) => {
      const keys = JSONMaker.getKeys(key);
      done = this.addToObject(value, keys, tmp);
    });

    return done;
  }

  buildJson() {
    return JSON.stringify(this.build());
  }

  /**
   * @private
   * @param {Object} value
   * @param {String[]} keys
   * @param {Object} obj
   * @returns {Object}
   */
  addToObject(value: object, keys: Array<string | number>, obj: any): object {
    const first = keys[0];
    const len = keys.length;

    if (len === 2) {
      const second = keys[1];
      if (second > 0) {
        if (second === 1) {
          obj[`${first}`] = [obj[`${first}`]];
        }
        if (obj[`${first}`] === undefined) {
          obj[`${first}`] = [];
        }

        (obj[`${first}`] as Array<object>).push(value);
      } else {
        obj[`${first}`] = value;
      }
    } else {
      if (isNaN(first as number)) {
        obj[`${first}`] = this.addToObject(
          value,
          keys.slice(1),
          obj[`${first}`] ?? {},
        );
      } else {
        obj[`${first}`] = value;
      }
    }

    return obj;
  }
}

JSONMaker.getKeys = (key: string) => key.split('-');

export default JSONMaker;
