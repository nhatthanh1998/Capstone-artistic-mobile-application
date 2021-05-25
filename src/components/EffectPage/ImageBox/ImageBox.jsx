import React from 'react'
import tailwind from 'tailwind-rn'
import AutoScaleImage from 'react-native-scalable-image';
import { View, Dimensions } from 'react-native'
export const ImageBox = ({ imageURL }) => { 
    if(imageURL === undefined) {
        return <View></View>
    } else {
        return (
            <View style={tailwind("w-full h-2/3 bg-gray-100 flex flex-col justify-center")} >
                <AutoScaleImage
                    width={Dimensions.get('window').width}
                    source = {{uri: imageURL}}
                />
            </View>
        )
    }
}