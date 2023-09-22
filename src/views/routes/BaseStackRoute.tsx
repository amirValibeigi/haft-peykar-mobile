import ScreenSplashPage from '@pages/ScreenSplash';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {BaseStackParamList} from './RootStackParamListType';
const DrawerRoute = React.lazy(() => import('@routes/DrawerRoute'));

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
