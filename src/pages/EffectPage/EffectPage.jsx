import React, { useEffect, useState } from "react";
import { useHeaderHeight } from '@react-navigation/stack';
import { useSelector, useDispatch } from 'react-redux'
import { Dimensions } from 'react-native';
import styled from 'styled-components/native'

import { ListEffectBoxContainer } from '../../containers/EffectPage/ListEffectBoxContainer'

import { ImageBox } from '../../components/EffectPage/ImageBox'
import { selectStyles, setSelectedStyle } from '../../redux/slicers/style.slicer'
import { selectOriginImage } from '../../redux/slicers/origin-image.slicer'
import { selectGeneratedImageAccessURL, setGeneratedImageAccessURL } from '../../redux/slicers/generated-image.slicer'
import { selectSelectedStyleID } from '../../redux/slicers/style.slicer'
import { getStyles } from './handler'
import { DEFAULT_EFFECT_ID } from "../../enums/default-effect-id"


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const EffectPage = ({ navigation }) => {
    const dispatch = useDispatch()
    const headerHeight = useHeaderHeight()

    const styles = useSelector(selectStyles)
    const originImage = useSelector(selectOriginImage)
    const selectedStyleID = useSelector(selectSelectedStyleID)
    const generatedImage = useSelector(selectGeneratedImageAccessURL)

    useEffect(() => {
        getStyles({dispatch})
        return () => { }
    }, [])


    useEffect(() => {
        dispatch(setGeneratedImageAccessURL({ accessURL: originImage.accessURL, styleId: DEFAULT_EFFECT_ID }))
        dispatch(setSelectedStyle({id: DEFAULT_EFFECT_ID}))
    }, [originImage])

    return (
        <Container headerHeight={headerHeight}>
            <ImageBox imageURL={generatedImage[selectedStyleID]} />
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