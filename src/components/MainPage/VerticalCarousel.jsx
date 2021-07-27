import React, { useRef, useState, useEffect } from 'react';
import Carousel from 'react-native-snap-carousel';
import {
  View,
  Dimensions,
  Image,
} from 'react-native';
import tailwind from 'tailwind-rn';
import { styles } from '../../styles'
import * as _ from 'lodash'

export const VerticalCarousel = ({ data, setSelectedStyle, sliderWidth }) => {
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
        <Image style={{...tailwind("rounded-xl"), height: sliderWidth * 1/4, marginEnd:5, marginStart:5}}
         source={{ uri: item.iconURL }} />
      </View>
    )
  };

  return (
      <Carousel
        onSnapToItem={(index) => {
          const style = data[index]
          setSelectedStyle(style)
          setActiveIndex(index)
        }}
        loop
        slideInterpolatedStyle={animatedStyle}
        enableSnap={true}
        ref={carouselRef}
        sliderWidth={sliderWidth}
        itemWidth={sliderWidth * 1/4}
        data={data}
        renderItem={renderItem}
      />
    );
};