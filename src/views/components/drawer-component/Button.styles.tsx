import EStyleSheet from 'react-native-extended-stylesheet';
import GlobalStyles from '@gs';

export const styles = EStyleSheet.create({
  container: {...GlobalStyles.mV8},
  lyIcon: {
    width: 25,
    aspectRatio: 1,
  },
  content: {
    ...GlobalStyles.rowReverse,
    ...GlobalStyles.pH12,
    ...GlobalStyles.g12,
  },
  text: {
    ...GlobalStyles.text,
    color: 'white',
    fontSize: 18,
  },
});
