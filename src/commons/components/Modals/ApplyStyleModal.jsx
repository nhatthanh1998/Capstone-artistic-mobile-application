import React, { useState, useEffect } from 'react'
import {View, Text, TouchableOpacity, Image} from 'react-native'
import tailwind from 'tailwind-rn'
import Modal from 'react-native-modal';
import { styles } from '../../../styles';
import { VerticalCarousel } from '../../../components/MainPage/VerticalCarousel'
import { fetchAllVideoSupportedStyles } from '../../../apis/styles';
import { Video } from 'expo-av';
import Toast from 'react-native-toast-message';


export const ApplyStyleModal = (props) => {
    const {visible, onCancel, handleRequestTransferVideo, setSelectedStyleId} = props
    const [modalWidth, setModalWidth] = useState(100)
    const [stylesBE, setStylesBE] = useState([])
    const [selectedStyle, setSelectedStyle] = useState({})
    const video = React.useRef(null);
    useEffect(() => {
        fetchAllVideoSupportedStyles().then(styles => {
            setStylesBE(styles)
            if(styles.length > 0) {
                setSelectedStyle(styles[0])
                setSelectedStyleId(styles[0].id)
            }
        }).catch(error => {
            console.log(error)
            Toast.show({
                text1: "Error",
                text2: error,
                type: 'error',
                position: 'top'
            })
        })
        return () => {}
    }, [])

    useEffect(() => {
        // TODO: fetch video showcase
        return () => {}
    }, [selectedStyle])

    const handleSetSelectedStyle = (style) => {
        setSelectedStyle(style)
        setSelectedStyleId(style.id)
    }

    return (
        <View>
            <Modal isVisible={visible} 
                animationOut="bounceOut"
                animationIn="bounceInUp"
                animationInTiming={350}
                animationOutTiming={150}
                backdropColor="black"
                backdropOpacity={0.7}
            >
                <View style={tailwind("bg-white m-5 rounded-xl py-5 relative")} onLayout={(e) => {
                    setModalWidth(e.nativeEvent.layout.width)
                }}>
                    <TouchableOpacity onPress={() => onCancel()} style={tailwind("absolute z-10 mt-3 mr-3 top-0 right-0")}>
                        <Image source={require('../../../assets/icons/x-square.png')} style={tailwind("w-5 h-5")}/>
                    </TouchableOpacity>
                    <Text style={tailwind("text-2xl font-bold tracking-tight text-center px-5")}>Apply Style To Video</Text>
                    <View style={tailwind("text-xs mt-1 flex items-center")}>
                        <Text>Select style to transform your video</Text>
                    </View>
                    
                    <View style={{...tailwind("flex justify-center items-center bg-gray-500 overflow-hidden rounded-lg w-full mt-3"), ...styles.shadow_2}}>
                        {
                            selectedStyle.demoVideoURL ? (
                                <Video style={{...tailwind("w-full h-40 ")}}
                                ref={video}
                                useNativeControls
                                resizeMode="cover"
                                onLoad={() => {video.current.playAsync()}}
                                source={{
                                    uri: selectedStyle.demoVideoURL
                                }}/> 
                            ) : (
                                <View style={tailwind("w-full h-40 flex justify-center items-center")}>
                                    <Text style={tailwind("text-white")}>Not have demo video</Text>
                                </View>
                            )
                        
                        }
                        
                    </View>
                    <View style={tailwind("pt-5 w-full flex items-center")}>
                        <VerticalCarousel data={stylesBE} setSelectedStyle={handleSetSelectedStyle} sliderWidth={modalWidth} itemShow={3}/>
                    </View>
                    <View style={tailwind("flex relative z-10 flex-row justify-center mt-3")}>
                        <TouchableOpacity
                            onPress={handleRequestTransferVideo}
                            style={{...tailwind("bg-yellow-400 border border-yellow-500 px-7 text-xs py-4 rounded-full"), ...styles.shadow_4}}>
                            <Text style={tailwind("font-medium text-base text-center text-gray-900 ")}>Transfer Video</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    )
}