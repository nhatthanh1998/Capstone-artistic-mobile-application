import LottieView from 'lottie-react-native'
import tailwind from 'tailwind-rn'
import {View} from 'react-native'
import React from 'react'
import { styles } from '../../../styles'


export const Loading = ({isLoading}) => {
    if(isLoading == true) {
        return (
            <View style={{...tailwind("absolute w-full h-full z-50 flex flex-row items-center justify-center"), ...styles.darken_2}}>
                <LottieView source={require('../../lottie/loading.json')} autoPlay={true} loop={true} 
                    style={tailwind("w-48 h-48")}/> 
            </View>
        )
    } else {
        return null
    }
}