import React, {useEffect, useState, useRef} from 'react'
import {Text, StatusBar, View, Image, ImageBackground, Animated, SafeAreaView} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { setAlbumSelectedPhoto, selectAlbumPhotos } from '../../redux/slicers/albums.slicer'
import { AlbumHeader } from '../../components/AlbumPage/AlbumHeader'
import { PhotoDetail } from '../../components/AlbumPage/PhotoDetail'
import { PhotoItem } from '../../components/AlbumPage/PhotoItem'
import { getAlbumPhotos } from './handler'
import tailwind from 'tailwind-rn'

const AnimatedFlatList = Animated.FlatList

export const AlbumPage = () => {

    const [headerHeight, setHeaderHeight] = useState(0)
    const [visible, setVisible] = useState(false)
    const [selectedPhoto, setSelectedPhoto] = useState(null)

    const dispatch = useDispatch()
    const albumPhotos = useSelector(selectAlbumPhotos)

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
        getAlbumPhotos({dispatch})
        StatusBar.setHidden(true);
    }, [])

    if(albumPhotos.length === 0) {
        return <Text>Not have image</Text>
    }

    

    const handlePressPhotoItem = (item) => {
      dispatch(setAlbumSelectedPhoto(item))
      setSelectedPhoto(item)
      setVisible(true)
    }

    const handlePressBack = () => {
      setVisible(false)
      dispatch(setAlbumSelectedPhoto(null))
    }

    return (
        <SafeAreaView style={tailwind("h-full relative bg-white")} >
            <Animated.View
             style={{
                 ...tailwind("absolute w-full z-20"),
                 transform: [{translateY}]
            }}>
                <AlbumHeader setHeaderHeight={setHeaderHeight}/>
            </Animated.View>
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
          <PhotoDetail photo={selectedPhoto} visible={visible} handlePressBack={() => handlePressBack()} imageUrl="https://i.pinimg.com/564x/1a/3f/76/1a3f7634e5a3b52d38a36173ffb05e9f.jpg"/>
        </SafeAreaView>
    )
}