import React, { useState, useEffect } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import tailwind from "tailwind-rn"
import { uploadImageToServer } from '../../apis/upload_images'
import {selectSelectedImage, setSelectedImage} from '../../redux/slicers/image.slicer'
import LottieView from 'lottie-react-native';
import {useSelector, useDispatch} from 'react-redux'

export const CameraPage = ({ navigation }) => {
  const dispatch = useDispatch()
  const selectedImage = useSelector(selectSelectedImage)
  
  const [hasPermission, setHasPermission] = useState(null);
  const [loading, setLoading] = useState(false)
  const [camera, setCamera] = useState(null)
  const [type, setType] = useState(Camera.Constants.Type.back);

  async function getPermissionStatus() {
    const { status } = await Camera.requestPermissionsAsync()
    status === "granted" ? setHasPermission(true) : setHasPermission(false)
  }

  useEffect(() => {
    getPermissionStatus()
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


  const renderLoading = () => {
    if (loading == false) {
      return
    } else {
      return (
        <View style={tailwind("flex-1 bg-white")}>
          <Text style={tailwind("w-full text-center text-xl pt-20 font-bold")}>Progressing your image...</Text>
          <LottieView source={require("../../commons/lottie/loading2.json")} autoPlay={true} loop={true} />
        </View>
      )

    }
  }

  const handleTakePicture = async () => {
    if (camera) {
      setLoading(true)
      const pictureData = await camera.takePictureAsync(null)
      const data = await uploadImageToServer(pictureData.uri)
      dispatch(setSelectedImage(data))
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
          {renderLoading()}
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