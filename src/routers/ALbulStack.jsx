import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import {AlbumPage} from "../pages/AlbumPage"



import { ALBUM_PAGE } from "../enums/page-name"
import { ALBUM_PAGE_TITLE } from "../enums/page-title"


export const MainStack = () => {
    const Stack = createStackNavigator()
    return (
        <Stack.Navigator >
            <Stack.Screen name={ALBUM_PAGE} component={AlbumPage}
                options={{
                    title: ALBUM_PAGE_TITLE,
                    headerShown: false
                }}
            />

        </Stack.Navigator>
    )
}
