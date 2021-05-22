import React from 'react'
import { ScrollView } from 'react-native'
import { EffectBox } from '../../../components/EffectPage/EffectBox'
import tailwind from 'tailwind-rn'
import {useSelector, useDispatch} from 'react-redux'
import { setSelectedStyle, selectSelectedStyle } from '../../../redux/slicers/style.slicer'



export const ListEffectBoxContainer = ({ data }) => {
    const dispatch = useDispatch()
    const selectedStyle = useSelector(selectSelectedStyle)

    const handlePress = style => {
        dispatch(setSelectedStyle(style))
    }

    const renderListEffectBox = data.map(item => {
        const { id, style_name, icon_url, artist_id, is_generic, createdAt, updatedAt } = item
        let isSelect = false;
        if(selectedStyle) {
            isSelect = selectedStyle.id === id ? true : false
        }
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