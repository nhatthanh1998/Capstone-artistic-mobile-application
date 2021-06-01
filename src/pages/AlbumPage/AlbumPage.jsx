import React, {useEffect} from 'react'
import {Text, Dimensions, TouchableOpacity} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import CameraRollGallery from 'react-native-camera-roll-gallery';
import { selectAlbumSelectedPhoto, selectAlbumPhotos, setAlbumPhotos, setAlbumSelectedPhoto } from '../../redux/slicers/albums.slicer'
import { getAlbumPhotos } from './handler'
import AutoScaleImage from 'react-native-scalable-image';

export const AlbumPage = () => {

    const dispatch = useDispatch()
    const albumSelectedPhoto = useSelector(selectAlbumSelectedPhoto)
    const albumPhotos = useSelector(selectAlbumPhotos)

    useEffect(() => {
        getAlbumPhotos({dispatch})
    }, [])

    if(albumPhotos.length === 0) {
        return <Text>Not have image</Text>
    }

    return (
        <CameraRollGallery
            enableCameraRoll={false} // default true,
            enableVerticalExit={true}
            // imageContainerStyle={{
            //     width: 1000,
            // }}

            renderPageHeader={(item, index, onClose) => {
                return <Text>Header</Text>
            }}
            imagePageComponent={({image}, imageDimensions) => {
                const imageURI = image.uri
                return (
                    <TouchableOpacity
                        onPress={() => {
                        console.log("hello")
                    }}
                    >
                                        <AutoScaleImage
                            width={Dimensions.get('window').width}
                            source = {{uri: imageURI}}
                        /> 
                    </TouchableOpacity>

                )
 
            }} 
            onPageSelected={(i) => console.log(albumPhotos[i])}
            onGetData={(fetchParams, resolve) => {
                resolve({
                    assets: albumPhotos,
                    pageInfo: {
                        hasNextPage: false
                    }
                });
            }}
            onSelect={(item) => {
                console.log(item)
            }}
        />
    );


}