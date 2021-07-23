import React, { useState } from 'react'
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native'
import tailwind from 'tailwind-rn'
import Modal from 'react-native-modal';

export const SaveToAlbumSuccessModal = ({isVisible, onCancel, onConfirm} ) => {
    const [modelWidth, setModalWidth] = useState(0)
    const [imageHeight, setImageHeight] = useState(0) 

    const paddingTop = imageHeight / 1.9

    return (
        <View>
            <Modal isVisible={isVisible} 
            animationOut="bounceOut"
            animationIn="bounceInUp"
            animationInTiming={350}
            animationOutTiming={250}
            backdropColor="black"
            backdropOpacity={0.7}
            >
                <View onLayout={(event) => {
                    setModalWidth(event.nativeEvent.layout.width)
                }} style={{...tailwind("bg-white pb-10"), ...styles.border, paddingTop: paddingTop, transform: [{translateY: (imageHeight - paddingTop) / 2.5}]}}>
                    <View style={{...tailwind("absolute flex flex-row justify-center"), transform: [{translateY: -(imageHeight / 2) }], width: modelWidth}}>
                        <Image onLayout={(event) => {
                            setImageHeight(event.nativeEvent.layout.height)
                        }} 
                        style={tailwind("h-64")}
                        resizeMode="contain"
                        source={require('../../../assets/modals/download-complete.webp')}></Image>
                    </View>
                    <Text style={tailwind("text-2xl font-bold tracking-tight text-center")}>Save success</Text>
                    <Text style={tailwind("text-center mt-1 text-base tracking-wide text-gray-500")}>Your photo save successfully.</Text>
                    <View style={tailwind("flex flex-row justify-center mt-6")}>
                        <TouchableOpacity onPress={onConfirm} style={tailwind("py-3 bg-yellow-300 rounded-full w-32 mx-5")}>
                            <Text style={tailwind("text-center text-base tracking-tight font-medium")}>Continue</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onCancel} style={tailwind("py-3 bg-gray-800 rounded-full w-32")}>
                            <Text style={tailwind("text-center text-base tracking-tight font-medium text-gray-200")}>Exit</Text>
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