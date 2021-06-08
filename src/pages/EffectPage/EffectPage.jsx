import React, { useEffect } from "react";
import { useHeaderHeight } from '@react-navigation/stack';
import { useSelector, useDispatch } from 'react-redux'
import { ListEffectBoxContainer } from '../../containers/EffectPage/ListEffectBoxContainer'
import { ImageBox } from '../../components/EffectPage/ImageBox'
import { selectStyles, setSelectedStyle, selectSelectedStyle } from '../../redux/slicers/style.slicer'
import { selectOriginImage } from '../../redux/slicers/origin-image.slicer'
import { selectGeneratedImageAccessURL, setGeneratedImageAccessURL } from '../../redux/slicers/generated-image.slicer'
import { getStyles, handleBack, requestTransferImage } from './handler'
import { DEFAULT_STYLE_ID } from "../../enums/default-style-id"
import tailwind from "tailwind-rn";
import { PageHeader } from '../../components/EffectPage/PageHeader'
import { View } from 'react-native'

export const EffectPage = ({ navigation }) => {
    const dispatch = useDispatch()
    const headerHeight = useHeaderHeight()
    
    const styles = useSelector(selectStyles)
    const selectedStyle = useSelector(selectSelectedStyle)
    const originImage = useSelector(selectOriginImage)
    const generatedImage = useSelector(selectGeneratedImageAccessURL)

    useEffect(() => {
        getStyles({dispatch})
        return () => { }
    }, [])


    useEffect(() => {
        dispatch(setGeneratedImageAccessURL({ accessURL: originImage.accessURL, styleId: DEFAULT_STYLE_ID }))
        dispatch(setSelectedStyle({id: DEFAULT_STYLE_ID}))
    }, [originImage])


    useEffect(() => {
        requestTransferImage({generatedImage,
             photoLocation:originImage.accessURL,
             selectedStyle
        })
        
    }, [selectedStyle])

    return (
        <View style={tailwind("flex-1")}>
            <PageHeader
            handleBack={()=> handleBack({navigation})}
            />
            <ImageBox photoURL={generatedImage[selectedStyle.id]} />
            <ListEffectBoxContainer
                styles={styles}
                originImageAccessURL={originImage.accessURL}
            />
        </View >
    )
}

