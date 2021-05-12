import React from 'react'
import { ScrollView } from 'react-native'
import { EffectBox } from '../../../components/HomePage/EffectBox'
import { useState } from 'react'
import tailwind from 'tailwind-rn'

export const ListEffectBoxContainer = ({ effectBoxDatas }) => {

    let [selectedStyleID, setSeletedStyleID] = useState(0)
    const handlePress = (styleId) => {
        setSeletedStyleID(styleId)
    }

    const renderListEffectBox = effectBoxDatas.map(item => {
        const { styleImageUrl, styleName, styleId } = item
        const isSelect = selectedStyleID === styleId ? true : false
        return <EffectBox styleId = {styleId} styleImageUrl={styleImageUrl} styleName={styleName} handlePress={handlePress} key={styleName} isSelect = {isSelect}/>
    })

    return (

        <ScrollView style={tailwind("flex bg-white absolute bottom-0 w-full flex-row py-5 flex-col")}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
        >
            {renderListEffectBox}
        </ScrollView>
    )
}