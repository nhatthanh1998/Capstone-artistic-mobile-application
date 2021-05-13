import React, { useState, useEffect } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import tailwind from "tailwind-rn"



export const CameraPage = ({navigation}) => {
  const [hasPermission, setHasPermission] = useState(null);
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

  const handleTakePicture = async () => {
    if (camera) {
      const pictureData = await camera.takePictureAsync(null)
      navigation.navigate("EffectPage", {
        pictureUri: pictureData.uri
      })

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