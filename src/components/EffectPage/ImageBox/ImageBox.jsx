import React from 'react'
import tailwind from 'tailwind-rn'
import AutoScaleImage from 'react-native-scalable-image';
import { View, Dimensions } from 'react-native'
export const ImageBox = ({ photoURL, prevPhotoURL }) => {
    if (photoURL !== undefined) {
        return (
            <View style={tailwind("w-full h-3/5 bg-gray-100 flex flex-col justify-center mt-24")} >
                <AutoScaleImage
                    width={Dimensions.get('window').width}
                    source={{ uri: photoURL }}
                />
            </View>
        )
    } 
    if(photoURL === undefined && prevPhotoURL !== undefined) {
        return <View style={tailwind("w-full h-3/5 bg-gray-100 flex flex-col justify-center mt-24")} >
            <AutoScaleImage
                width={Dimensions.get('window').width}
                source={{ uri: prevPhotoURL }}
            />
        </View>
    }

    if(photoURL === undefined && prevPhotoURL === undefined) {
        return null
    }
}