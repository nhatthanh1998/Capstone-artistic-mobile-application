import { createStackNavigator } from '@react-navigation/stack'
import { LoginPage } from '../pages/LoginPage/LoginPage'
import { RegisterPage } from '../pages/RegisterPage'
import { REGISTER_PAGE, LOGIN_PAGE } from "../enums/page-name"


export const AuthStack = () => {
    const Stack = createStackNavigator()
    return (
        <Stack.Navigator >
            <Stack.Screen name={ LOGIN_PAGE } component={LoginPage}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen name={REGISTER_PAGE} component={RegisterPage}
                options={{
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    )
}
