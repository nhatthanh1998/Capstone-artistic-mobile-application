import React from 'react'
import { ScrollView } from 'react-native'
import { EffectBox } from '../../../components/HomePage/EffectBox'
import { useState } from 'react'
import {Dimensions} from 'react-native'
import tailwind from 'tailwind-rn'


const windowWidth = Dimensions.get('window').width
export const ListEffectBoxContainer = ({ effectBoxDatas }) => {

    let [selectedStyleID, setSeletedStyleID] = useState(1)
    const handlePress = (styleId) => {
        setSeletedStyleID(styleId)
    }

    const renderListEffectBox = effectBoxDatas.map(item => {
        const { styleImageUrl, styleName, styleId } = item
        const isSelect = selectedStyleID === styleId ? true : false
        return <EffectBox styleId = {styleId} styleImageUrl={styleImageUrl} styleName={styleName} handlePress={handlePress} key={styleName} isSelect = {isSelect}
        />
    })

    return (

        <ScrollView contentContainerStyle = {tailwind("bg-white pr-20 flex")}
        horizontal = {true}
        showsHorizontalScrollIndicator = {false}
        >
            {renderListEffectBox}
        </ScrollView>
    )
}