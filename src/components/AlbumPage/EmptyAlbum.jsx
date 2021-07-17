import React from 'react'
import {Text, Image, View, TouchableOpacity} from 'react-native'
import tailwind from 'tailwind-rn'
import { styles } from '../../styles'

export const EmptyAlbum = () => {
    return (
        <>
            <Text style={tailwind("text-center text-3xl mb-3 uppercase font-light tracking-tighter")}>Nothing here</Text>
            <View style={tailwind("flex items-center ")}>
                <Image style={tailwind("h-64 w-64 mb-4")}
                  source={require('../../assets/illustrations/empty.webp')} />
            </View>
            <Text style={tailwind("mx-11 text-center text-sm font-thin")}>
              Your album is currently empty. I suggest taking new photo or select from your gallery and use our transformation.
            </Text>
            <View style={tailwind("relative z-10 flex flex-row justify-center mt-10")}>
                <TouchableOpacity style={{...tailwind("w-32 mx-5 bg-yellow-300 py-3 rounded-full"), ...styles.shadow_2}}>
                    <Text style={tailwind("text-base text-center font-thin")}>Take picture</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{...tailwind("w-32 mx-5  bg-gray-800 py-3 rounded-full"), ...styles.shadow_2}}>
                    <Text style={tailwind("text-base font-thin text-white text-center")}>From gallery</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}