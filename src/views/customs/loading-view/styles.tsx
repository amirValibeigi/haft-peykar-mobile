import GlobalStyles, {getSizeScreen} from '@gs';
import EStyleSheet from 'react-native-extended-stylesheet';

const {width} = getSizeScreen();

const size = width * 0.2;

export const styles = EStyleSheet.create({
  container: {
    ...GlobalStyles.center,
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '$color_black4C4C33',
  },
  bg: {
    ...GlobalStyles.card,
    ...GlobalStyles.center,
    borderWidth: 1,
    borderColor: '$color_whiteEAEA',
  },
  img: {
    width: size,
    height: size,
  },
});
