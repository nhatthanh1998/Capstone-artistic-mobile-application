import React from 'react'
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { useSocket } from '../hooks/socket.hook'
import { selectUserIsLoggedIn } from '../redux/slicers/user.slicer'
import { useSelector } from 'react-redux'
import { MainStack } from './MainStack'
import { AuthStack } from './AuthStack'
import { ProfileStack } from './ProfileStack'

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
                    <ProfileStack />
                </NavigationContainer>
        )

    return
};

export default App;