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
import { AlbumHeader } from '../../components/AlbumPage/AlbumHeader'

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
        <PhotoList/>
    );
}