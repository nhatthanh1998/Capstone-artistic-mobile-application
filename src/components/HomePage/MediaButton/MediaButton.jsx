import React from "react"
import tailwind from 'tailwind-rn'
import { TouchableOpacity, View, Text, Image } from 'react-native'

export const MediaButton = ({ mediaName, iconUrl, handlePress }) => {
    return (
        <View style={tailwind("w-1/2 justify-center flex flex-row ")}>
            <TouchableOpacity onPress={() => { handlePress() }}>
                <View>
                    <Image source={iconUrl} style={tailwind("w-20 h-20")} />
                    <Text style={tailwind("text-white w-full text-center")}>{mediaName}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}