import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import tailwind from 'tailwind-rn'
import { ScrollView } from 'react-native'
import { EffectBox } from '../../../components/EffectPage/EffectBox'
import { setSelectedStyle, selectSelectedStyle, DEFAULT_STYLE } from '../../../redux/slicers/style.slicer'
import {DEFAULT_STYLE_ID} from '../../../enums/default-style-id'



export const ListEffectBoxContainer = ({ styles, originImageAccessURL }) => {
    const dispatch = useDispatch()
    const selectedStyle = useSelector(selectSelectedStyle)
    const handlePress = async selectedStyle => {
        dispatch(setSelectedStyle(selectedStyle))
    }


    const renderOriginalEffectBox = () => {
        const isSelect = selectedStyle.id === DEFAULT_STYLE_ID ? true : false
        return <EffectBox style={DEFAULT_STYLE({originImageAccessURL})} handlePress={handlePress} key={DEFAULT_STYLE_ID} isSelect={isSelect} />
    }


    const renderListEffectBox = styles.map(style => {
        let isSelect = false;
        isSelect = selectedStyle.id === style.id ? true : false
        return <EffectBox style={style} handlePress={handlePress} key={style.id} isSelect={isSelect}
        />
    })


    return (
        <ScrollView contentContainerStyle={tailwind("bg-white pr-32 flex items-center")}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
        >
            {renderOriginalEffectBox()}
            {renderListEffectBox}
        </ScrollView>
    )
}