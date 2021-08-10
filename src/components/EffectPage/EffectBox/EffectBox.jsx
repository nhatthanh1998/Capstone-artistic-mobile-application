import React from 'react'
import { TouchableOpacity, Image, View, Text, ImageBackground } from 'react-native'
import tailwind from 'tailwind-rn'
export const EffectBox = ({ style, handlePress, isSelect }) => {
    const {styleName, iconURL} = style
    if (isSelect == false) {
        return (
            <View style={tailwind("")}>
                <TouchableOpacity
                    style={tailwind("flex items-center w-full h-full px-5 py-3")}
                    onPress={() => { handlePress(style) }}
                >
                    <View style={tailwind("w-20 h-20 rounded-lg overflow-hidden")}>
                        <Image source={{uri: iconURL}}
                            style={tailwind("w-full h-full")} />
                    </View >
                    <Text style={tailwind("text-center text-xs text-gray-800 mt-1")}>{styleName}</Text>
                </TouchableOpacity>
            </View>
            
        )
    } else {
        return (
            <View style={tailwind("w-28 h-28 py-3 flex flex-row")}>
                <TouchableOpacity
                    style={tailwind("flex items-center w-full h-full")}
                    onPress={() => { handlePress(style) }}
                >
                    <View style={tailwind("w-20 h-20 rounded-lg border-4 border-yellow-300")}>
                        <ImageBackground source={{uri: iconURL}}
                            style={tailwind("w-full h-full")}>
                                <View style ={tailwind("w-full h-full bg-black opacity-50")}/>
                                <Image source={require("../../../commons/images/checkicon.png")} style = {tailwind("w-10 h-10 absolute mt-4 ml-4")}/>
                            </ImageBackground>
                    </View >
                    <Text style={tailwind("text-center text-xs mt-1 text-gray-800")}>{styleName}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
