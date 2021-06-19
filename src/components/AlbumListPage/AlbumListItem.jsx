import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import tailwind from 'tailwind-rn'
import { styles } from '../../styles'
import moment from 'moment'
import { ALBUM_DETAIL_PAGE } from '../../enums/page-name'

export const AlbumListItem = ({album, navigation}) => {
    const {id, name, thumbnail_url, total, created_at} = album
    return (
        <View style={tailwind("pt-5 mx-5")}>
            <View style={tailwind("flex flex-row items-center")}>
                <Text style={tailwind("font-medium text-xl")}>{name}</Text>
                <Text style={tailwind("text-xs ml-3 font-thin")}>{moment(created_at).format('Do MMM YYYY')}</Text>
            </View>
            <Image></Image>
            
            <Text style={tailwind("text-xs mb-3 mt-1 font-thin")}>{total} photos</Text>
            <TouchableOpacity style={{...tailwind("h-52 rounded-xl overflow-hidden"), ...styles.shadow_4}}
            onPress = {() => {
                navigation.navigate(ALBUM_DETAIL_PAGE, {
                    albumId: id
                })
            }}
            >
                <Image source={{uri: thumbnail_url}}
                     style={{...tailwind("justify-center items-center h-full w-full")}}/>
            </TouchableOpacity>
        </View>

    )
}