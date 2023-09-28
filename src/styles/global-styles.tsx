import {Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Colors from '@colors';
import {transformObjectToGlobalStyle} from '@libs/utils';
import {GlobalLightEStyles} from '@themes';

EStyleSheet.build(
  transformObjectToGlobalStyle('color', Colors, GlobalLightEStyles),
);

export default EStyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 4,
    overflow: 'hidden',
    shadowColor: Colors.gray,
    shadowOffset: {
      height: 5,
      width: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 1,
  },
  center: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerH: {
    alignItems: 'center',
  },
  centerV: {
    justifyContent: 'center',
  },
  column: {
    flexDirection: 'column',
  },
  columnSpace: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  columnSpaceAround: {
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  dialog: {
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'rgba(1,1,1,0.3)',
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    width: '100%',
  },
  elevation: {
    elevation: 4,
    shadowColor: Colors.gray,
    shadowOffset: {
      height: 5,
      width: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 1,
  },
  fontIranSans: {
    fontFamily: 'iransans',
  },
  fontIranSansBold: {
    fontFamily: 'iransans_bold',
  },
  g12: {
    gap: 12,
  },
  g2: {
    gap: 2,
  },
  g20: {
    gap: 20,
  },
  g4: {
    gap: 4,
  },
  g40: {
    gap: 40,
  },
  g50: {
    gap: 50,
  },
  g8: {
    gap: 8,
  },
  gC12: {
    columnGap: 12,
  },
  gC2: {
    columnGap: 2,
  },
  gC20: {
    columnGap: 20,
  },
  gC4: {
    columnGap: 4,
  },
  gC40: {
    columnGap: 40,
  },
  gC50: {
    columnGap: 50,
  },
  gC8: {
    columnGap: 8,
  },
  gR12: {
    rowGap: 12,
  },
  gR2: {
    rowGap: 2,
  },
  gR20: {
    rowGap: 20,
  },
  gR4: {
    rowGap: 4,
  },
  gR40: {
    rowGap: 40,
  },
  gR50: {
    rowGap: 50,
  },
  gR8: {
    rowGap: 8,
  },
  line: {
    backgroundColor: Colors.primary,
    height: 2,
    width: '100%',
  },
  m12: {
    margin: 12,
  },
  m2: {
    margin: 2,
  },
  m20: {
    margin: 20,
  },
  m4: {
    margin: 4,
  },
  m40: {
    margin: 40,
  },
  m50: {
    margin: 50,
  },
  m8: {
    margin: 8,
  },
  mB: {
    marginBottom: 'auto',
  },
  mB12: {
    marginBottom: 12,
  },
  mB20: {
    marginBottom: 20,
  },
  mB30: {
    marginBottom: 30,
  },
  mB40: {
    marginBottom: 40,
  },
  mB8: {
    marginBottom: 8,
  },
  mE: {
    marginEnd: 'auto',
    marginRight: 'auto',
  },
  mE12: {
    marginEnd: 12,
    marginRight: 12,
  },
  mE2: {
    marginEnd: 2,
    marginRight: 2,
  },
  mE20: {
    marginEnd: 20,
    marginRight: 20,
  },
  mE4: {
    marginEnd: 4,
    marginRight: 4,
  },
  mE8: {
    marginEnd: 8,
    marginRight: 8,
  },
  mH: {
    marginEnd: 'auto',
    marginStart: 'auto',
  },
  mH12: {
    marginHorizontal: 12,
  },
  mH16: {
    marginHorizontal: 18,
  },
  mH2: {
    marginHorizontal: 2,
  },
  mH20: {
    marginHorizontal: 20,
  },
  mH20B6: {
    marginBottom: 6,
    marginHorizontal: 20,
  },
  mH30: {
    marginHorizontal: 30,
  },
  mH30B6: {
    marginBottom: 6,
    marginHorizontal: 30,
  },
  mH4: {
    marginHorizontal: 4,
  },
  mH40B6: {
    marginBottom: 6,
    marginHorizontal: 40,
  },
  mH8: {
    marginHorizontal: 8,
  },
  mS: {
    marginLeft: 'auto',
    marginStart: 'auto',
  },
  mS12: {
    marginLeft: 12,
    marginStart: 12,
  },
  mS4: {
    marginLeft: 4,
    marginStart: 4,
  },
  mS8: {
    marginLeft: 8,
    marginStart: 8,
  },
  mT: {
    marginTop: 'auto',
  },
  mT12: {
    marginTop: 12,
  },
  mT15: {
    marginTop: 15,
  },
  mT20: {
    marginTop: 20,
  },
  mT4: {
    marginTop: 4,
  },
  mT40: {
    marginTop: 40,
  },
  mT50: {
    marginTop: 50,
  },
  mT8: {
    marginTop: 8,
  },
  mV: {
    marginBottom: 'auto',
    marginTop: 'auto',
  },
  mV12: {
    marginVertical: 12,
  },
  mV2: {
    marginVertical: 2,
  },
  mV20: {
    marginVertical: 20,
  },
  mV4: {
    marginVertical: 4,
  },
  mV8: {
    marginVertical: 8,
  },
  p12: {
    padding: 12,
  },
  p2: {
    padding: 2,
  },
  p20: {
    padding: 20,
  },
  p4: {
    padding: 4,
  },
  p8: {
    padding: 8,
  },
  pB12: {
    paddingBottom: 12,
  },
  pB2: {
    paddingBottom: 2,
  },
  pB4: {
    paddingBottom: 4,
  },
  pB6: {
    paddingBottom: 6,
  },
  pB8: {
    paddingBottom: 8,
  },
  pE12: {
    paddingEnd: 12,
    paddingRight: 12,
  },
  pE20: {
    paddingEnd: 20,
    paddingRight: 20,
  },
  pE4: {
    paddingEnd: 4,
    paddingRight: 4,
  },
  pE8: {
    paddingEnd: 8,
    paddingRight: 8,
  },
  pH12: {
    paddingHorizontal: 12,
  },
  pH20: {
    paddingHorizontal: 20,
  },
  pH30: {
    paddingHorizontal: 30,
  },
  pH4: {
    paddingHorizontal: 4,
  },
  pH40: {
    paddingHorizontal: 40,
  },
  pH8: {
    paddingHorizontal: 8,
  },
  pS12: {
    paddingLeft: 12,
    paddingStart: 12,
  },
  pS20: {
    paddingLeft: 20,
    paddingStart: 20,
  },
  pS4: {
    paddingLeft: 4,
    paddingStart: 4,
  },
  pS8: {
    paddingLeft: 8,
    paddingStart: 8,
  },
  pT12: {
    paddingTop: 12,
  },
  pT2: {
    paddingTop: 2,
  },
  pT20: {
    paddingTop: 20,
  },
  pT4: {
    paddingTop: 4,
  },
  pT6: {
    paddingTop: 6,
  },
  pT8: {
    paddingTop: 8,
  },
  pV12: {
    paddingVertical: 12,
  },
  pV2: {
    paddingVertical: 2,
  },
  pV20: {
    paddingVertical: 20,
  },
  pV4: {
    paddingVertical: 4,
  },
  pV8: {
    paddingVertical: 8,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  rowReverse: {
    alignItems: 'center',
    flexDirection: 'row-reverse',
  },
  rowReverseSpace: {
    alignItems: 'center',
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
  },
  rowReverseSpaceAround: {
    alignItems: 'center',
    flexDirection: 'row-reverse',
    justifyContent: 'space-around',
  },
  rowSpace: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowSpaceAround: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  text: {
    color: '$color',
    fontFamily: '$fontFamily',
    textAlign: '$textAlign',
    fontSize: '$fontSize',
  },
  textBold: {
    color: Colors.blackE2E2,
    fontFamily: 'iransansBold',
    fontSize: 11,
    textAlign: 'right',
  },
  textBottom: {
    textAlignVertical: 'bottom',
  },
  textCenter: {
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  textCenterAlign: {
    textAlign: 'center',
  },
  textCenterVertical: {
    textAlignVertical: 'center',
  },
  textError: {
    color: Colors.pinkEC49,
    fontFamily: 'iranssans',
    fontSize: 9,
    textAlign: 'right',
  },
  textLight: {
    fontFamily: 'iransansDn',
    textAlign: 'right',
  },
  themeApp: {
    backgroundColor: Colors.primary,
  },
  themeAppDark: {
    backgroundColor: Colors.primary,
  },
  warpView: {
    flexWrap: 'wrap',
  },
});

export const getSizeScreen = () => Dimensions.get('screen');
