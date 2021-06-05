import { Camera } from 'expo-camera';

import { uploadPhotoToServer } from '../../apis/photos'
import { setOriginImage } from '../../redux/slicers/origin-image.slicer'
import { setIsLoading } from '../../redux/slicers/is-loading.slicer'

import { EFFECT_PAGE } from '../../enums/page-name'
import { GRANTED } from '../../enums/device-status'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImageManipulator from 'expo-image-manipulator';


export const getCameraPermission = async ({setHasPermission}) => {
    const { status } = await Camera.requestPermissionsAsync()
    status === GRANTED ? setHasPermission(true) : setHasPermission(false)
    return null
}


export const handlePressFlip = ({type, setType}) => {
    if (type === Camera.Constants.Type.back) {
      setType(Camera.Constants.Type.front)
    } else {
      setType(Camera.Constants.Type.back)
    }
    return null
  }

  export const handleTakePicture = async ({dispatch, camera, navigation}) => {
    dispatch(setIsLoading(true))
    if (camera) {
      const options = {
        quality: 0.8,
        base64: false,
        skipProcessing: false,
      };
      const photoData = await camera.takePictureAsync(options)

      const photo = await ImageManipulator.manipulateAsync(
        photoData.uri,
        [{ resize: { width: 720, height: 1280 } }],
        { format: 'jpeg' }
    );
      dispatch(setOriginImage({accessURL: photo.uri}))
      const socketId = await AsyncStorage.getItem("socketId")
      const token = await AsyncStorage.getItem("token")
      uploadPhotoToServer({imageURI: photo.uri, socketId: socketId, token})
      navigation.navigate(EFFECT_PAGE)
    } else {
        console.log('no camera instance')
    }
  }