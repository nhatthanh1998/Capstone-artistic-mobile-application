import React, {useEffect, useState} from 'react'
import {View, Image, Text, TouchableOpacity, SafeAreaView, StyleSheet, FlatList} from 'react-native'
import tailwind from 'tailwind-rn'
import { styles } from '../../styles'
import { selectAlbumPhotos } from '../../redux/slicers/albums.slicer'
import { handleGetAlbumPhotos } from './handler'
import { useSelector, useDispatch } from 'react-redux'
import { PhotoDetail } from './PhotoDetail'
import { selectAlbumSelectedPhoto, setAlbumSelectedPhoto } from '../../redux/slicers/albums.slicer'


const PhotoItem = ({data, handlePress}) => {
  const {item} = data
  const {accessURL, id, photoLocation, photoName, uri} = item
  return (
    <View style={tailwind("w-1/3 mb-5 flex-row justify-center")}>
        <View style={tailwind("relative")}>
            <TouchableOpacity style={{...tailwind("overflow-hidden relative z-10 rounded-3xl w-24 h-24"), ...styles.shadow_2}}
            onPress = {() => handlePress()}
            >
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

  const [isVisible, setVisible] = useState(false)
  const dispatch = useDispatch()
  const albumPhotos = useSelector(selectAlbumPhotos)

  const selectedPhoto = useSelector(selectAlbumSelectedPhoto)

  useEffect(()=> {
    handleGetAlbumPhotos({dispatch})
  }, [])

  const handlePressPhotoItem = (item) => {
      dispatch(setAlbumSelectedPhoto(item))
      setVisible(true)
  }

  const handlePressBack = () => {
    setVisible(false)
    dispatch(setAlbumSelectedPhoto(null))

  }

    return (
        <SafeAreaView style={tailwind("h-2/4")}>
            <FlatList
                    style={tailwind("overflow-hidden")}
                    style={tailwind("px-5")}
                    numColumns={3}
                    showsVerticalScrollIndicator={false}
                    data={albumPhotos}
                    renderItem={data => <PhotoItem data = {data} handlePress = {() => handlePressPhotoItem(data.item)}/>}
                    keyExtractor={item => item.id}
            />
          <PhotoDetail photo={selectedPhoto} isVisible = {isVisible} handlePressBack = {() => handlePressBack()}/>
        </SafeAreaView>
    )
}
