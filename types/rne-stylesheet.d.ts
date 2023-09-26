import {Colors} from '@colors';
import {
  FlexStyle,
  ImageStyle,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from 'react-native';

export declare module 'react-native-extended-stylesheet' {
  type Event = 'build';

  type addPrefixToObject<T, P> = {
    [key: string]: keyof {[K in keyof T as `${P}${K}`]: T[K]};
  };

  type NamedStyles<T> = {
    [P in keyof T]:
      | ViewStyle
      | TextStyle
      | ImageStyle
      | FlexStyle
      | addPrefixToObject<Colors, '$color_'>
      | {
          [key: string]:
            | ViewStyle
            | TextStyle
            | ImageStyle
            | addPrefixToObject<Colors, '$color_'>;
        };
  };

  export function create<T extends NamedStyles<T> | NamedStyles<any>>(
    styles: T | NamedStyles<T>,
  ): T;

  export function build<T extends NamedStyles<T> | NamedStyles<any>>(
    rawGlobalVars?: T | NamedStyles<T>,
  ): void;

  export function value(expr: any, prop?: string): any;

  export function child<T extends NamedStyles<T> | NamedStyles<any>>(
    styles: T | NamedStyles<T>,
    styleName: string,
    index: number,
    count: number,
  ): T;

  export function subscribe(event: Event, listener: () => any): void;

  export function clearCache(): void;

  // inherited from StyleSheet
  export const flatten: typeof StyleSheet.flatten;
  export const setStyleAttributePreprocessor: typeof StyleSheet.setStyleAttributePreprocessor;
  export const hairlineWidth: typeof StyleSheet.hairlineWidth;
  export const absoluteFillObject: typeof StyleSheet.absoluteFillObject;
  export const absoluteFill: typeof StyleSheet.absoluteFill;
}
