import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CameraRollGallery from 'react-native-camera-roll-gallery';
import { selectAlbumSelectedPhoto, selectAlbumPhotos, setAlbumPhotos, setAlbumSelectedPhoto } from '../../redux/slicers/albums.slicer'
import { getAlbumPhotos } from './handler'
export const AlbumPage = () => {

    const dispatch = useDispatch()
    const albumSelectedPhoto = useSelector(selectAlbumSelectedPhoto)
    const albumPhotos = useSelector(selectAlbumPhotos)
    return (
        <CameraRollGallery
            enableCameraRoll={false} // default true,
            enableVerticalExit={true}
            // imageContainerStyle={{
            //     width: 1000,
            // }}
            onGetData={(_, resolve) => {
                getAlbumPhotos({dispatch})
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