import React from 'react';
import {SafeAreaView} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {BaseStackParamList} from '@routes/RootStackParamListType';

interface ScreenSplashPageType {
  navigation: StackNavigationProp<BaseStackParamList>;
}

const ScreenSplashPage = ({navigation}: ScreenSplashPageType) => {
  React.useEffect(() => {
    setTimeout(() => {
      navigation.navigate('homePage');
    }, 2000);
  }, [navigation]);

  return <SafeAreaView></SafeAreaView>;
};

export default React.memo(ScreenSplashPage);
