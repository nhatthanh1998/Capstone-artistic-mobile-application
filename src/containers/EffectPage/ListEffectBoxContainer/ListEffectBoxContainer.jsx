import React, { useEffect } from 'react'
import { ScrollView } from 'react-native'
import { EffectBox } from '../../../components/EffectPage/EffectBox'
import tailwind from 'tailwind-rn'
import { useSelector, useDispatch } from 'react-redux'
import { setSelectedStyleID, selectSelectedStyleID } from '../../../redux/slicers/style.slicer'
import { selectOriginImage } from '../../../redux/slicers/origin-image.slicer'
import { sendTransferImageRequest } from '../../../apis/upload_images'
import AsyncStorage from '@react-native-async-storage/async-storage'


export const ListEffectBoxContainer = ({ data, originImageAccessURL }) => {
    const dispatch = useDispatch()
    const selectedStyleID = useSelector(selectSelectedStyleID)
    const originImage = useSelector(selectOriginImage)

    useEffect(() => {
        console.log("nó đổi styleId")
        console.log(selectedStyleID)
        requestTransferImage()
    }, [selectedStyleID] )

    const requestTransferImage = async () => {
        if (selectedStyleID !== 'ORIGINAL') {
            console.log("chay trong nay ne:",selectedStyleID)
            const socketID = await AsyncStorage.getItem('socketID')
            const photoLocation = originImage.photoLocation
            const response = await sendTransferImageRequest({ socketID, photoLocation, styleID:selectedStyleID })
        } 
    }


    const handlePress = async styleID => {
        dispatch(setSelectedStyleID(styleID))
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
            showsHorizontalScrollIndicator={false}
        >
            {renderOriginalEffectBox()}
            {renderListEffectBox}
        </ScrollView>
    )
}