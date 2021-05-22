import React, { useEffect } from "react";
import { Dimensions } from 'react-native';
import styled from 'styled-components/native'
import { useHeaderHeight } from '@react-navigation/stack';
import { ListEffectBoxContainer } from '../../containers/EffectPage/ListEffectBoxContainer'
import { ImageBox } from '../../components/EffectPage/ImageBox'
import { useSelector, useDispatch } from 'react-redux'
import { fetchAllStyles } from "../../apis/styles"
import {setStyles, selectStyles} from '../../redux/slicers/style.slicer'
import { selectSelectedImage } from '../../redux/slicers/image.slicer'



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;



export const EffectPage = ({ route, navigation }) => {
    const dispatch = useDispatch()
    const headerHeight = useHeaderHeight()
    const styles = useSelector(selectStyles)


    async function getStyles() {
        const response = await fetchAllStyles()
        dispatch(setStyles(response))
    }

    useEffect(() => {
        getStyles()
    }, [])

    const selectedImage = useSelector(selectSelectedImage)
    return (
        <Container headerHeight={headerHeight}>
            <ImageBox imageURL={selectedImage.accessURL} />
            <ListEffectBoxContainer
                data={styles}
            />
        </Container >
    )
}



const Container = styled.View`
width: ${windowWidth}px;
height: ${windowHeight}px;
`