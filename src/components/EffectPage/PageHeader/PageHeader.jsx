import React from 'react'
import {View, Image, TouchableOpacity} from 'react-native'
import tailwind from 'tailwind-rn'

export const PageHeader = ({handleSave, handleBack, isDisable}) => {

    return ( 
        <View style={tailwind("flex flex-row bg-white px-5 py-4")}>
            <View style={tailwind("w-1/3")}>
                <TouchableOpacity onPress={() => {handleBack()}}>
                    <Image style={tailwind("w-7 h-7")} source={{uri: "https://image.flaticon.com/icons/png/512/2223/2223615.png"}}></Image>
                </TouchableOpacity>
            </View>
            <View style={tailwind("flex flex-row w-2/3 justify-end")}>
                <TouchableOpacity onPress={() => {}}>
                    <Image style={tailwind("w-6 h-6 mr-6")} source={{uri: "https://image.flaticon.com/icons/png/512/1214/1214428.png"}}></Image>
                </TouchableOpacity>
                <TouchableOpacity disabled = {isDisable} onPress={() => {handleSave()}}>
                    <Image style={tailwind("w-6 h-6 mr-6")} source={{uri: "https://image.flaticon.com/icons/png/512/1828/1828784.png"}}></Image>
                </TouchableOpacity>
                <Image style={tailwind("w-6 h-6 ")} source={{uri: "https://image.flaticon.com/icons/png/512/1159/1159633.png"}}></Image>
            </View>
        </View>
    )
}