import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage';
import tailwind from "tailwind-rn"

import { Text, View, Image, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import {Loading} from '../../components/CameraPage/Loading/Loading'
import * as ImageManipulator from 'expo-image-manipulator';


import { uploadImageToServer } from '../../apis/upload_images'
import {setOriginImage} from '../../redux/slicers/origin-image.slicer'
import { setIsLoading, selectIsLoading } from '../../redux/slicers/is-loading.slicer'


export const CameraPage = ({ navigation }) => {
  const dispatch = useDispatch()
  const [hasPermission, setHasPermission] = useState(null);
  const [camera, setCamera] = useState(null)
  const [type, setType] = useState(Camera.Constants.Type.back);
  const isLoading = useSelector(selectIsLoading)


  async function getPermissionStatus() {
    const { status } = await Camera.requestPermissionsAsync()
    status === "granted" ? setHasPermission(true) : setHasPermission(false)
  }

  useEffect(() => {
    getPermissionStatus()
    return () => {}
  }, [])


  if (hasPermission === null) {
    return <Text>Something went wrong with the camera</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }


  const handlePressFlip = () => {
    if (type === Camera.Constants.Type.back) {
      setType(Camera.Constants.Type.front)
    } else {
      setType(Camera.Constants.Type.back)
    }
  }

  const handleTakePicture = async () => {
    dispatch(setIsLoading(true))
    if (camera) {
      const options = {
        quality: 0.8,
        base64: false,
        skipProcessing: false,
      };
      const pictureData = await camera.takePictureAsync(options)

      const image = await ImageManipulator.manipulateAsync(
        pictureData.uri,
        [{ resize: { width: 720, height: 1280 } }],
        { format: 'jpeg' }
    );
      dispatch(setOriginImage({accessURL: image.uri}))
      const socketID = await AsyncStorage.getItem("socketID")
      uploadImageToServer({imageURI: pictureData.uri, socketID: socketID})
      navigation.navigate("EffectPage")
    }
  }

  
  return (
    <View style={tailwind("flex-1")}>
      <View style={tailwind("flex-1	")}>
        <Camera style={tailwind("flex-1")}
          ref={ref => setCamera(ref)}
          type={type}
          ratio={'16:9'}
        >
          <Loading isLoading = {isLoading} loadingText = "Progressing your image..."/>

          <View style={tailwind("w-full h-24 absolute bottom-0 flex flex-row")}>
            <View style={tailwind("w-1/3 h-24")}>

            </View>

            <TouchableOpacity style={tailwind("w-1/3 h-24 items-center")}
              onPress={() => handleTakePicture()}
            >
              <Image source={require("../../commons/images/take_picture_icon.png")}
                style={tailwind("w-24 h-24 absolute")}
              />
            </TouchableOpacity>
            <TouchableOpacity style={tailwind("w-1/3 h-24 items-center justify-center")}
              onPress={async () => {
                await handlePressFlip()
              }}
            >
              <Image source={require("../../commons/images/flip_icon.png")}
                style={tailwind("w-16 h-16 absolute")}
              />
            </TouchableOpacity>
          </View>
        </Camera>
      </View>
    </View>
  );
}
