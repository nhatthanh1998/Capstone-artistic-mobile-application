import React from 'react'
import {ImageBackground, View, Image, Text} from 'react-native'
import tailwind from 'tailwind-rn'
import { styles } from '../../styles'

export const AlbumHeader = ({setHeaderHeight}) => {
    return (
    <ImageBackground 
        onLayout={(event) => {
            setHeaderHeight(event.nativeEvent.layout.height)
        }}
        source={{uri: "https://i.pinimg.com/564x/ae/9b/6e/ae9b6e73142e1ed76664b2a26449b82c.jpg"}} 
        style={{...tailwind("w-full")}}
    >
        <View style={{...tailwind("flex flex-col items-center w-full pt-9"), ...styles.darken}}>
            <View style={tailwind("flex flex-row items-center mb-5")}>
                <View style={tailwind("w-1/3 pl-5")}>
                    <Image style={tailwind("w-5 h-5")} source={{uri: "https://img.icons8.com/material-outlined/48/ffffff/left.png"}} />
                </View>
                <Text style={tailwind("text-2xl w-1/3 text-white font-medium tracking-wide text-center")}>Original</Text>
                <View style={tailwind("w-1/3 flex flex-row justify-end pr-5")}>
                    <Image source={{uri: "https://img.icons8.com/android/24/ffffff/more.png"}} style={tailwind("w-4 h-4")} />
                </View>
            </View>
            <View style={{...tailwind("w-20 rounded-full py-3 text-gray-200 mb-20"), ...styles.lighten}}>
                <Text style={tailwind("text-xs font-thin text-black text-center")}>0 pictures</Text>
            </View>
            <View style={{...styles.bodyRadius, ...tailwind("w-full h-10 rounded-b-none bg-white")}}></View>
        </View>
    </ImageBackground>
    )
}
