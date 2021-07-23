import React, { useEffect } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { MainStack } from './MainStack'
import { NavigationDrawerContent } from '../commons/components/NavigationDrawer'
import { useDispatch, useSelector } from 'react-redux'
import { selectUserProfile } from '../redux/slicers/user.slicer'
import { setUpListen } from '../hooks/socket.hook';

const Drawer = createDrawerNavigator();

export const MainDrawer = () => {
  const dispatch = useDispatch()
  const userProfile = useSelector(selectUserProfile)

  useEffect(() => {
  }, [])

  useEffect(() => {
    if(userProfile) {
      setUpListen({userId: userProfile.id, dispatch})
    }
  }, [userProfile])

  return (
      <Drawer.Navigator initialRouteName="Main" drawerContent={props => <NavigationDrawerContent {...props} />}>
        <Drawer.Screen name="Main" component={MainStack} />
      </Drawer.Navigator>
    );
}
