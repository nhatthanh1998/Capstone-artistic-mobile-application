import * as ImagePicker from 'expo-image-picker';
import {CAMERA_PAGE, EFFECT_PAGE, MAIN_PAGE} from '../../enums/page-name'
import {setIsLoading} from '../../redux/slicers/is-loading.slicer'
import {uploadPhotoToServer} from '../../apis/photos'
import AsyncStorage from '@react-native-async-storage/async-storage'


// GET PERMISSION HANDLER
export const getGalleryAccessPermission = async ({currentOS, setHasGalleryPermission}) => {
    if (currentOS !== 'web') {
        const galleryPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (galleryPermission.status !== 'granted') {
            setHasGalleryPermission(false)
        } else {
            setHasGalleryPermission(true)
        }
    }
}



// ACTION HANDLER 

export const handlePressCamera = ({navigation}) => {
    navigation.navigate(CAMERA_PAGE)
}


export const handlePressMenu = () => {

}


export const handlePressGallery = async ({navigation, dispatch}) => {
    let photo = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
    });

    if (!photo.cancelled) {
        dispatch(setIsLoading(true))
        dispatch(setOriginImage({accessURL: photo.uri}))
        const socketId = await AsyncStorage.getItem("socketId")
        uploadPhotoToServer({imageURI: photo.uri, socketId: socketId})
        navigation.navigate(EFFECT_PAGE)
    }
    else {
        navigation.navigate(MAIN_PAGE)
    }
}