import React, {useState, useEffect} from 'react'
import {View} from 'react-native'
import { getShowCaseByStyleId } from '../../apis/showcases'
import * as _ from 'lodash'
import {MyCarousel} from '../../components/MainPage/Carousel' 
import { VerticalCarousel } from '../../components/MainPage/VerticalCarousel'
import tailwind from 'tailwind-rn'
import { useSelector } from 'react-redux'
import { selectStyles } from '../../redux/slicers/style.slicer'

export const CarouselContainer = () => {
    const allStyles = useSelector(selectStyles)
    const [styles, setStyles] = useState([])
    const [showCases, setShowCases] = useState({})
    const [selectedStyle, setSelectedStyle] = useState(null)

    useEffect(() => {
        const sample = _.sampleSize(allStyles, 5)
        setStyles(sample)
        setSelectedStyle(sample[0])
        return () => {}
    }, [allStyles])

    useEffect(() => {
        Promise.all([...styles.map(style => getShowCaseByStyleId({styleId: style.id}))]).then(rs => {
            const showCases = {}
            for(let i = 0; i < styles.length; i++) {
                showCases[styles[i].id] = rs[i]
            }
            setShowCases(showCases)
        })


        return () => {}
    }, [styles])

    return (
    <View>
            <MyCarousel data = {showCases[selectedStyle.id]}/>
            <View style={tailwind("pt-5")}>
                <VerticalCarousel data={styles} setSelectedStyle={setSelectedStyle}/>
            </View>
    </View>
    )
}