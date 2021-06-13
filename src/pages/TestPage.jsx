import React from 'react'
import { View, Text } from 'react-native'
import {MyCarousel} from '../components/Carousel'
import tailwind from 'tailwind-rn'

export const TestPage = () => {
    return (
        <View style={tailwind("h-full w-full mt-20")}>
            <Text>My carousel</Text>
            <MyCarousel/>
        </View>
    )
}