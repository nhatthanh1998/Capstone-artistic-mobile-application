import React from 'react'
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import { useSocket } from '../hooks/socket.hook'
import { HomePage } from "../pages/HomePage"
import { EffectPage } from "../pages/EffectPage"
import { CameraPage } from '../pages/CameraPage'
import {AlbumPage} from "../pages/AlbumPage"

import { ALBUM_PAGE, CAMERA_PAGE, EFFECT_PAGE, HOME_PAGE } from "../enums/page-name"
import { ALBUM_PAGE_TITLE, CAMERA_PAGE_TITLE, EFFECT_PAGE_TITLE } from "../enums/page-title"


const App = () => {
    const Stack = createStackNavigator()
    useSocket()
    return (
        <NavigationContainer>
            
            <Stack.Navigator>
                
            <Stack.Screen name={ALBUM_PAGE} component={AlbumPage}
                    options={{
                        title: ALBUM_PAGE_TITLE
                    }}
                />

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