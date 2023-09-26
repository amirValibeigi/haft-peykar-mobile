import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {DrawerParamList} from '@routes/stack-param-list.type';
import BottomTabStackRoute from '@routes/bottom-tab.route';
import DrawerComponent from '@components/drawer-component';

const Drawer = createDrawerNavigator<DrawerParamList>();

const DrawerRoute = React.memo(() => {
  return (
    <Drawer.Navigator
      screenOptions={{headerShown: false, drawerPosition: 'right'}}
      drawerContent={DrawerComponent}>
      <Drawer.Screen name="bottomTabRoute" component={BottomTabStackRoute} />
    </Drawer.Navigator>
  );
});

export default DrawerRoute;
