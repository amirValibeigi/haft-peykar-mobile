import EStyleSheet from 'react-native-extended-stylesheet';
import Colors from '@colors';
import memoize from 'lodash.memoize';

export const GlobalLightEStyles: EStyleSheet.AnyObject = {
  $color: Colors.blackE2E2,
  $fontFamily: 'iranssans',
  $fontSize: 14,
  $textAlign: 'right',
};

export const getGlobalLightEStyles = memoize(() =>
  EStyleSheet.create(GlobalLightEStyles),
);
