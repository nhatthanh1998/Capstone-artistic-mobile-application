import React from 'react'
import {View, Text, TouchableOpacity, Image} from 'react-native'
import tailwind from 'tailwind-rn'
import Modal from 'react-native-modal';


export const QuitModal = (props) => {
    const {isVisible, onCancel, onConfirm} = props
    return (
        <View>
            <Modal isVisible={isVisible} 
                animationOut="bounceOut"
                animationIn="bounceInUp"
                animationInTiming={350}
                animationOutTiming={150}
                backdropColor="black"
                backdropOpacity={0.7}
            >
                <View style={tailwind("bg-white m-5 rounded-xl p-5 relative")}>
                    <TouchableOpacity onPress={() => onCancel()} style={tailwind("absolute z-10 mt-3 mr-3 top-0 right-0")}>
                        <Image source={{uri:"https://image.flaticon.com/icons/png/512/1/1193.png"}} style={tailwind("w-5 h-5")}/>
                    </TouchableOpacity>
                    <Text style={tailwind("text-2xl font-bold tracking-tight text-center")}>Exit</Text>
                    <View style={tailwind("flex flex-row justify-center")}>
                        <Text style={tailwind("text-center mt-1 text-base tracking-wide text-gray-500")}>
                            Are you sure to exit?
                        </Text>
                    </View>
                    <View style={tailwind("flex flex-row justify-center mt-6")}>
                        <TouchableOpacity onPress={onConfirm} style={tailwind("py-3 bg-yellow-300 rounded-full w-32 mx-5")}>
                            <Text style={tailwind("text-center text-base tracking-tight font-medium")}>Exit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onCancel} style={tailwind("py-3 bg-gray-800 rounded-full w-32")}>
                            <Text style={tailwind("text-center text-base tracking-tight font-medium text-gray-200")}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    )
}