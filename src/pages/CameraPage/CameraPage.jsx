import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import tailwind from "tailwind-rn"

import { Text, View, Image, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import { Loading } from '../../components/CameraPage/Loading/Loading'

import { selectIsLoading } from '../../redux/slicers/is-loading.slicer'
import {getCameraPermission, handlePressFlip, handleTakePicture} from './handler'
import { UPLOAD_PHOTO_LOADING_MESSAGE } from '../../enums/loading-message'
import { CAMERA_ERROR_MESSAGE, CAMERA_NOT_GRANTED_MESSAGE } from '../../enums/error-message'

export const CameraPage = ({ navigation }) => {
  const dispatch = useDispatch()
  const [hasPermission, setHasPermission] = useState(null);
  const [camera, setCamera] = useState(null)
  const [type, setType] = useState(Camera.Constants.Type.back);
  const isLoading = useSelector(selectIsLoading)


  useEffect(() => {
    getCameraPermission({setHasPermission})
    return () => {}
  }, [])


  if (hasPermission === null) {
    return <Text>{ CAMERA_ERROR_MESSAGE }</Text>;
  }
  if (hasPermission === false) {
    return <Text>{ CAMERA_NOT_GRANTED_MESSAGE }</Text>;
  }

  return (
    <View style={tailwind("flex-1")}>
      <View style={tailwind("flex-1	")}>
        <Camera style={tailwind("flex-1")}
          ref={ref => setCamera(ref)}
          type={type}
          ratio={'16:9'}
        >
          <Loading isLoading = { isLoading } loadingText = {UPLOAD_PHOTO_LOADING_MESSAGE}/>

          <View style={tailwind("w-full h-24 absolute bottom-0 flex flex-row")}>
            <View style={tailwind("w-1/3 h-24")}>

            </View>

            <TouchableOpacity style={tailwind("w-1/3 h-24 items-center")}
              onPress={() => handleTakePicture({camera, dispatch, navigation})}
            >
              <Image source={require("../../commons/images/take_picture_icon.png")}
                style={tailwind("w-24 h-24 absolute")}
              />
            </TouchableOpacity>
            <TouchableOpacity style={tailwind("w-1/3 h-24 items-center justify-center")}
              onPress={() => {
                handlePressFlip({type, setType})
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
