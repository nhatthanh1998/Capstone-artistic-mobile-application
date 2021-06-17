import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { LoginPage } from '../pages/LoginPage'
import { SignUpPage } from '../pages/SignUpPage'
import { REGISTER_PAGE, LOGIN_PAGE } from "../enums/page-name"

export const AuthStack = () => {
    const Stack = createStackNavigator()
    return (
        <Stack.Navigator initialRouteName={LOGIN_PAGE}>
            <Stack.Screen name={LOGIN_PAGE} component={LoginPage}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen name={REGISTER_PAGE} component={SignUpPage}
                options={{
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    )
}
