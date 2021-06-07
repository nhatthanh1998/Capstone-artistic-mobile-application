import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { EffectPage } from "../pages/EffectPage"
import { CameraPage } from '../pages/CameraPage'
import { AlbumPage } from "../pages/AlbumPage"
import { MainPage } from '../pages/MainPage'
import { ProfilePage } from '../pages/ProfilePage'


import { ALBUM_PAGE, CAMERA_PAGE, EFFECT_PAGE, MAIN_PAGE, PROFILE_PAGE } from "../enums/page-name"
import { ALBUM_PAGE_TITLE, CAMERA_PAGE_TITLE, EFFECT_PAGE_TITLE,  } from "../enums/page-title"


export const MainStack = () => {
    const Stack = createStackNavigator()
    return (
        <Stack.Navigator >
            <Stack.Screen name={MAIN_PAGE} component={MainPage}
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

            <Stack.Screen name={ALBUM_PAGE} component={AlbumPage}
                options={{
                    title: ALBUM_PAGE_TITLE,
                    headerShown: false
                }}
            />

            <Stack.Screen name={PROFILE_PAGE} component={ProfilePage}
                options={{
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    )
}
