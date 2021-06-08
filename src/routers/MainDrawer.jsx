import React, { useEffect } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { MainStack } from './MainStack'
import { NavigationDrawerContent } from '../commons/components/NavigationDrawer'
import { useDispatch, useSelector } from 'react-redux'
import { handleGetUserProfile } from './handler'
import { selectUserProfile } from '../redux/slicers/user.slicer'
import {Text} from 'react-native'

const Drawer = createDrawerNavigator();

export const MainDrawer = ({navigation}) => {
  const dispatch = useDispatch()
  const userProfile = useSelector(selectUserProfile)

  useEffect(() => {
    handleGetUserProfile({ dispatch, navigation })
  }, [])

  if (userProfile.id.length == 0) {
    return <Text>Loading</Text>
  } else {
    return (
      <Drawer.Navigator initialRouteName="Main" drawerContent={props => <NavigationDrawerContent {...props} />}>
        <Drawer.Screen name="Main" component={MainStack} />
      </Drawer.Navigator>
    );
  }
}
