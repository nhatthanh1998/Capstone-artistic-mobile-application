import React from 'react'
import tailwind from 'tailwind-rn'
import { View, TouchableOpacity, Image } from 'react-native'


export const NavigationButton = ({ iconURL, handlePress }) => {
    return (
        <View style={tailwind("px-5 py-10")}>
            <TouchableOpacity
                onPress={() => handlePress()}
            >
                <Image source={iconURL} style={tailwind("w-7 h-7")} />
            </TouchableOpacity>
        </View>
    )
}