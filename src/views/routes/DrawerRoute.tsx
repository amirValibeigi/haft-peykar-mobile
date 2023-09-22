import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {DrawerParamList} from '@routes/RootStackParamListType';
import BottomTabStackRoute from '@routes/BottomTabStackRoute';
import DrawerComponent from '@components/DrawerComponent';

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
