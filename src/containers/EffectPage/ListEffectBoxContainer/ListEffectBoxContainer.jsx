import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import tailwind from 'tailwind-rn'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { ScrollView } from 'react-native'
import { EffectBox } from '../../../components/EffectPage/EffectBox'

import { setSelectedStyleID, selectSelectedStyleID } from '../../../redux/slicers/style.slicer'
import { selectOriginImage } from '../../../redux/slicers/origin-image.slicer'
import { sendTransferImageRequest } from '../../../apis/upload_images'

import {DEFAULT_EFFECT_ID} from '../../../enums/default-effect-id'

export const ListEffectBoxContainer = ({ data, originImageAccessURL }) => {
    const dispatch = useDispatch()
    const selectedStyleID = useSelector(selectSelectedStyleID)
    const originImage = useSelector(selectOriginImage)

    useEffect(() => {
        requestTransferImage()
    }, [selectedStyleID] )

    const requestTransferImage = async () => {
        if (selectedStyleID !== DEFAULT_EFFECT_ID) {
            const socketID = await AsyncStorage.getItem('socketID')
            const photoLocation = originImage.photoLocation
            await sendTransferImageRequest({ socketID, photoLocation, styleID:selectedStyleID })
        } 
    }


    const handlePress = async styleID => {
        dispatch(setSelectedStyleID(styleID))
    }


    const renderOriginalEffectBox = () => {
        const isSelect = selectedStyleID === DEFAULT_EFFECT_ID ? true : false
        return <EffectBox styleId={DEFAULT_EFFECT_ID} styleImageUrl={originImageAccessURL} styleName={DEFAULT_EFFECT_ID} handlePress={handlePress} key={DEFAULT_EFFECT_ID} isSelect={isSelect} />
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
            showsHorizontalScrollIndicator={false}
        >
            {renderOriginalEffectBox()}
            {renderListEffectBox}
        </ScrollView>
    )
}