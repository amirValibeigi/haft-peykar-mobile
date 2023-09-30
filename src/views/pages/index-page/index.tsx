import React from 'react';
import {
  createNavigationContainerRef,
  DrawerActions,
  NavigationContainer,
  NavigationContainerRefWithCurrent,
} from '@react-navigation/native';
import {BackHandler, StatusBar, View, I18nManager} from 'react-native';
import t, {setI18nConfig} from '@libs/translate';
import Toast from 'react-native-toast-message';
import BaseStackRoute from '@routes/base-stack.route';
import {styles} from './styles';
import {AllParamList} from '@routes/stack-param-list.type';
import AppBarContext, {AppBarContextProvider} from '@contexts/app-bar.context';
import AppBarView from '@customs/app-bar';
import {AppBarViewRefType} from '@customs/app-bar/hook';
import {onStackChange} from './stack-configs';
import {logV} from 'react-native-error-handling';
import {ContainerLoadingView} from '@customs/loading-view';
import {BottomTabContextProvider} from '@contexts/bottom-tab.context';
import {getDrawerStatusFromState} from '@react-navigation/drawer';

I18nManager.allowRTL(false);

class IndexPage extends React.Component {
  _appBar?: React.RefObject<AppBarViewRefType>;
  _navigation?;
  _timeout?: NodeJS.Timeout;
  _isPressBack = false;
  _onPressBackAppBar;
  static contextType = AppBarContext;
  _onStackChange;

  constructor(props: any) {
    super(props);

    setI18nConfig();

    this._onPressBackAppBar = this._onPressToNavigate.bind(this, -1);

    this._navigation = createNavigationContainerRef<AllParamList>();

    this._appBar = React.createRef<AppBarViewRefType>();

    this._onStackChange = onStackChange.bind(this, {
      appBar: this._appBar,
      navigation: this
        ._navigation as NavigationContainerRefWithCurrent<AllParamList>,
    });

    StatusBar.setHidden(true);
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this._onPressBack);
    this._navigation?.addListener('state', this._onChangeState);
    this._appBar?.current?.setTitle(t('name_app'));
  }

  render() {
    logV('render', 'indexPage');
    return (
      <View style={styles.container}>
        <AppBarView
          ref={this._appBar}
          onPressBack={this._onPressBackAppBar}
          onToggleDrawer={this._onToggleDrawer}
        />
        <NavigationContainer
          ref={this._navigation}
          onStateChange={this._onStackChange}>
          <BaseStackRoute />
        </NavigationContainer>
        <Toast autoHide position="bottom" />
        <ContainerLoadingView />
      </View>
    );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this._onPressBack);
    this._navigation?.removeListener('state', this._onChangeState);

    if (this._timeout) {
      clearTimeout(this._timeout);
    }
  }

  _onPressToNavigate = (name: string | number) => {
    if (this._navigation) {
      if (name === -1) {
        this._navigation.goBack();

        return;
      }

      this._navigation.navigate(name as any);

      return;
    }

    Toast.show({text1: 'error', text2: 'navigate', type: 'error'});
  };

  _onPressBack = () => {
    const {name} = this._navigation?.getCurrentRoute() ?? {};

    if (name === 'homePage' && !this._isPressBack) {
      this._isPressBack = true;

      Toast.show({
        text1: t('exit'),
        text2: t('exit_confirm'),
        type: 'info',
      });

      this._timeout = setTimeout(() => (this._isPressBack = false), 1000);

      return true;
    }

    return false;
  };

  _onToggleDrawer = () => {
    this._navigation?.dispatch(DrawerActions.toggleDrawer());
  };
  _onChangeState = () => {
    if (this._navigation) {
      try {
        const indexDrawerRoute =
          this._navigation!.getRootState?.()?.routes?.findIndex?.(
            el => el.name === 'drawerRoute',
          );
        const drawerRoute =
          this._navigation!.getRootState?.()?.routes?.[indexDrawerRoute];

        const isShowDrawer =
          getDrawerStatusFromState(drawerRoute!.state as any) === 'open';
        this._appBar?.current?.setConfigAppBar({isShowDrawer});
      } catch (e) {
        //ignore
      }
    }
  };
}

export default React.memo(() => (
  <AppBarContextProvider>
    <BottomTabContextProvider>
      <IndexPage />
    </BottomTabContextProvider>
  </AppBarContextProvider>
));
