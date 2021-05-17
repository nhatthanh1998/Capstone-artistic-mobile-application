import React, { useEffect, useState } from "react";
import { Dimensions, View } from 'react-native';
import styled from 'styled-components/native'
import { useHeaderHeight } from '@react-navigation/stack';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { ListEffectBoxContainer } from '../../containers/EffectPage/ListEffectBoxContainer'
import { ImageBox } from '../../components/EffectPage/ImageBox'
import { fetchAllStyles } from "../../apis/styles"

export const EffectPage = ({ route, navigation }) => {
    const headerHeight = useHeaderHeight()
    const { pictureUri } = route.params

    const [styles, setStyles] = useState([])

    async function getStyles() {
        const response = await fetchAllStyles()
        setStyles(response)
    }

    useEffect(() => {
        getStyles()
    }, [])


    return (
        <Container headerHeight={headerHeight}>
            <ImageBox imageURL={pictureUri} />
            <ListEffectBoxContainer
                effectBoxDatas={styles}
            />
        </Container >
    )
}



const Container = styled.View`
width: ${windowWidth}px;
height: ${windowHeight}px;
`