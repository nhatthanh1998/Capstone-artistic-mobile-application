import React, {useEffect, useState} from 'react'
import {Text, StatusBar, View, Image, ImageBackground} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import CameraRollGallery from 'react-native-camera-roll-gallery';
import { selectAlbumSelectedPhoto, selectAlbumPhotos } from '../../redux/slicers/albums.slicer'
import { getAlbumPhotos } from './handler'
import tailwind from 'tailwind-rn'
import { PageHeader } from '../../components/AlbumPage/PageHeader';
import { styles } from '../../styles'
import { ScrollView } from 'react-native-gesture-handler';
import { PhotoList } from '../../components/AlbumPage/PhotoList'

export const AlbumPage = () => {

    const dispatch = useDispatch()
    const albumSelectedPhoto = useSelector(selectAlbumSelectedPhoto)
    const albumPhotos = useSelector(selectAlbumPhotos)

    const [containWidth, setContainWidth] = useState(0)

    useEffect(() => {
        getAlbumPhotos({dispatch})
        StatusBar.setHidden(true);
    }, [])

    if(albumPhotos.length === 0) {
        return <Text>Not have image</Text>
    }

    return (
        <View style={tailwind("relative")}>
            <ImageBackground source={{uri: "https://i.pinimg.com/564x/ae/9b/6e/ae9b6e73142e1ed76664b2a26449b82c.jpg"}} 
                style={{...tailwind("w-full")}}
            >
                <View style={{...tailwind("flex flex-col items-center w-full pt-9 pb-40"), ...styles.darken}}>
                    <View style={tailwind("flex flex-row items-center mb-5")}>
                        <View style={tailwind("w-1/3 pl-5")}>
                            <Image style={tailwind("w-5 h-5")} source={{uri: "https://img.icons8.com/material-outlined/48/ffffff/left.png"}} />
                        </View>
                        <Text style={tailwind("text-2xl w-1/3 text-white font-medium tracking-wide text-center")}>Original</Text>
                        <View style={tailwind("w-1/3 flex flex-row justify-end pr-5")}>
                            <Image source={{uri: "https://img.icons8.com/android/24/ffffff/more.png"}} style={tailwind("w-4 h-4")} />
                        </View>
                    </View>
                    <View style={{...tailwind("w-20 rounded-full py-3 text-gray-200 mb-5"), ...styles.lighten}}>
                        <Text style={tailwind("text-xs font-thin text-black text-center")}>0 pictures</Text>
                    </View>
                </View>
            </ImageBackground>
            <View style={{...tailwind("pt-3 bg-white w-full h-full overflow-hidden bg-white"), ...styles.bodyRadius}}>
                <PhotoList/>
            </View>
        </View>
    );
}