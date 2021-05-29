import React from 'react'
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import { useSocket } from '../hooks/socket.hook'
import { HomePage } from "../pages/HomePage"
import { EffectPage } from "../pages/EffectPage"
import { CameraPage } from '../pages/CameraPage'

import { CAMERA_PAGE, EFFECT_PAGE, HOME_PAGE } from "../enums/page-name"
import { CAMERA_PAGE_TITLE, EFFECT_PAGE_TITLE } from "../enums/page-title"


const App = () => {
    const Stack = createStackNavigator()
    useSocket()
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name={HOME_PAGE} component={HomePage}
                    options={{
                        headerShown: false
                    }}
                />

                <Stack.Screen name={CAMERA_PAGE} component={CameraPage}
                    options={{
                        title: CAMERA_PAGE_TITLE
                    }}
                />


                <Stack.Screen name={EFFECT_PAGE} component={EffectPage}
                    options={{
                        title: EFFECT_PAGE_TITLE
                    }}
                />

            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;