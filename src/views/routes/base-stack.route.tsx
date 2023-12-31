import ScreenSplashPage from '@pages/screen-splash-page';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {BaseStackParamList} from './stack-param-list.type';

const DrawerRoute = React.lazy(() => import('@routes/drawer-route'));

const BaseStackRoute = () => {
  return (
    <Stack.Navigator
      initialRouteName="screenSplashPage"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="screenSplashPage" component={ScreenSplashPage} />
      <Stack.Screen name="drawerRoute" component={DrawerRoute} />
    </Stack.Navigator>
  );
};

const Stack = createStackNavigator<BaseStackParamList>();

export default React.memo(BaseStackRoute);
