import React from 'react'
import {View, Image, TouchableOpacity} from 'react-native'
import tailwind from 'tailwind-rn'

export const PageHeader = ({handleSave, handleBack, isDisable}) => {

    return ( 
        <View style={tailwind("flex flex-row bg-white px-5 py-4")}>
            <View style={tailwind("w-1/3")}>
                <TouchableOpacity onPress={() => {handleBack()}}>
                    <Image style={tailwind("w-7 h-7")} source={require('../../../assets/icons/left_icon_black.png')}></Image>
                </TouchableOpacity>
            </View>
            <View style={tailwind("flex flex-row w-2/3 justify-end")}>
                <TouchableOpacity onPress={() => {}}>
                    <Image style={tailwind("w-6 h-6 mr-6")} source={require('../../../assets/icons/delete_black.png')}></Image>
                </TouchableOpacity>
                <TouchableOpacity disabled = {isDisable} onPress={() => {handleSave()}}>
                    <Image style={tailwind("w-6 h-6 mr-6")} source={require('../../../assets/icons/download_black.png')}></Image>
                </TouchableOpacity>
                <Image style={tailwind("w-6 h-6 ")} source={require('../../../assets/icons/edit_black.png')}></Image>
            </View>
        </View>
    )
}