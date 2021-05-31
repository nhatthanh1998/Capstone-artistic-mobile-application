import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import tailwind from 'tailwind-rn'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { ScrollView } from 'react-native'
import { EffectBox } from '../../../components/EffectPage/EffectBox'

import { setSelectedStyle, selectSelectedStyleID, selectSelectedStyle } from '../../../redux/slicers/style.slicer'
import { selectOriginImage } from '../../../redux/slicers/origin-image.slicer'
import { sendTransferPhotoRequest } from '../../../apis/photos'

import {DEFAULT_EFFECT_ID} from '../../../enums/default-effect-id'

export const ListEffectBoxContainer = ({ styles, originImageAccessURL }) => {
    const dispatch = useDispatch()
    const selectedStyleID = useSelector(selectSelectedStyleID)
    const selectedStyle = useSelector(selectSelectedStyle)
    const originImage = useSelector(selectOriginImage)

    useEffect(() => {
        requestTransferImage({routingKey: selectedStyle.routingKey})
    }, [selectedStyleID] )

    const requestTransferImage = async () => {
        if (selectedStyleID !== DEFAULT_EFFECT_ID) {
            const socketId = await AsyncStorage.getItem('socketId')
            const photoLocation = originImage.photoLocation
            await sendTransferPhotoRequest({ socketId, photoLocation, style: selectedStyle })
        } 
    }


    const handlePress = async selectedStyle => {
        dispatch(setSelectedStyle(selectedStyle))
    }


    const renderOriginalEffectBox = () => {
        const isSelect = selectedStyleID === DEFAULT_EFFECT_ID ? true : false
        const defaultStyle = {
            id: DEFAULT_EFFECT_ID,
            styleName: "ORIGINAL",
            routingKey: "",
            iconURL: originImageAccessURL

        }
        return <EffectBox style={defaultStyle} handlePress={handlePress} key={DEFAULT_EFFECT_ID} isSelect={isSelect} />
    }


    const renderListEffectBox = styles.map(style => {
        let isSelect = false;
        isSelect = selectedStyleID === style.id ? true : false
        return <EffectBox style={style} handlePress={handlePress} key={style.id} isSelect={isSelect}
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