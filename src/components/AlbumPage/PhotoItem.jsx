import React, {useState, useEffect, useRef} from 'react'
import { TouchableOpacity, View, Image, ImageBackground } from 'react-native'
import tailwind from 'tailwind-rn'
import { styles } from '../../styles'


export const PhotoItem = ({data, handlePress}) => {
    const {item} = data
    const [src, setSrc] = useState(null)

    const ref = useRef(false)
    useEffect(() => {
      ref.current = true
      return () => {
        ref.current = false
      }
    }, [])

    useEffect(() => {
        const { item } = data
        if (item.type == "PHOTO") {
            setSrc(item.accessURL)
        } else {
            setSrc(item.thumbnailURL)
        }
    }, [data])
    const {accessURL, type} = item
    if (type == "PHOTO") {
        return (
            <View style={tailwind("w-1/3 mb-5 flex-row justify-center")}>
                <View style={tailwind("relative flex items-center")}>
                    <TouchableOpacity style={{...tailwind("overflow-hidden relative z-10 rounded-3xl w-24 h-24 bg-gray-500"), ...styles.shadow_2}}
                        onPress = {() => handlePress()}
                    >
                        <Image source={{uri: src}} style={tailwind("w-full h-full")}/>
                    </TouchableOpacity>
                </View>
            </View>
        )
    } else {
        const {thumbnailURL} = item
        return (
            <View style={tailwind("w-1/3 mb-5 flex-row justify-center")}>
                <View style={tailwind("relative")}>
                    <TouchableOpacity style={{...tailwind("overflow-hidden relative z-10 rounded-3xl w-24 h-24"), ...styles.shadow_2}} onPress = {() => handlePress()}>
                        <ImageBackground source={{uri: src}} style={tailwind("w-full h-full bg-gray-500")} onError={() => {
                            setTimeout(() => {
                                if (ref.current) {
                                    setSrc(`${thumbnailURL}?time=${new Date().getTime()}`)
                                }
                            }, 500)
                        }}>
                            <View style={{...styles.darken, ...tailwind("w-full h-full flex items-center justify-center")}}>
                                <Image style={tailwind("h-5 w-5")} source={require('../../assets/icons/play.png')}></Image>
                            </View>
                        </ImageBackground>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    
  }
  