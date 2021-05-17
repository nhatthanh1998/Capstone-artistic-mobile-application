import React from 'react'
import { ScrollView, View } from 'react-native'
import { EffectBox } from '../../../components/EffectPage/EffectBox'
import { useState } from 'react'
import tailwind from 'tailwind-rn'


export const ListEffectBoxContainer = ({ effectBoxDatas }) => {

    let [selectedStyleID, setSeletedStyleID] = useState('')
    const handlePress = (styleId) => {
        setSeletedStyleID(styleId)
    }

    const renderListEffectBox = effectBoxDatas.map(item => {
        const { id, style_name, icon_url } = item
        const isSelect = selectedStyleID === id ? true : false
        return <EffectBox styleId={id} styleImageUrl={icon_url} styleName={style_name} handlePress={handlePress} key={style_name} isSelect={isSelect}
        />
    })

    return (
            <ScrollView contentContainerStyle={tailwind("bg-white pr-32 flex")}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            >
                {renderListEffectBox}
            </ScrollView>
    )
}