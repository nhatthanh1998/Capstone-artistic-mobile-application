import React from 'react'
import {ImageBackground, View, Image, Text, TouchableOpacity} from 'react-native'
import tailwind from 'tailwind-rn'
import { styles } from '../../styles'

export const AlbumHeader = ({setHeaderHeight, album, pressBack}) => {

    if(album) {
        const {count, name, thumbnailURL} = album
        return (
            <ImageBackground 
                onLayout={(event) => {
                    setHeaderHeight(event.nativeEvent.layout.height)
                }}
                source={{uri: thumbnailURL}} 
                style={{...tailwind("w-full")}}
            >
                <View style={{...tailwind("flex flex-col items-center w-full pt-9"), ...styles.darken}}>
                    <View style={tailwind("flex flex-row items-center mb-5")}>
                        <TouchableOpacity style={tailwind("w-1/3 pl-5")} onPress={() => pressBack()}>
                            <Image style={tailwind("w-5 h-5")} source={{uri: "https://img.icons8.com/material-outlined/48/ffffff/left.png"}} />
                        </TouchableOpacity>
                        <Text style={tailwind("text-2xl w-1/3 text-white font-medium tracking-wide text-center")}>{name}</Text>
                        <TouchableOpacity style={tailwind("w-1/3 flex flex-row justify-end pr-5")}>
                            <Image source={{uri: "https://img.icons8.com/android/24/ffffff/more.png"}} style={tailwind("w-4 h-4")} />
                        </TouchableOpacity>
                    </View>
                    <View style={{...tailwind("w-20 rounded-full py-3 text-gray-200 mb-20"), ...styles.lighten}}>
                        <Text style={tailwind("text-xs font-thin text-black text-center")}>{count} pictures</Text>
                    </View>
                    <View style={{...styles.bodyRadius, ...tailwind("w-full h-10 rounded-b-none bg-white")}}></View>
                </View>
            </ImageBackground>
        )
    }
    return <></>
}
