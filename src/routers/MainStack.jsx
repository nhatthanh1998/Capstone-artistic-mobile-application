import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { EffectPage } from "../pages/EffectPage"
import { CameraPage } from '../pages/CameraPage'
import { AlbumPage } from "../pages/AlbumPage"
import { MainPage } from '../pages/MainPage'
import { ProfilePage } from '../pages/ProfilePage'


import { CAMERA_PAGE, EFFECT_PAGE, MAIN_PAGE, PROFILE_PAGE, ALBUM_LIST_PAGE, ALBUM_DETAIL_PAGE } from "../enums/page-name"
import { CAMERA_PAGE_TITLE, } from "../enums/page-title"
import { AlbumListPage } from '../pages/AlbumListPage/AlbumListPage'
import {TestPage} from '../pages/TestPage'

export const MainStack = () => {
    const Stack = createStackNavigator()
    return (
        <Stack.Navigator initialRouteName={MainPage}>
            <Stack.Screen name={MAIN_PAGE} component={MainPage}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen name={"TestPage"} component={TestPage}
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
                    headerShown: false
                }}
            />
            <Stack.Screen name={ALBUM_LIST_PAGE} component={AlbumListPage}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen name={ALBUM_DETAIL_PAGE} component={AlbumPage}
                options={{
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
