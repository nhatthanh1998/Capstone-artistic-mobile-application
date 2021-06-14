import React, { useState } from 'react'
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native'
import tailwind from 'tailwind-rn'
import Modal from 'react-native-modal';
import {styles} from '../../../styles'

export const SelectPhotoModal = (props) => {
    const {isVisible, onConfirm, onHideCallback} = props
    return (
        <View>
            <Modal isVisible={isVisible} 
                animationOut="bounceOut"
                animationIn="bounceInUp"
                animationInTiming={350}
                animationOutTiming={250}
                backdropColor="black"
                backdropOpacity={0.7}
                onModalHide={() => onHideCallback()}
            >
                <View style={tailwind("bg-white m-5 rounded-xl p-5 relative")}>
                    <Image source={{uri:"https://image.flaticon.com/icons/png/512/1/1193.png"}} style={tailwind("absolute mt-3 mr-3 w-5 h-5 top-0 right-0")}/>
                    <Text style={tailwind("text-2xl font-bold tracking-tight text-center")}>Transfer Photo</Text>
                    <View style={tailwind("flex flex-row justify-center")}>
                        <Text style={tailwind("text-center mt-1 text-base tracking-wide text-gray-500")}>
                            Selecting a photo to apply transformation by
                        </Text>
                    </View>
                    
                    <View style={tailwind("flex flex-row justify-center mt-6")}>
                        <View style={tailwind("px-3")}>
                            <View style={tailwind("flex flex-row justify-center")}>
                                <Image style={tailwind("w-10 h-10")} source={{uri:"https://image.flaticon.com/icons/png/512/685/685655.png"}} />
                            </View>
                            <Text style={tailwind("text-xs text-center mt-1")}>Take a photo</Text>
                        </View>
                        <View style={tailwind("px-3")}>
                            <View style={tailwind("flex flex-row justify-center")}>
                                <Image style={tailwind("w-10 h-10")} source={{uri: "https://image.flaticon.com/icons/png/512/570/570436.png"}} />
                            </View>
                          <Text style={tailwind("text-xs text-center mt-1")}>From gallery</Text>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}