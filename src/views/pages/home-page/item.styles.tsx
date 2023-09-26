import EStyleSheet from 'react-native-extended-stylesheet';
import GlobalStyles from '@gs';

export const styles = EStyleSheet.create({
  container: {
    ...GlobalStyles.m4,
    ...GlobalStyles.mH20,
  },
  title: {
    ...GlobalStyles.text,
  },
});
