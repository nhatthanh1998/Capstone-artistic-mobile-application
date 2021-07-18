import React from 'react'
import {Text, Image, View, TouchableOpacity, ScrollView} from 'react-native'
import tailwind from 'tailwind-rn'
import { styles } from '../../styles'
import * as ImagePicker from 'expo-image-picker';
import {setIsLoading} from '../../redux/slicers/is-loading.slicer'
import { useDispatch } from 'react-redux';
import Toast from 'react-native-toast-message'
import { uploadMedia } from '../../apis/photos'
import { addMedia } from '../../redux/slicers/albumss.slicer'


export const EmptyAlbum = ({albumId}) => {
    const dispatch = useDispatch()

    const handlePressAddItem = async () => {
        let media = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1,
        });
    
        if (!media.cancelled) {
            dispatch(setIsLoading(true))
            const mediaURI = media.uri
            try {
                const {data} = await uploadMedia({uri: mediaURI, albumId })
                dispatch(addMedia({media: data, albumId}))
                dispatch(setIsLoading(false))
            } catch (error) {
                console.log(error)
                Toast.show({
                    text1: "Error",
                    text2: error,
                    type: 'error',
                    position: 'top'
                })
                dispatch(setIsLoading(false))
            }
            
        }
    }
    return (
        <ScrollView >
            <Text style={tailwind("text-center text-3xl mb-3 uppercase font-light tracking-tighter")}>Nothing here</Text>
            <View style={tailwind("flex items-center ")}>
                <Image style={tailwind("h-64 w-64 mb-4")}
                  source={require('../../assets/illustrations/empty.webp')} />
            </View>
            <Text style={tailwind("mx-11 text-center text-sm font-thin")}>
              Your album is currently empty. I suggest taking new photo or select from your gallery and use our transformation.
            </Text>
            <View style={tailwind("relative z-10 flex flex-row justify-center mt-10 pb-10")}>
                <TouchableOpacity style={{...tailwind("w-32 mx-5  bg-gray-800 py-3 rounded-full"), ...styles.shadow_2}}
                onPress={() => handlePressAddItem()}
                >
                    <Text style={tailwind("text-base font-thin text-white text-center")}>Add item</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}
