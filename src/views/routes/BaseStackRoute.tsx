import ScreenSplashPage from '@pages/ScreenSplash';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {BaseStackParamList} from './RootStackParamListType';
const HomePage = React.lazy(() => import('@pages/HomePage'));

const BaseStackRoute = () => {
  return (
    <Stack.Navigator
      initialRouteName="screenSplashPage"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="screenSplashPage" component={ScreenSplashPage} />
      <Stack.Screen name="homePage" component={HomePage} />
    </Stack.Navigator>
  );
};

const Stack = createStackNavigator<BaseStackParamList>();

export default React.memo(BaseStackRoute);
