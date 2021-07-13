import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { EffectPage } from "../pages/EffectPage"
import { CameraPage } from '../pages/CameraPage'
import { AlbumPage } from "../pages/AlbumPage"
import { MainPage } from '../pages/MainPage'
import { ProfilePage } from '../pages/ProfilePage'


import { CAMERA_PAGE, EFFECT_PAGE, MAIN_PAGE, PROFILE_PAGE, ALBUM_LIST_PAGE, ALBUM_DETAIL_PAGE, CHANGE_PASSWORD_PAGE } from "../enums/page-name"
import { AlbumListPage } from '../pages/AlbumListPage/AlbumListPage'
import { ChangePasswordPage } from '../pages/ChangePasswordPage/ChangePasswordPage'

export const MainStack = () => {
    const Stack = createStackNavigator()
    return (
        <Stack.Navigator initialRouteName={MainPage}>
            <Stack.Screen name={MAIN_PAGE} component={MainPage}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen name={CAMERA_PAGE} component={CameraPage}
                options={{
                    headerShown: false
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

            <Stack.Screen name={CHANGE_PASSWORD_PAGE} component={ChangePasswordPage}
                options={{
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    )
}
