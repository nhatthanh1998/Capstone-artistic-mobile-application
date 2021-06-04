import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { MainStack } from './MainStack'
import { NavigationDrawerContent } from '../commons/components/NavigationDrawer'


const Drawer = createDrawerNavigator();

export const MainDrawer = () => {
  return (
      <Drawer.Navigator initialRouteName="Main" drawerContent = {props => <NavigationDrawerContent {...props}/>}>
        <Drawer.Screen name="Main" component={MainStack} />
      </Drawer.Navigator>
  );
}