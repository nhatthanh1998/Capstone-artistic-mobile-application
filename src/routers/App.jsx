import React from 'react'
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { useSocket } from '../hooks/socket.hook'
import { selectUserIsLoggedIn } from '../redux/slicers/user.slicer'
import { useSelector } from 'react-redux'
import { AuthStack } from './AuthStack'
import { MainDrawer } from './MainDrawer'

const App = () => {
    useSocket()
    const isLoggedIn = useSelector(selectUserIsLoggedIn)

    return isLoggedIn == true ?
        (
            <NavigationContainer >
                <AuthStack />
            </NavigationContainer>
        ) : (
            <NavigationContainer >
                <MainDrawer />
            </NavigationContainer>
        )
};

export default App;