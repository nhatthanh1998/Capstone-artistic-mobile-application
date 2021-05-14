import React from "react";
import { Dimensions, View } from 'react-native';
import styled from 'styled-components/native'
import { useHeaderHeight } from '@react-navigation/stack';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { ListEffectBoxContainer } from '../../containers/EffectPage/ListEffectBoxContainer'
import { ImageBox } from '../../components/EffectPage/ImageBox'


export const EffectPage = ({ route, navigation }) => {
    const headerHeight = useHeaderHeight()
    const {pictureUri} = route.params


    const datas = [
        {
            styleId: 1,
            styleImageUrl: pictureUri,
            styleName: "ORIGINAL",
        },
        {
            styleId: 2,
            styleImageUrl: "https://doanhnhanplus.vn/wp-content/uploads/2019/05/dnp-danh-hoc-pablo-picasso-5.jpg",
            styleName: "PICASSO"
        },
        {
            styleId: 3,
            styleImageUrl: "https://icdn.dantri.com.vn/thumb_w/640/2019/05/05/da-vincidocx-1556990676453.jpeg",
            styleName: "DA VINCI"
        },
        {
            styleId: 4,
            styleImageUrl: "http://khoahuyhoang.net/images/starry_night_7.jpg",
            styleName: "VAN GOGH"
        }
    ]




    return (
        <Container headerHeight={headerHeight}>
            <ImageBox imageURL = {pictureUri}/>
            <ListEffectBoxContainer
                effectBoxDatas={datas}
            />
        </Container >
    )
}



const Container = styled.View`
width: ${windowWidth}px;
height: ${windowHeight}px;
`