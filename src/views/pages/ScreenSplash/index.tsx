import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {BaseStackParamList} from '@routes/RootStackParamListType';

interface ScreenSplashPageType {
  navigation: StackNavigationProp<BaseStackParamList>;
}

const ScreenSplashPage = ({navigation}: ScreenSplashPageType) => {
  React.useEffect(() => {
    setTimeout(() => {
      navigation.navigate('drawerRoute');
    }, 2000);
  }, [navigation]);

  return (
    <SafeAreaView>
      <Text>Screen Splash</Text>
    </SafeAreaView>
  );
};

export default React.memo(ScreenSplashPage);
