import React from 'react';
import {
  createNavigationContainerRef,
  NavigationContainer,
  NavigationContainerRefWithCurrent,
} from '@react-navigation/native';
import {BackHandler, StatusBar, View, I18nManager} from 'react-native';
import t, {setI18nConfig} from '@libs/Translate';
import EStyleSheet from 'react-native-extended-stylesheet';
import Toast from 'react-native-toast-message';
import BaseStackRoute from '@routes/BaseStackRoute';
import {styles} from './styles';
import {AllParamList} from '@routes/RootStackParamListType';
import {Colors} from '@GlobalStyles';
import {transformObjectToGlobalStyle} from '@libs/Utils';
import AppBarContext, {AppBarContextProvider} from '@contexts/AppBarContext';
import AppBarView from '@customs/AppBarView';
import {AppBarViewRefType} from '@customs/AppBarView/hook';
import {onStackChange} from './StackConfigs';
import {logV} from 'react-native-error-handling';
import {ContainerLoadingView} from '@customs/LoadingView';

I18nManager.allowRTL(false);

EStyleSheet.build(
  transformObjectToGlobalStyle('color', Colors, {
    // always call EStyleSheet.build() even if you don't use global variables!
    $bgContainer: '#E2EBFC',
  }),
);

class IndexPage extends React.Component {
  #appBar?: React.RefObject<AppBarViewRefType>;
  #navigation?;
  #timeout?: NodeJS.Timeout;
  #isPressBack = false;
  _onPressBackAppBar;
  static contextType = AppBarContext;
  #onStackChange;

  constructor(props: any) {
    super(props);

    setI18nConfig();

    this._onPressBackAppBar = this.#onPressToNavigate.bind(this, -1);

    this.#navigation = createNavigationContainerRef<AllParamList>();

    this.#appBar = React.createRef<AppBarViewRefType>();

    this.#onStackChange = onStackChange.bind(this, {
      appBar: this.#appBar,
      navigation: this
        .#navigation as NavigationContainerRefWithCurrent<AllParamList>,
    });

    StatusBar.setHidden(true);
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.#onPressBack);
    this.#appBar?.current?.setTitle(t('name_app'));
  }

  render() {
    logV('render', 'indexPage');
    return (
      <View style={styles.container}>
        <AppBarView ref={this.#appBar} onPressBack={this._onPressBackAppBar} />
        <NavigationContainer
          ref={this.#navigation}
          onStateChange={this.#onStackChange}>
          <BaseStackRoute />
        </NavigationContainer>
        <Toast autoHide position="bottom" />
        <ContainerLoadingView />
      </View>
    );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.#onPressBack);
    if (this.#timeout) {
      clearTimeout(this.#timeout);
    }
  }

  #onPressToNavigate = (name: string | number) => {
    if (this.#navigation) {
      if (name === -1) {
        this.#navigation.goBack();

        return;
      }

      this.#navigation.navigate(name as any);

      return;
    }

    Toast.show({text1: 'error', text2: 'navigate', type: 'error'});
  };

  #onPressBack = () => {
    const {name} = this.#navigation?.getCurrentRoute() ?? {};

    if (name === 'homePage' && !this.#isPressBack) {
      this.#isPressBack = true;

      Toast.show({
        text1: t('exit'),
        text2: t('exit_confirm'),
        type: 'info',
      });

      this.#timeout = setTimeout(() => (this.#isPressBack = false), 1000);

      return true;
    }

    return false;
  };
}

export default React.memo(() => (
  <AppBarContextProvider>
    <IndexPage />
  </AppBarContextProvider>
));
