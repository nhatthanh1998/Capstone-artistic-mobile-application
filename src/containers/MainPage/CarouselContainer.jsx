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
    const [styles, setStyles] = useState([])
    const [showCases, setShowCases] = useState({})
    const [selectedStyle, setSelectedStyle] = useState({})

    useEffect(() => {
        handleGetAvailableStyles({setAvailableStyles})
        return () => {}
    }, [])

    useEffect(() => {
        const sample = _.sampleSize(availableStyles, 5)
        setStyles(sample)
        setSelectedStyle(sample[0])
        return () => {}
    }, [availableStyles])

    useEffect(() => {
        Promise.all([...styles.map(style => getShowCaseByStyleId({styleId: style.id}))]).then(rs => {
            const showCases = {}
            for(let i = 0; i < styles.length; i++) {
                showCases[styles[i].id] = rs[i]
            }
            setShowCases(showCases)
        }).catch(error => {
            console.log(error)
            Toast.show({
                text1: "Error",
                text2: error,
                type: 'error',
                position: 'top'
            })
        })


        return () => {}
    }, [styles])

    return (
    <View>
        {selectedStyle && <MyCarousel data = {_.sampleSize(showCases[selectedStyle.id], 6)}/>}    
        <View style={tailwind("pt-5")}>
            <VerticalCarousel data={styles} setSelectedStyle={setSelectedStyle} sliderWidth={windowWidth}/>
        </View>
    </View>
    )
}