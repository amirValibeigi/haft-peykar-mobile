import {DeviceMax} from '@libs/Device';
import EStyle from 'react-native-extended-stylesheet';
import GlobalStyles from '@GlobalStyles';
import {getSizeScreen} from '@GlobalStyles';

const {width} = getSizeScreen();
const sizeImageLogo = width * 0.1;

export const styles = EStyle.create({
  appBar: {
    ...GlobalStyles.rowSpace,
    elevation: 0,
    shadowOffset: 0,
    shadowOpacity: 0,
  },
  containerIcons: {
    ...GlobalStyles.mE12,
    ...GlobalStyles.mS12,
    ...GlobalStyles.rowReverse,
    flex: 1,
    flexShrink: 0,
  },
  containerLogo: {
    ...GlobalStyles.mS8,
    ...GlobalStyles.row,
    flex: 1,
  },
  icon: {
    ...GlobalStyles.mH4,
  },
  imageLogo: {
    ...GlobalStyles.mE8,
    borderRadius: sizeImageLogo,
    height: sizeImageLogo,
    width: sizeImageLogo,
  },
  title: {
    ...GlobalStyles.mH4,
    ...GlobalStyles.text,
    ...GlobalStyles.textCenter,
    color: '#fff',
    fontSize: 18,

    [`@media ${DeviceMax.tabletL}`]: {
      fontSize: 16,
    },

    [`@media ${DeviceMax.mobileM}`]: {
      fontSize: 14,
    },
  },
});
