import EStyleSheet from 'react-native-extended-stylesheet';
import GlobalStyles from '@gs';

export const styles = EStyleSheet.create({
  container: {backgroundColor: '$color_blueGrayDark'},
  line: {
    ...GlobalStyles.mV8,
    backgroundColor: 'white',
    flex: 1,
    height: 1,
  },
});
