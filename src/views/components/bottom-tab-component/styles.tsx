import GlobalStyles from '@gs';
import {getColor} from '@colors';
import EStyleSheet from 'react-native-extended-stylesheet';

export const styles = EStyleSheet.create({
  container: {
    ...GlobalStyles.rowReverseSpace,
    ...GlobalStyles.card,
    ...GlobalStyles.pV8,
    ...GlobalStyles.pH20,
    ...GlobalStyles.mB12,
    alignSelf: 'center',
    borderRadius: 20,
    width: '80%',
    position: 'absolute',
    bottom: 0,
    borderColor: getColor('blueLight1', {a: 0.05}),
    shadowColor: getColor('blueLight1', {a: 0.7}),
    borderWidth: 1,
  },
  buttonIcon: {
    ...GlobalStyles.center,
  },
  buttonIconTitle: {
    ...GlobalStyles.text,
    ...GlobalStyles.textCenter,
    fontSize: 11,
    color: '$color_primary',
  },
});
