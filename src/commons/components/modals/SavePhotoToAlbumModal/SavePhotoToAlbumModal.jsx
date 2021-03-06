import React from 'react'
import {View, Text, TouchableOpacity, Image} from 'react-native'
import tailwind from 'tailwind-rn'
import Modal from 'react-native-modal';
import { styles } from '../../../../styles';
import { AlbumPicker } from './DropDown'

export const SavePhotoToAlbumModal = ({isVisible, onCancel, onConfirm, selectedAlbum, setSelectedAlbum}) => {
    return (
            <Modal isVisible={isVisible} 
                animationOut="bounceOut"
                animationIn="bounceInUp"
                animationInTiming={350}
                animationOutTiming={150}
                backdropColor="black"
                backdropOpacity={0.7}
            >
                <View style={tailwind("bg-white m-5 rounded-xl p-5 pb-10 relative")}>
                    <TouchableOpacity onPress={() => onCancel()} style={tailwind("absolute z-10 mt-3 mr-3 top-0 right-0")}>
                        <Image source={require('../../../../assets/icons/x-square.png')} style={tailwind("w-5 h-5")}/>
                    </TouchableOpacity>
                    <Text style={tailwind("text-2xl font-bold tracking-tight text-center")}>Save Photo</Text>
                    <View style={tailwind("flex flex-row justify-center")}>
                        <Text style={tailwind("text-center mt-1 text-base tracking-wide text-gray-500 mb-3")}>
                            Choose album you want to save your photo to
                        </Text>
                    </View>
                    <AlbumPicker
                        selectedAlbum={selectedAlbum}
                        setSelectedAlbum={setSelectedAlbum}
                    />
                    <View style={tailwind("flex flex-row relative w-full justify-center items-center z-10")}>
                        <TouchableOpacity onPress={() => {
                            onConfirm()
                        }} style={{...tailwind("p-3 bg-yellow-300 w-32 rounded-xl mt-4"), ...styles.shadow_2}}>
                            <Text style={tailwind("text-center text-sm")}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
    )
}
