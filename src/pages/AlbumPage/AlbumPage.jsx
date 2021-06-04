import React, {useEffect} from 'react'
import {Text, StatusBar} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import CameraRollGallery from 'react-native-camera-roll-gallery';
import { selectAlbumSelectedPhoto, selectAlbumPhotos } from '../../redux/slicers/albums.slicer'
import { getAlbumPhotos } from './handler'
import tailwind from 'tailwind-rn'
import { PageHeader } from '../../components/AlbumPage/PageHeader';

export const AlbumPage = () => {

    const dispatch = useDispatch()
    const albumSelectedPhoto = useSelector(selectAlbumSelectedPhoto)
    const albumPhotos = useSelector(selectAlbumPhotos)

    useEffect(() => {
        getAlbumPhotos({dispatch})
        StatusBar.setHidden(true);
    }, [])

    if(albumPhotos.length === 0) {
        return <Text>Not have image</Text>
    }

    return (
        <CameraRollGallery
            imageContainerStyle={tailwind('rounded-xl')}
            enableCameraRoll={false} // default true,
            enableVerticalExit={true}
            // imageContainerStyle={{
            //     width: 1000,
            // }}
            renderPageHeader={(item, index, onClose) => {
                return <PageHeader item={item} onClose={onClose}/>
            }}

            renderPageFooter={(item, index, onClose) => {
                return 
            }}

            onGetData={(fetchParams, resolve) => {
                resolve({
                    assets: albumPhotos,
                    pageInfo: {
                        hasNextPage: false
                    }
                });
            }}
        />
    );


}