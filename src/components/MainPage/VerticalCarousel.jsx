import React, { useRef, useState, useEffect } from 'react';
import Carousel from 'react-native-snap-carousel';
import {
  View,
  Dimensions,
  Image,
} from 'react-native';
import tailwind from 'tailwind-rn';
import { styles } from '../styles'
import * as _ from 'lodash'


const { width: screenWidth } = Dimensions.get('window');

const itemHeight = screenWidth * 1/4 - 10
const itemWidth = screenWidth * 1/4

export const VerticalCarousel = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const carouselRef = useRef(null);

  const animatedStyle = (index, animatedValue, carouselProps) => {
    let animatedOpacity = {};
    if (carouselProps.inactiveSlideOpacity < 1) {
      animatedOpacity = {
        opacity: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0.5, 1]
        })
      };
    }
    return animatedOpacity
  }

  const renderItem = ({ item, index }) => {
    return (
      <View style={{ ...styles.shadow_4, ...tailwind("overflow-hidden") }}>
        <Image style={{...tailwind("rounded-xl"), height: itemHeight, marginEnd:5, marginStart:5}}
         source={{ uri: 'https://i.pinimg.com/564x/31/60/e1/3160e14682bd6e1640fd3897275cadbf.jpg' }} />
      </View>
    )
  };

  return (
      <Carousel
        onBeforeSnapToItem={(index) => {
          setActiveIndex(index)
        }}
        slideInterpolatedStyle={animatedStyle}
        enableMomentum
        loop={true}
        enableSnap={true}
        ref={carouselRef}
        sliderWidth={screenWidth}
        itemWidth={itemWidth}
        data={data}
        renderItem={renderItem}
      />
    );
};