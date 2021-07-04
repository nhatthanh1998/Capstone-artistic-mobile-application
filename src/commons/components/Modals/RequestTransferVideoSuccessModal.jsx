import React, { useState } from 'react'
import {View, Text, TouchableOpacity, Image} from 'react-native'
import tailwind from 'tailwind-rn'
import Modal from 'react-native-modal';


export const RequestTransferVideoSuccessModal = (props) => {
    const {isVisible, onCancel, handlePressCamera, handlePressGallery} = props
    const [action, setAction] = useState('')
    return (
        <View>
            <Modal isVisible={isVisible} 
                animationOut="bounceOut"
                animationIn="bounceInUp"
                animationInTiming={350}
                animationOutTiming={150}
                backdropColor="black"
                backdropOpacity={0.7}
                onModalHide={() => {
                    if(action == 'take a photo') {
                        handlePressCamera()
                    } else if(action == 'go to gallery') {
                        handlePressGallery()
                    }
                }}
            >
                <View style={tailwind("bg-white m-5 rounded-xl p-5 relative")}>
                    <TouchableOpacity onPress={() => onCancel()} style={tailwind("absolute z-10 mt-3 mr-3 top-0 right-0")}>
                        <Image source={{uri:"https://image.flaticon.com/icons/png/512/1/1193.png"}} style={tailwind("w-5 h-5")}/>
                    </TouchableOpacity>
                    <Text style={tailwind("text-2xl font-bold tracking-tight text-center")}>Request Success</Text>
                    <View style={tailwind("flex flex-row justify-center")}>
                        <Text style={tailwind("text-center mt-1 text-base tracking-wide text-gray-500")}>
                            Your transfer video request has been received! You can also check your request's progress. We will notify when your transfer complete.
                        </Text>
                    </View>
                
                </View>
            </Modal>
        </View>
    )
}