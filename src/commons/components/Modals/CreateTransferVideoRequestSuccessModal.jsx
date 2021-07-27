import React from 'react'
import {View, Text, TouchableOpacity, Image} from 'react-native'
import tailwind from 'tailwind-rn'
import Modal from 'react-native-modal';


export const CreateTransferVideoReqestSuccessModal = (props) => {
    const {isVisible, onConfirm} = props
    return (
        <Modal isVisible={isVisible} 
            animationOut="bounceOut"
            animationIn="bounceInUp"
            animationInTiming={350}
            animationOutTiming={150}
            backdropColor="black"
            backdropOpacity={0.7}
        >
            <View style={tailwind("bg-white m-5 rounded-xl p-5 relative")}>
                <TouchableOpacity onPress={() => onConfirm()} style={tailwind("absolute z-10 mt-3 mr-3 top-0 right-0")}>
                    <Image source={require('../../../assets/icons/x-square.png')} style={tailwind("w-5 h-5")}/>
                </TouchableOpacity>
                <Text style={tailwind("text-2xl font-bold tracking-tight text-center")}>Message</Text>
                <View style={tailwind("flex flex-row justify-center")}>
                    <Text style={tailwind("text-center mt-1 text-base tracking-wide text-gray-500")}>
                        Your request has been received. It's may take a while, you will get a notification when the process completed!
                    </Text>
                </View>
                <View style={tailwind("flex flex-row justify-center mt-6")}>
                    <TouchableOpacity onPress={onConfirm} style={tailwind("py-3 bg-yellow-300 rounded-full w-32 mx-2")}>
                        <Text style={tailwind("text-center text-base tracking-tight font-medium")}>Get it</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}