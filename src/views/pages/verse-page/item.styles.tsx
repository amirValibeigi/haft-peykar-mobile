import EStyleSheet from 'react-native-extended-stylesheet';
import GlobalStyles from '@gs';

export const styles = EStyleSheet.create({
  container: {
    ...GlobalStyles.mH20,
  },
  containerBottomSpace: {
    ...GlobalStyles.mB30,
    ...GlobalStyles.mH20,
  },
  title: {
    ...GlobalStyles.text,
  },
  titleLeft: {
    alignSelf: 'flex-start',
  },
});
