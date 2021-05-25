import React, { useEffect, useState } from "react";
import { Dimensions } from 'react-native';
import styled from 'styled-components/native'
import { useHeaderHeight } from '@react-navigation/stack';
import { ListEffectBoxContainer } from '../../containers/EffectPage/ListEffectBoxContainer'
import { ImageBox } from '../../components/EffectPage/ImageBox'
import { useSelector, useDispatch } from 'react-redux'
import { fetchAllStyles } from "../../apis/styles"
import {setStyles, selectStyles} from '../../redux/slicers/style.slicer'
import {selectOriginImage} from '../../redux/slicers/origin-image.slicer'
import {selectGeneratedImageAccessURL, setGeneratedImageAccessURL} from '../../redux/slicers/generated-image.slicer'
import { selectSelectedStyleID } from '../../redux/slicers/style.slicer'


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export const EffectPage = ({ route, navigation }) => {
    const dispatch = useDispatch()
    const headerHeight = useHeaderHeight()

    const styles = useSelector(selectStyles)
    const originImage = useSelector(selectOriginImage)
    const selectedStyleID = useSelector(selectSelectedStyleID)
    const generatedImage = useSelector(selectGeneratedImageAccessURL)
    const [loading, setLoading] = useState(false)
    

    console.log("in page:",generatedImage)
    async function getStyles() {
        const response = await fetchAllStyles()
        dispatch(setStyles(response))
    }

    useEffect(() => {
        dispatch(setGeneratedImageAccessURL({accessURL: originImage.accessURL, styleID: 'ORIGINAL'}))
        getStyles()
    }, [])


    return (
        <Container headerHeight={headerHeight}>
            <ImageBox imageURL={generatedImage[selectedStyleID]} />
            <ListEffectBoxContainer
                data={styles}
                originImageAccessURL = {originImage.accessURL}
            />
        </Container >
    )
}



const Container = styled.View`
width: ${windowWidth}px;
height: ${windowHeight}px;
`