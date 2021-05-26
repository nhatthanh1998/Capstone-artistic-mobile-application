import React, { useEffect, useState } from "react";
import { Dimensions } from 'react-native';
import styled from 'styled-components/native'
import { useHeaderHeight } from '@react-navigation/stack';
import { ListEffectBoxContainer } from '../../containers/EffectPage/ListEffectBoxContainer'
import { ImageBox } from '../../components/EffectPage/ImageBox'
import { useSelector, useDispatch } from 'react-redux'
import { fetchAllStyles } from "../../apis/styles"
import { setStyles, selectStyles, setSelectedStyleID } from '../../redux/slicers/style.slicer'
import { selectOriginImage } from '../../redux/slicers/origin-image.slicer'
import { selectGeneratedImageAccessURL, setGeneratedImageAccessURL } from '../../redux/slicers/generated-image.slicer'
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


    async function getStyles() {
        const response = await fetchAllStyles()
        dispatch(setStyles(response))
    }

    useEffect(() => {
        getStyles()
        return () => {
            // console.log("clean up")
        }
    }, [])


    useEffect(() => {
        dispatch(setGeneratedImageAccessURL({accessURL: originImage.accessURL, styleID: "ORIGINAL"}))
        dispatch(setSelectedStyleID('ORIGINAL'))
    }, [originImage])

    console.log("in here",generatedImage)
    return (
        <Container headerHeight={headerHeight}>
            <ImageBox imageURL={generatedImage[selectedStyleID]} />
            <ListEffectBoxContainer
                data={styles}
                originImageAccessURL={originImage.accessURL}
            />
        </Container >
    )
}



const Container = styled.View`
width: ${windowWidth}px;
height: ${windowHeight}px;
`