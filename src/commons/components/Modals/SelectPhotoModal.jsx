import React, { useState } from 'react'
import {View, Text, TouchableOpacity, Image} from 'react-native'
import tailwind from 'tailwind-rn'
import Modal from 'react-native-modal';


export const SelectPhotoModal = (props) => {
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
                    <Text style={tailwind("text-2xl font-bold tracking-tight text-center")}>Transfer Photo</Text>
                    <View style={tailwind("flex flex-row justify-center")}>
                        <Text style={tailwind("text-center mt-1 text-base tracking-wide text-gray-500")}>
                            Selecting a photo to apply transformation by
                        </Text>
                    </View>
                    
                    <View style={tailwind("flex flex-row justify-center mt-6")}>
                        <TouchableOpacity onPress={() => {
                            setAction('take a photo')
                            onCancel()
                        }} style={tailwind("px-3")}>
                            <View style={tailwind("flex flex-row justify-center")}>
                                <Image style={tailwind("w-10 h-10")} source={{uri:"https://image.flaticon.com/icons/png/512/685/685655.png"}} />
                            </View>
                            <Text style={tailwind("text-xs text-center mt-1")}>Take a photo</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                         onPress={() => {
                            setAction('go to gallery')
                            onCancel()
                        }}
                         style={tailwind("px-3")}>
                            <View style={tailwind("flex flex-row justify-center")}>
                                <Image style={tailwind("w-10 h-10")} source={{uri: "https://image.flaticon.com/icons/png/512/570/570436.png"}} />
                            </View>
                          <Text style={tailwind("text-xs text-center mt-1")}>From gallery</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    )
}