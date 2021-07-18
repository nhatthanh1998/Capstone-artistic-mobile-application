import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import tailwind from "tailwind-rn"

import { Text, View, Image, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import { Loading } from '../../commons/components/Loading/Loading'
import { selectIsLoading } from '../../redux/slicers/is-loading.slicer'
import { getCameraPermission, handlePressFlip, handleTakePicture, handlePressBack, handlePressFlash } from './handler'
import { CAMERA_ERROR_MESSAGE, CAMERA_NOT_GRANTED_MESSAGE } from '../../enums/error-message'

export const CameraPage = ({ navigation }) => {
  const dispatch = useDispatch()
  const [hasPermission, setHasPermission] = useState(null);
  const [camera, setCamera] = useState(null)
  const [type, setType] = useState(Camera.Constants.Type.back);
  const isLoading = useSelector(selectIsLoading)
  const [flash, setFlash] = useState("off")

  useEffect(() => {
    getCameraPermission({ setHasPermission })
    return () => { }
  }, [])


  if (hasPermission === null) {
    return <Text>{CAMERA_ERROR_MESSAGE}</Text>;
  }
  if (hasPermission === false) {
    return <Text>{CAMERA_NOT_GRANTED_MESSAGE}</Text>;
  }

  return (
    <View style={tailwind("flex-1")}>
      <View style={tailwind("flex-1	")}>
        <Camera style={tailwind("flex-1 w-full relative")}
          ref={ref => setCamera(ref)}
          type={type}
          flashMode={flash}
          ratio={'16:9'}
        >
          <Loading isLoading={isLoading} />
          <TouchableOpacity style={tailwind("absolute flex items-center justify-center m-4 rounded-lg h-8 w-8 mt-10")}
            onPress={() => handlePressBack({ navigation })}
          >
            <Image style={tailwind("w-5 h-5")} source={require('../../assets/icons/left_simple.png')} />
          </TouchableOpacity>
          <View style={tailwind("flex justify-center flex-row items-center mb-6 w-full absolute bottom-0")}>
            <TouchableOpacity
              onPress={() => handlePressFlash({ flash, setFlash })}
            >
              <Image style={tailwind("w-6 mr-24 h-6")} source={require('../../assets/icons/flash-on.png')} />
            </TouchableOpacity>

            <TouchableOpacity style={tailwind("w-14 h-14 bg-white border-gray-50 border-4 rounded-full")}
              onPress={() => { handleTakePicture({ camera, dispatch, navigation }) }}
            >
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                handlePressFlip({ setType, type })
              }}>
              <Image style={tailwind("w-6 ml-24 h-6")} source={require('../../assets/icons/switch-camera.png')} />
            </TouchableOpacity>
          </View>
        </Camera>
      </View>
    </View>
  );
}
