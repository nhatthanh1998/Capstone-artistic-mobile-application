import React from 'react'
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { useSocket } from '../hooks/socket.hook'
import { selectUserIsLoggedIn } from '../redux/slicers/user.slicer'
import { useSelector } from 'react-redux'
import { AppStack } from './AppStack'
import {AuthStack} from './AuthStack'


const App = () => {
    useSocket()
    const isLoggedIn = useSelector(selectUserIsLoggedIn)

    return isLoggedIn == true ? 
    (
        <NavigationContainer >
            <AppStack/>
        </NavigationContainer>
    ) : (
        <NavigationContainer >
            <AuthStack/>
        </NavigationContainer>
    )
};

export default App;