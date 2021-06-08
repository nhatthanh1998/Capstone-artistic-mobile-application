import React from 'react'
import tailwind from 'tailwind-rn'
import AutoScaleImage from 'react-native-scalable-image';
import { View, Dimensions } from 'react-native'
export const ImageBox = ({ photoURL }) => {
    if(photoURL === undefined) {
        return <View></View>
    } else {
        return (
            <View style={tailwind("w-full h-3/5 bg-gray-100 flex flex-col justify-center mt-24")} >
                <AutoScaleImage
                    width={Dimensions.get('window').width}
                    source = {{uri: photoURL}}
                />
            </View>
        )
    }
}