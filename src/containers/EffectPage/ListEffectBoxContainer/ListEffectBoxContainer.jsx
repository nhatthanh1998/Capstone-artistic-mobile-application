import React from 'react'
import { ScrollView } from 'react-native'
import { EffectBox } from '../../../components/EffectPage/EffectBox'
import tailwind from 'tailwind-rn'
import { useSelector, useDispatch } from 'react-redux'
import { setSelectedStyleID, selectSelectedStyleID } from '../../../redux/slicers/style.slicer'
import { setGeneratedImage } from '../../../redux/slicers/generated-image.slicer'
import { selectOriginImage } from '../../../redux/slicers/origin-image.slicer'

export const ListEffectBoxContainer = ({ data, originImageAccessURL }) => {
    const dispatch = useDispatch()
    const selectedStyleID = useSelector(selectSelectedStyleID)
    
    
    const handlePress = styleID => {
        dispatch(setSelectedStyleID(styleID))
        if (selectedStyleID === 'ORIGIN') {
            const originImage = useSelector(selectOriginImage)
            dispatch(setGeneratedImage(originImage.accessURL))
        }
    }

    const renderOriginalEffectBox = () => {
        const isSelect = selectedStyleID === 'ORIGINAL' ? true : false
        return <EffectBox styleId={'ORIGINAL'} styleImageUrl={originImageAccessURL} styleName='ORIGINAL' handlePress={handlePress} key='ORIGINAL' isSelect={isSelect} />
    }


    const renderListEffectBox = data.map(item => {
        const { id, style_name, icon_url, artist_id, is_generic, createdAt, updatedAt } = item
        let isSelect = false;
        isSelect = selectedStyleID === id ? true : false
        return <EffectBox styleId={id} styleImageUrl={icon_url} styleName={style_name} handlePress={handlePress} key={style_name} isSelect={isSelect}
        />
    })

    return (
        <ScrollView contentContainerStyle={tailwind("bg-white pr-32 flex")}
            horizontal={true}
            showsHorizontalScrollInd
            icator={false}
        >
            {renderOriginalEffectBox()}
            {renderListEffectBox}
        </ScrollView>
    )
}