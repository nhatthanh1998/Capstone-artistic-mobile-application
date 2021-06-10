import React, {useEffect, useState} from 'react'
import { SafeAreaView, FlatList } from 'react-native'
import tailwind from 'tailwind-rn'
import { selectAlbumPhotos } from '../../redux/slicers/albums.slicer'
import { useSelector, useDispatch } from 'react-redux'
import { PhotoDetail } from './PhotoDetail'
import { PhotoItem } from './PhotoItem'


export const PhotoList = ({albumPhotos}) => {

  const [isVisible, setVisible] = useState(false)
  const dispatch = useDispatch()
  const albumPhotos = useSelector(selectAlbumPhotos)

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
