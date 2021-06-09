import React, {useEffect} from 'react'
import {View, Image, Text, TouchableOpacity, SafeAreaView, StyleSheet, FlatList} from 'react-native'
import tailwind from 'tailwind-rn'
import { styles } from '../../styles'
import { selectAlbumPhotos } from '../../redux/slicers/albums.slicer'
import { handleGetAlbumPhotos } from './handler'
import { useSelector, useDispatch } from 'react-redux'

const PhotoItem = () => (
    <View style={tailwind("w-1/3 mb-5 flex-row justify-center")}>
        <View style={tailwind("relative")}>
            <TouchableOpacity style={{...tailwind("overflow-hidden relative z-10 rounded-3xl w-24 h-24"), ...styles.shadow_2}}>
                <Image source={{uri: "https://i.pinimg.com/564x/87/4c/56/874c565040aa10c0611a9d6f0ec690ed.jpg"}} style={tailwind("w-full h-full bg-red-100")}/>
            </TouchableOpacity>

            <TouchableOpacity style={{...tailwind("bg-gray-50 mt-3 py-2 rounded-full")}}>
                <Text style={tailwind("font-thin text-xs text-center")}>momo 001</Text>
            </TouchableOpacity>
        </View>
    </View>
)

export const PhotoList = () => {
  const albumPhotos = useSelector(selectAlbumPhotos)

  useEffect(()=> {
    handleGetAlbumPhotos()
  }, [])

    return (
        <SafeAreaView style={tailwind("h-2/4")}>
            <FlatList
                    style={tailwind("overflow-hidden")}
                    style={tailwind("px-5")}
                    numColumns={3}
                    showsVerticalScrollIndicator={false}
                    data={albumPhotos}
                    renderItem={PhotoItem}
                    keyExtractor={item => item.id}
            />
        </SafeAreaView>
       



    )
}
