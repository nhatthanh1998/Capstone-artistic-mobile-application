import React, { useRef, useState, useEffect } from 'react';
import Carousel from 'react-native-snap-carousel';
import {
  View,
  Dimensions,
  ImageBackground,
} from 'react-native';
import tailwind from 'tailwind-rn';
import { styles } from '../../styles'
import * as _ from 'lodash'

const { width: screenWidth } = Dimensions.get('window');
const activeStyle = tailwind("w-7 h-1.5 mr-1.5 bg-black rounded-full")
const inactiveStyle = tailwind("w-1.5 h-1.5 mr-1.5 bg-gray-300 rounded-full")

export const MyCarousel = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const carouselRef = useRef(null);

  const renderItem = ({ item, index }) => {
    return (
      <ImageBackground style={{ ...styles.shadow_1, ...tailwind("rounded-xl overflow-hidden bg-gray-300 h-80") }} source={{ uri: item.accessURL }} />
    )
  };

  const renderStatusBar = () => {
    const indexs = _.range(data.length)
    return indexs.map(index => {
     return (<View style={activeIndex == index ? activeStyle : inactiveStyle} key={index}></View>)
    })
  }

  return (
    <View style={tailwind("pt-5")}>
      <View style={tailwind("absolute flex flex-row items-center top-0 right-0 mr-5")}>
        {renderStatusBar()}
      </View>
      <View style={tailwind("h-80")}>
        <Carousel
          onSnapToItem={(index) => {
            setActiveIndex(index)
          }}
          enableMomentum
          enableSnap={true}
          ref={carouselRef}
          sliderWidth={screenWidth}
          itemWidth={screenWidth * 4 / 5}
          data={data}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
}
