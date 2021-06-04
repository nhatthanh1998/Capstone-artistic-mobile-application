import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { HomePage } from "../pages/HomePage"
import { EffectPage } from "../pages/EffectPage"
import { CameraPage } from '../pages/CameraPage'
import { AlbumPage } from "../pages/AlbumPage"
import { NewMainPage } from '../pages/NewMainPage'

import { ALBUM_PAGE, CAMERA_PAGE, EFFECT_PAGE, HOME_PAGE } from "../enums/page-name"
import { ALBUM_PAGE_TITLE, CAMERA_PAGE_TITLE, EFFECT_PAGE_TITLE } from "../enums/page-title"


export const MainStack = () => {
    const Stack = createStackNavigator()
    return (
        <Stack.Navigator >
            <Stack.Screen name={"ABC"} component={NewMainPage}
                options={{
                    headerShown: false
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

            <Stack.Screen name={ALBUM_PAGE} component={AlbumPage}
                options={{
                    title: ALBUM_PAGE_TITLE,
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    )
}
