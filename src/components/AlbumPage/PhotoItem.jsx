import React from 'react'
import { TouchableOpacity, View, Image } from 'react-native'
import tailwind from 'tailwind-rn'
import { styles } from '../../styles'


export const PhotoItem = ({data, handlePress}) => {
    const {item} = data
    const {accessURL, id, photoLocation, photoName, uri} = item
    return (
      <View style={tailwind("w-1/3 mb-5 flex-row justify-center")}>
          <View style={tailwind("relative")}>
              <TouchableOpacity style={{...tailwind("overflow-hidden relative z-10 rounded-3xl w-24 h-24"), ...styles.shadow_2}}
              onPress = {() => handlePress()}
              >
                  <Image source={{uri:accessURL}} style={tailwind("w-full h-full bg-red-100")}/>
              </TouchableOpacity>
  
              <TouchableOpacity style={{...tailwind("bg-gray-50 mt-3 py-2 rounded-full")}}>
                  <Text style={tailwind("font-thin text-xs text-center")}>{photoName}</Text>
              </TouchableOpacity>
          </View>
      </View>
    )
  }
  