import React, {useEffect} from 'react'
import {View, Image, Text, TouchableOpacity, SafeAreaView, StyleSheet, FlatList} from 'react-native'
import tailwind from 'tailwind-rn'
import { styles } from '../../styles'
import { selectAlbumPhotos } from '../../redux/slicers/albums.slicer'
import { handleGetAlbumPhotos } from './handler'
import { useSelector, useDispatch } from 'react-redux'
import { PhotoDetail } from './PhotoDetail'


const PhotoItem = ({data}) => {
  const {item} = data
  const {accessURL, id, photoLocation, photoName, uri} = item
  return (
    <View style={tailwind("w-1/3 mb-5 flex-row justify-center")}>
        <View style={tailwind("relative")}>
            <TouchableOpacity style={{...tailwind("overflow-hidden relative z-10 rounded-3xl w-24 h-24"), ...styles.shadow_2}}>
                <Image source={{uri:accessURL}} style={tailwind("w-full h-full bg-red-100")}/>
            </TouchableOpacity>

            <TouchableOpacity style={{...tailwind("bg-gray-50 mt-3 py-2 rounded-full")}}>
                <Text style={tailwind("font-thin text-xs text-center")}>{photoName}</Text>
            </TouchableOpacity>
        </View>
    </View>
)
}

export const PhotoList = () => {
  const dispatch = useDispatch()
  const albumPhotos = useSelector(selectAlbumPhotos)

  useEffect(()=> {
    handleGetAlbumPhotos({dispatch})
  }, [])

    return (
        <SafeAreaView style={tailwind("h-2/4")}>
            <FlatList
                    style={tailwind("overflow-hidden")}
                    style={tailwind("px-5")}
                    numColumns={3}
                    showsVerticalScrollIndicator={false}
                    data={albumPhotos}
                    renderItem={data => <PhotoItem data = {data}/>}
                    keyExtractor={item => item.id}
            />
          <PhotoDetail imageUrl="https://i.pinimg.com/564x/1a/3f/76/1a3f7634e5a3b52d38a36173ffb05e9f.jpg"/>
        </SafeAreaView>
    )
}
