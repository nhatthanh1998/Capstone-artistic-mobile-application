import React from 'react'
import {Text, Image, View, TouchableOpacity} from 'react-native'
import tailwind from 'tailwind-rn'
import { styles } from '../../styles'

export const EmptyAlbum = () => {
    return (
        <>
            <Text style={tailwind("text-center text-3xl mb-3 uppercase font-light tracking-tighter")}>Nothing here</Text>
            <Image style={tailwind("h-64 mb-4")}
              resizeMode="contain" 
              source={{uri:"https://ouch-cdn2.icons8.com/R8usR4Ej_PG8lP92NTX9NXQVy-cWTOU5NGXbyQkrs-8/rs:fit:912:912/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9zdmcvMjk0/LzU5YmQ3MjIxLTkw/NDItNDQ4Yy1iNTEw/LTQ0MDcyNzJjYzY5/Yi5zdmc.png"}} />
            <Text style={tailwind("mx-11 text-center text-sm font-thin")}>
              Your album is currently empty. I suggest taking new photo or select from your gallery and use our transformation.
            </Text>
            <View style={tailwind("flex flex-row justify-center mt-10")}>
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