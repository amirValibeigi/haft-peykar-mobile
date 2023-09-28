export type BaseStackParamList = {
  drawerRoute: undefined;
  screenSplashPage: undefined;
  versePage: {id?: number; title?: string};
};

export type BottomTabStackParamList = {
  dictionaryPage: undefined;
  homePage: undefined;
  podcastPage: undefined;
};

export type DrawerParamList = {
  bottomTabRoute: undefined;
};

export type AllParamList = BaseStackParamList &
  DrawerParamList &
  BottomTabStackParamList;
