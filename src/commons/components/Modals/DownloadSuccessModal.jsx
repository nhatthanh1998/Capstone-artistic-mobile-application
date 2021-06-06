import React, { useState } from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import tailwind from 'tailwind-rn'
import Modal from 'react-native-modal';
import AutoScaleImage from 'react-native-scalable-image';
import { TITLE, MESSAGE, YES_BUTTON } from '../../../enums/modals/download-success-model'


export const DownloadSuccessModal = (props) => {
    const {isVisible, onClose} = props
    const [modelWidth, setModalWidth] = useState(0)
    const [imageHeight, setImageHeight] = useState(0) 

    const paddingTop = imageHeight / 1.9

    return (
        <View>
            <Modal isVisible={isVisible} 
            animationOut="fadeOutUpBig"
            animationIn="fadeInUpBig"
            backdropColor="black"
            backdropOpacity={0.7}
            >
                <View onLayout={(event) => {
                    setModalWidth(event.nativeEvent.layout.width)
                }} style={{...tailwind("bg-white pb-10"), ...styles.border, paddingTop: paddingTop, transform: [{translateY: (imageHeight - paddingTop) / 2.5}]}}>
                    <View style={{...tailwind("absolute flex flex-row justify-center"), transform: [{translateY: -(imageHeight / 2) }], width: modelWidth}}>
                        <AutoScaleImage 
                            onLayout={(event) => {
                                setImageHeight(event.nativeEvent.layout.height)
                            }} 
                            width={modelWidth - 20} 
                            source={require('../../images/modals/download-complete.webp')}
                        />
                    </View>
                    <Text style={tailwind("text-2xl font-bold tracking-tight text-center text-black")}>{TITLE}</Text>
                    <Text style={tailwind("text-center mt-1 text-base tracking-wide text-gray-500")}>{MESSAGE}</Text>
                    <View style={tailwind("flex flex-row justify-center mt-6")}>
                        <TouchableOpacity onPress={onClose} style={tailwind("py-3 bg-yellow-300 rounded-full w-32 mx-5")}>
                            <Text style={tailwind("text-center text-black text-base tracking-tight font-medium")}>{YES_BUTTON}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    centerHalf: {
        transform: [{translateY: -140}]
    },
    border: {
        borderRadius: 70
    }
})