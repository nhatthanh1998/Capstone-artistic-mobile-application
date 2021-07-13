import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { LoginPage } from '../pages/LoginPage'
import { SignUpPage } from '../pages/SignUpPage'
import { REGISTER_PAGE, LOGIN_PAGE, RESET_PASSWORD_PAGE } from "../enums/page-name"
import { ResetPasswordPage } from '../pages/ResetPasswordPage/ResetPasswordPage'

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

            <Stack.Screen name={RESET_PASSWORD_PAGE} component={ResetPasswordPage}
                options={{
                    headerShown: false
                }}
            />

        </Stack.Navigator>
    )
}
