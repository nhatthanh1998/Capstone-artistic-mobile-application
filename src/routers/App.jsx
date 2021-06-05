import React, {useEffect} from 'react'
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { useSocket } from '../hooks/socket.hook'
import { AuthStack } from './AuthStack'
import { MainDrawer } from './MainDrawer'
import { checkIsLoggedIn } from './handler'
import {useSelector, useDispatch} from 'react-redux'
import { selectUserIsLoggedIn } from '../redux/slicers/user.slicer'

const App = () => {
    const dispatch = useDispatch()
    const isLoggedIn = useSelector(selectUserIsLoggedIn)

    useEffect(() => {
        checkIsLoggedIn({dispatch})
    }, [])
    useSocket()    
    return isLoggedIn == true ?
        (
        <NavigationContainer >
            <MainDrawer />
        </NavigationContainer>

        ) : (
            <NavigationContainer >
                <AuthStack />
            </NavigationContainer>
        )
};

export default App;