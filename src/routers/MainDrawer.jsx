import React, {useEffect} from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { MainStack } from './MainStack'
import { NavigationDrawerContent } from '../commons/components/NavigationDrawer'
import { useDispatch } from 'react-redux'
import { handleGetUserProfile } from './handler'



const Drawer = createDrawerNavigator();

export const MainDrawer = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    handleGetUserProfile({dispatch})
  }, [])
  return (
      <Drawer.Navigator initialRouteName="Main" drawerContent = {props => <NavigationDrawerContent {...props}/>}>
        <Drawer.Screen name="Main" component={MainStack} />
      </Drawer.Navigator>
  );
}