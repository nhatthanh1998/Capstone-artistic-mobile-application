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
const activeStyle = tailwind("w-7 h-1.5 mr-1.5 bg-black rounded-full")
const inactiveStyle = tailwind("w-1.5 h-1.5 mr-1.5 bg-gray-300 rounded-full")

export const MyCarousel = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const carouselRef = useRef(null);

  const renderItem = ({ item, index }) => {
    return (
      <View style={{ ...styles.shadow_4 }}>
        <Image style={tailwind("h-72 rounded-xl mx-2")} source={{ uri: item.iconURL }} />
      </View>
    )
  };

  const renderStatusBar = () => {
    const indexs = _.range(data.length)
    return indexs.map(index => {
     return (<View style={activeIndex == index ? activeStyle : inactiveStyle} key = {index}></View>)
    })
  }


  return (
    <View style={tailwind("pt-5")}>
      <View style={tailwind("absolute flex flex-row items-center top-0 right-0 mr-5")}>
        {renderStatusBar()}
      </View>
      <Carousel
        onBeforeSnapToItem={(index) => {
          setActiveIndex(index)
        }}
        enableMomentum
        loop={true}
        enableSnap={true}
        ref={carouselRef}
        sliderWidth={screenWidth}
        itemWidth={screenWidth * 3 / 5}
        data={data}
        renderItem={renderItem}
      />
    </View>
  );
};