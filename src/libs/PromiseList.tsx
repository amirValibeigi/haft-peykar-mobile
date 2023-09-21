import {AssignRDMType} from '@models/ResponseDataModel';

export type Callback<T> = (
  result: boolean,
  value: T | undefined | null,
  index?: number,
  length?: number,
) => void;

export type CallbackFinally<T> = (
  result: Map<number, [boolean, T | undefined | null]>,
  length: number,
) => void;

export default class PromiseList<T> {
  listPromise = new Map<number, [boolean, T | undefined | null]>();
  accurate = true;
  private listKeyCalled: number[] = [];
  private _callback?: Array<Callback<T> | undefined> = [];
  private _callback_last?: Array<Callback<T> | undefined> = [];
  private _callback_finally?: Array<CallbackFinally<T> | undefined> = [];

  constructor(callback?: Callback<T>, accurate = true) {
    this._callback?.push(callback);
    this.accurate = accurate;
  }

  private _length = 0;

  get length() {
    return this._length;
  }

  set = (
    ...promises: (
      | Promise<T | AssignRDMType<T> | undefined | null>
      | undefined
      | null
      | false
    )[]
  ) => {
    this.clear();

    promises.forEach((promise, index) => {
      if (promise instanceof Promise) {
        promise.then(
          this._then.bind(this, index) as any,
          this._reject.bind(this, index),
        );
        this._length += 1;
      }
    });

    return this;
  };

  finally = (callback_finally?: CallbackFinally<T>) => {
    this._callback_finally?.push(callback_finally);

    return this;
  };

  last = (callback_last?: Callback<T>) => {
    this._callback_last?.push(callback_last);

    return this;
  };

  clear = () => {
    this.listPromise.clear();
    this.listKeyCalled = [];
    this._length = 0;

    return this;
  };

  private _then = (index: number, value?: T | undefined | null) => {
    this.listPromise.set(index, [true, value]);
    this._finally(index);
  };
  private _reject = (index: number, value?: T) => {
    this.listPromise.set(index, [false, value]);
    this._finally(index);
  };

  private _finally = (index: number) => {
    const _listKey = [...this.listPromise.keys()].map(v => Number(v)).sort();

    if (this.accurate) {
      const _pLKW = _listKey.reduce((pv, cv) => (cv - pv === 1 ? cv : pv), -1);
      const _keys = _listKey
        .filter(key => !this.listKeyCalled.includes(key))
        ?.filter(key => key <= _pLKW);

      _keys.forEach(key => {
        const _v = this.listPromise.get(key);
        this.safeCallFun(
          this._callback,
          _v?.[0] ?? false,
          _v?.[1],
          index,
          this._length,
        );

        this.listKeyCalled.push(key);
      });
    } else {
      const _v = this.listPromise.get(index);
      this.safeCallFun(
        this._callback,
        _v?.[0] ?? false,
        _v?.[1],
        index,
        this._length,
      );

      this.listKeyCalled.push(index);
    }

    if (_listKey.length === this._length) {
      this.safeCallFun(this._callback_finally, this.listPromise, this._length);

      if (this._callback_last) {
        const _v = this.listPromise.get(this._length - 1);
        if (_v) {
          this.safeCallFun(
            this._callback_last,
            _v[0],
            _v[1],
            this._length,
            this._length,
          );
        }
      }
    }
  };

  private safeCallFun(arr?: Array<any>, ...args: any) {
    arr?.forEach(fn => {
      if (typeof fn === 'function') {
        fn(...args);
      }
    });
  }
}
