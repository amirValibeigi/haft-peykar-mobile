import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {DrawerParamList} from '@routes/stack-param-list.type';
import BottomTabStackRoute from '@routes/bottom-tab.route';
import DrawerComponent from '@components/drawer-component';

const Drawer = createDrawerNavigator<DrawerParamList>();
const VersePage = React.lazy(() => import('@pages/verse-page'));

const DrawerRoute = React.memo(() => {
  return (
    <Drawer.Navigator
      screenOptions={{headerShown: false, drawerPosition: 'right'}}
      drawerContent={DrawerComponent}>
      <Drawer.Screen name="bottomTabRoute" component={BottomTabStackRoute} />
      <Drawer.Screen name="versePage" component={VersePage} />
    </Drawer.Navigator>
  );
});

export default DrawerRoute;
