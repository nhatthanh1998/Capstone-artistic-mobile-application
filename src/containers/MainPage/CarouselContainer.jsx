import React, {useState, useEffect} from 'react'
import {View} from 'react-native'
import { getShowCaseByStyleId } from '../../apis/showcases'
import * as _ from 'lodash'
import {MyCarousel} from '../../components/MainPage/Carousel' 
import { VerticalCarousel } from '../../components/MainPage/VerticalCarousel'
import { handleGetAvailableStyles } from './handler'
import tailwind from 'tailwind-rn'
import { Dimensions } from 'react-native';
import Toast from 'react-native-toast-message';

const windowWidth = Dimensions.get('window').width;

export const CarouselContainer = () => {
    const [availableStyles, setAvailableStyles] = useState([])
    const [showCases, setShowCases] = useState({})
    const [selectedStyle, setSelectedStyle] = useState(null)

    const getShowcaseData = () => {
        if(selectedStyle)
            return _.sampleSize(showCases[selectedStyle.id], 6)
        return []
    }

    useEffect(() => {
        handleGetAvailableStyles({setAvailableStyles})
        return () => {}
    }, [])

    useEffect(() => {
        if(availableStyles.length > 0){
            setSelectedStyle(availableStyles[0])
        }
        return () => {}
    }, [availableStyles])

    useEffect(() => {
        if(selectedStyle) {
            const styleId = selectedStyle.id
            if(!showCases[styleId]) {
                getShowCaseByStyleId({styleId}).then(rs => {
                    const {data, statusCode, message} = rs
                    if(statusCode && message) {
                        Toast.show({
                            text1: "Error",
                            text2: message,
                            type: 'error',
                            position: 'top'
                        })           
                    }
                    else {
                        setShowCases({
                            ...showCases,
                            [styleId]: data
                        })
                    }
                })
            }
        }
        return () => {}
    }, [selectedStyle])

    return (
    <>
        <MyCarousel data={getShowcaseData()}/>  
        <View style={tailwind("mt-4")}>
            <VerticalCarousel data={availableStyles} setSelectedStyle={setSelectedStyle} sliderWidth={windowWidth}/>
        </View>
    </>
    )
}