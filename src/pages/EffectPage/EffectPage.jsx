import React, { useEffect } from "react";
import { useHeaderHeight } from '@react-navigation/stack';
import { useSelector, useDispatch } from 'react-redux'
import { Dimensions } from 'react-native';
import styled from 'styled-components/native'

import { ListEffectBoxContainer } from '../../containers/EffectPage/ListEffectBoxContainer'

import { ImageBox } from '../../components/EffectPage/ImageBox'
import { selectStyles, setSelectedStyle, selectSelectedStyle } from '../../redux/slicers/style.slicer'
import { selectOriginImage } from '../../redux/slicers/origin-image.slicer'
import { selectGeneratedImageAccessURL, setGeneratedImageAccessURL } from '../../redux/slicers/generated-image.slicer'

import { getStyles, requestTransferImage } from './handler'
import { DEFAULT_STYLE_ID } from "../../enums/default-style-id"


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


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
        <Container headerHeight={headerHeight}>
            <ImageBox imageURL={generatedImage[selectedStyle.id]} />
            <ListEffectBoxContainer
                styles={styles}
                originImageAccessURL={originImage.accessURL}
            />
        </Container >
    )
}



const Container = styled.View`
width: ${windowWidth}px;
height: ${windowHeight}px;
`