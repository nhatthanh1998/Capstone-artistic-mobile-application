import React from 'react'
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native'
import tailwind from 'tailwind-rn'
import { styles } from '../../styles'
import moment from 'moment'

export const AlbumListItem = ({album}) => {
    const {id, name, thumbnail_url, total, created_at} = album
    return (
        <View style={tailwind("pt-5 mx-5")}>
            <View style={tailwind("flex flex-row items-end")}>
                <Text style={tailwind("font-medium text-xl")}>{name}</Text>
                <Text style={tailwind("text-xs ml-3 font-thin")}>{moment(created_at).format('Do MMM YYYY')}</Text>
            </View>
            
            <Text style={tailwind("text-xs mb-3 mt-1 font-thin")}>{total} photos</Text>
            <TouchableOpacity style={{...tailwind("h-52 rounded-xl overflow-hidden"), ...styles.shadow_4}}>
                <ImageBackground source={{uri: thumbnail_url}}
                     style={{...tailwind("justify-center items-center h-full w-full")}}/>
            </TouchableOpacity>
        </View>

    )
}