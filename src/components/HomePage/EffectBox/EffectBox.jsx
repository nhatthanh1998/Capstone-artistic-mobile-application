import React from 'react'
import { TouchableOpacity, Image, View, Text } from 'react-native'
import tailwind from 'tailwind-rn'
import { CheckIcon } from '../../../commons/components/CheckIcon'
import styled from 'styled-components/native'

export const EffectBox = ({ styleId, styleName, styleImageUrl, handlePress, isSelect }) => {
    if (isSelect == false) {
        return (
            <View style={tailwind("w-1/4 mx-2 justify-center flex flex-row")}>
                <TouchableOpacity
                    onPress={() => { handlePress(styleId) }}
                >
                    <View style={tailwind("text-center")}>
                        <View style={tailwind("w-20 h-20 rounded-lg overflow-hidden")}>
                            <Image source={styleImageUrl}
                                style={tailwind("w-full h-full")} />
                        </View>
                        <Text style={tailwind("text-sm pt-2")}>{styleName}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    } else {
        return (
            <View style={tailwind("w-1/4 mx-2 justify-center flex flex-row")}>
                <TouchableOpacity
                    onPress={() => { handlePress() }}
                >
                    <View style={tailwind("text-center")}>
                        <View style={tailwind("w-20 h-20 rounded-lg overflow-hidden relative border-4 border-yellow-300")}>
                            <FillImage source={styleImageUrl} 
                                style={tailwind("w-full h-full flex justify-center items-center")}>
                                <CheckIcon/>
                                </FillImage>
                        </View>
                        <Text style={tailwind("text-sm pt-2")}>{styleName}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}




const FillImage = styled.ImageBackground `
filter: brightness(0.75);
`