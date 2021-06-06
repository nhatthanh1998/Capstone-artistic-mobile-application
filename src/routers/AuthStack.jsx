import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { LoginPage } from '../pages/LoginPage'
import { SignUpPage } from '../pages/SignUpPage'
import { REGISTER_PAGE, LOGIN_PAGE } from "../enums/page-name"
import { ProfilePage } from '../pages/ProfilePage'

export const AuthStack = () => {
    const Stack = createStackNavigator()
    return (


        <Stack.Navigator >
            <Stack.Screen name={"Profile"} component={ProfilePage}
                options={{
                    headerShown: false
                }}
            />

            <Stack.Screen name={REGISTER_PAGE} component={SignUpPage}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen name={LOGIN_PAGE} component={LoginPage}
                options={{
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    )
}
