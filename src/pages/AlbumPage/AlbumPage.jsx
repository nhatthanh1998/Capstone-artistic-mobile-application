import React, {useEffect, useState, useRef} from 'react'
import { StatusBar, Animated, SafeAreaView, View} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { setAlbumSelectedMedia, selectAlbumMedias, selectSelectedAlbum } from '../../redux/slicers/albums.slicer'
import { AlbumHeader } from '../../components/AlbumPage/AlbumHeader'
import { MediaDetail } from '../../components/AlbumPage/PhotoDetail'
import { EmptyAlbum } from '../../components/AlbumPage/EmptyAlbum'
import { PhotoItem } from '../../components/AlbumPage/PhotoItem'
import { handleDeleteAlbum, handleGetAlbumDetail } from './handler'
import {selectIsLoading} from '../../redux/slicers/is-loading.slicer'
import { Loading } from '../../commons/components/Loading/Loading'
import tailwind from 'tailwind-rn'
import { ALBUM_LIST_PAGE } from '../../enums/page-name'

const AnimatedFlatList = Animated.FlatList

export const AlbumPage = ({route, navigation}) => {
    const { albumId } = route.params

    const [headerHeight, setHeaderHeight] = useState(0)
    const [visible, setVisible] = useState(false)
    const [selectedPhoto, setSelectedPhoto] = useState(null)
    const dispatch = useDispatch()
    const albumMedias = useSelector(selectAlbumMedias)
    const album = useSelector(selectSelectedAlbum)
    const isLoading = useSelector(selectIsLoading)
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
      dispatch(setAlbumSelectedMedia(item))
      setSelectedPhoto(item)
      setVisible(true)
    }

    const backToAlbumPage = () => {
      navigation.navigate(ALBUM_LIST_PAGE)
    }
    return (
        <SafeAreaView style={tailwind("h-full relative bg-white")}>
            <Loading isLoading={isLoading}/>
            <Animated.View
             style={{
                 ...tailwind("absolute w-full z-20"),
                 transform: [{translateY}]
            }}>
                <AlbumHeader
                  pressBack={backToAlbumPage} 
                  setHeaderHeight={setHeaderHeight} 
                  album={album}
                  handleDeleteAlbum={() => {handleDeleteAlbum({albumId, dispatch, navigation})}}
                  />
            </Animated.View>
            {
              albumMedias.length === 0 ?
                (
                  <View style={{paddingTop: headerHeight}}>
                    <EmptyAlbum/>
                  </View>
                ) :
                (
                  <>
                    <AnimatedFlatList
                      ref={ref}
                      onScroll={handleScroll}
                      style={{...tailwind("relative px-5 z-10")}}
                      contentContainerStyle={{paddingTop: headerHeight, paddingBottom: 50}}
                      numColumns={3}
                      showsVerticalScrollIndicator={false}
                      data={albumMedias}
                      renderItem={data => <PhotoItem data={data} handlePress={() => handlePressPhotoItem(data.item)}/>}
                      keyExtractor={item => item.id}
                    />
                    <MediaDetail media={selectedPhoto} setVisible = {setVisible} visible = {visible}/>
                  </>
                )
            }
            
        </SafeAreaView>
    )
}