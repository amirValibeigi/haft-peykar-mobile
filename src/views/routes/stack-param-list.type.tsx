export type BaseStackParamList = {
  drawerRoute: undefined;
  screenSplashPage: undefined;
};

export type BottomTabStackParamList = {
  dictionaryPage: undefined;
  homePage: undefined;
  podcastPage: undefined;
};

export type DrawerParamList = {
  bottomTabRoute: undefined;
  versePage: {id?: number; title?: string};
};

export type AllParamList = BaseStackParamList &
  DrawerParamList &
  BottomTabStackParamList;
