import React, {useEffect, useState, useRef} from 'react'
import {Text, StatusBar, Animated, SafeAreaView, View} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { setAlbumSelectedPhoto, selectAlbumPhotos, selectSelectedAlbum } from '../../redux/slicers/albums.slicer'
import { AlbumHeader } from '../../components/AlbumPage/AlbumHeader'
import { PhotoDetail } from '../../components/AlbumPage/PhotoDetail'
import { EmptyAlbum } from '../../components/AlbumPage/EmptyAlbum'
import { PhotoItem } from '../../components/AlbumPage/PhotoItem'
import { handleGetAlbumDetail } from './handler'
import tailwind from 'tailwind-rn'
import { ALBUM_LIST_PAGE } from '../../enums/page-name'

const AnimatedFlatList = Animated.FlatList

export const AlbumPage = ({route, navigation}) => {
    const { albumId } = route.params

    const [headerHeight, setHeaderHeight] = useState(0)
    const [visible, setVisible] = useState(false)
    const [selectedPhoto, setSelectedPhoto] = useState(null)
    const dispatch = useDispatch()
    const albumPhotos = useSelector(selectAlbumPhotos)
    const album = useSelector(selectSelectedAlbum)
    const ref = useRef()

    const scrollY = useRef(new Animated.Value(0)).current

    const handleScroll = Animated.event(
        [
          {
            nativeEvent: {
              contentOffset: {y: scrollY},
            },
          },
        ],
        {
          useNativeDriver: true,
        },
    );

    const scrollYClamped = Animated.diffClamp(scrollY, 0, headerHeight);

    const translateY = scrollYClamped.interpolate({
        inputRange: [0, headerHeight],
        outputRange: [0, -(headerHeight)],
    });

    useEffect(() => {
        StatusBar.setHidden(true);
        handleGetAlbumDetail({albumId, dispatch})
    }, [])
    const handlePressPhotoItem = (item) => {
      dispatch(setAlbumSelectedPhoto(item))
      setSelectedPhoto(item)
      setVisible(true)
    }

    const backToAlbumPage = () => {
      navigation.navigate(ALBUM_LIST_PAGE)
    }

    return (
        <SafeAreaView style={tailwind("h-full relative bg-white")} >
            <Animated.View
             style={{
                 ...tailwind("absolute w-full z-20"),
                 transform: [{translateY}]
            }}>
                <AlbumHeader pressBack={backToAlbumPage} 
                  setHeaderHeight={setHeaderHeight} album={album}/>
            </Animated.View>
            {
              albumPhotos.length === 0 ?
                (
                  <View style={{paddingTop: headerHeight}}>
                    <EmptyAlbum/>
                  </View>
                ) :
                (
                  <>
                    <AnimatedFlatList
                      ref={ref}
                      // onMomentumScrollEnd={handleSnap}
                      onScroll={handleScroll}
                      style={{...tailwind("overflow-hidden rounded-b-none px-5 h-full z-10"), paddingTop: headerHeight}}
                      numColumns={3}
                      showsVerticalScrollIndicator={false}
                      data={albumPhotos}
                      renderItem={data => <PhotoItem data={data} handlePress={() => handlePressPhotoItem(data.item)}/>}
                      keyExtractor={item => item.id}
                    />
                    <PhotoDetail photo = {selectedPhoto} setVisible = {setVisible} visible = {visible}/>
                  </>
                )
            }
            
        </SafeAreaView>
    )
}