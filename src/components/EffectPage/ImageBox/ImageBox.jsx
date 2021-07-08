import React, {useState, useEffect} from 'react'
import tailwind from 'tailwind-rn'
import { View, Dimensions, Image } from 'react-native'
const screenWidth = Dimensions.get('window').width
export const ImageBox = ({ photoURL, prevPhotoURL }) => {
    const [curOriginHeight, setCurOriginHeight] = useState(0)
    const [prevOriginHeight, setPrevOriginHeight] = useState(0)

    useEffect(() => {
        if(photoURL) {
            Image.getSize(photoURL, (width, height) => {
                setCurOriginHeight(screenWidth * height / width)
            })
        }
    }, [photoURL])

    useEffect(() => {
        if(prevPhotoURL) {
            Image.getSize(prevPhotoURL, (width, height) => {
                setPrevOriginHeight(screenWidth * height / width)
            })
        }
    }, [prevPhotoURL])

    if (photoURL) {
        return (
            <View style={tailwind("w-full h-3/5 bg-gray-100 flex flex-col justify-center mt-24")} >
                <Image
                    style={{height: curOriginHeight, ...tailwind("w-full")}} 
                    source={{uri: photoURL}}
                />  
            </View>
        )
    } 
    else if(photoURL === undefined && prevPhotoURL) {
        return <View style={tailwind("w-full h-3/5 bg-gray-100 flex flex-col justify-center mt-24")} >
        <Image
            style={{height: prevOriginHeight, ...tailwind("w-full")}} 
            source={{uri: prevPhotoURL}}
        />  
    </View>
    }

    else {
        return null
    }
}