export type addPrefixToObject<T, P> = {
  [K in keyof T as `${P}${K}`]: T[K];
};

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type DeepKey<
  T extends object,
  K extends keyof T = keyof T,
  SPLIT = '-',
> = K extends string | number
  ? T[K] extends infer R
    ?
        | `${K}`
        | (R extends Record<string, unknown>
            ? `${K}${SPLIT}${DeepKey<R>}`
            : never)
    : never // impossible route
  : never; // impossible route

export type DeepValue<
  T,
  P extends DeepKey<T>,
> = P extends `${infer K}-${infer Rest}`
  ? T[(K extends `${infer R extends number}` ? R : K) & keyof T] extends infer S
    ? S extends never // make S distributive to work with union object
      ? never
      : Rest extends DeepKey<S>
      ? DeepValue<S, Rest>
      : never // impossible route
    : never // impossible route
  : T[(P extends `${infer R extends number}` ? R : P) & keyof T];

export type IsBranch<T> = T extends {[k: string]: any}
  ? T extends any[]
    ? never
    : T
  : never;

export type PropToArray<S> = S extends IsBranch<S>
  ? Partial<{[K in keyof S]: PropToArray<S[K]>}>
  : S[];
