import EStyleSheet from 'react-native-extended-stylesheet';
import GlobalStyles from '@gs';

export const styles = EStyleSheet.create({
  container: {...GlobalStyles.mV4, ...GlobalStyles.pV4},
  containerSelect: {
    backgroundColor: '#ffffff22',
  },
  content: {
    ...GlobalStyles.rowReverse,
    ...GlobalStyles.pH12,
    ...GlobalStyles.g12,
  },
  lyIcon: {
    width: 25,
    aspectRatio: 1,
  },
  text: {
    ...GlobalStyles.text,
    color: 'white',
    fontSize: 18,
  },
});
