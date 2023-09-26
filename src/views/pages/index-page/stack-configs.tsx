import React from 'react';
import {AppBarViewRefType} from '@customs/app-bar/hook';
import {NavigationContainerRefWithCurrent} from '@react-navigation/native';
import {AllParamList} from '@routes/stack-param-list.type';
import {StatusBar} from 'react-native';
import t from '@libs/translate';
import Colors from '@colors';

type ArrayOfRPL = (keyof AllParamList)[];

type onStackChangeProps = {
  navigation?: NavigationContainerRefWithCurrent<AllParamList>;
  appBar?: React.RefObject<AppBarViewRefType>;
};

export function onStackChange(_configs: onStackChangeProps) {
  const currentRoute = _configs?.navigation?.getCurrentRoute()?.name ?? '';

  configAppBar(currentRoute, _configs?.appBar);

  stackConfigs[currentRoute as keyof AllParamList]?.(_configs);
}

function configAppBar(
  currentRoute: string,
  appBar?: React.RefObject<AppBarViewRefType>,
) {
  if (ignoreAppBar.includes(currentRoute as keyof AllParamList)) {
    appBar?.current?.hide();
  } else {
    appBar?.current?.show();
  }

  StatusBar.setHidden(fullscreen.includes(currentRoute as keyof AllParamList));

  appBar?.current?.setIsShowBack(
    shouldShowBack.includes(currentRoute as keyof AllParamList),
  );
}

const stackConfigs: {
  [key in keyof AllParamList]?: (_configs: onStackChangeProps) => void;
} = {
  homePage: (_configs: onStackChangeProps) => {
    _configs.appBar?.current?.setConfigAppBar({
      bgColor: Colors.whiteEEEE,
      color: Colors.black4C4C,
      colorDark: Colors.whiteEEEE,
      isDark: true,
      isDarkStatus: true,
      showLogo: true,
      title: t('name_app'),
    });
  },
  screenSplashPage: (_configs: onStackChangeProps) => {
    _configs.appBar?.current?.setConfigAppBar({
      color: Colors.black4C4C,
      colorDark: Colors.whiteF7F7,
      isDark: true,
      isDarkStatus: true,
    });
  },
};

const ignoreAppBar: ArrayOfRPL = ['screenSplashPage'];

const shouldShowBack: ArrayOfRPL = [];

const fullscreen: ArrayOfRPL = ['screenSplashPage'];
