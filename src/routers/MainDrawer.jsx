import React, { useEffect } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { MainStack } from './MainStack'
import { NavigationDrawerContent } from '../commons/components/NavigationDrawer'
import { useDispatch, useSelector } from 'react-redux'
import { handleGetUserProfile } from './handler'
import { selectUserProfile } from '../redux/slicers/user.slicer'
import * as navigation from './RootNavigation';
import { setUpListen } from '../hooks/socket.hook';

const Drawer = createDrawerNavigator();

export const MainDrawer = () => {
  const dispatch = useDispatch()
  const userProfile = useSelector(selectUserProfile)

  useEffect(() => {
    handleGetUserProfile({ dispatch, navigation })
  }, [])

  useEffect(() => {
    setUpListen({userId: userProfile.id, handler: (data) => console.log(data)})
  }, [userProfile])

  return (
      <Drawer.Navigator initialRouteName="Main" drawerContent={props => <NavigationDrawerContent {...props} />}>
        <Drawer.Screen name="Main" component={MainStack} />
      </Drawer.Navigator>
    );
}
