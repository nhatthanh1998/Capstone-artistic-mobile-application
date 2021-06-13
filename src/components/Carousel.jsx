import React, {useRef, useState, useEffect} from 'react';
import Carousel, {ParallaxImage} from 'react-native-snap-carousel';
import {
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import tailwind from 'tailwind-rn';
import { styles } from '../styles';

const ENTRIES1 = [
  {imgUrl: "https://i.pinimg.com/564x/ac/1c/c0/ac1cc079aae5b2ef34bab68f9cd2e001.jpg"},
  {imgUrl: "https://i.pinimg.com/564x/fd/58/25/fd58257bfb9c26c879ea86de8951a83c.jpg"},
  {imgUrl: "https://data.whicdn.com/images/342985833/original.jpg"}
];
const {width: screenWidth} = Dimensions.get('window');

const animatedStyle = (index, animatedValue, carouselProps) => {
  let animatedOpacity = {};
  let animatedScale = {};

  if (carouselProps.inactiveSlideOpacity < 1) {
      animatedOpacity = {
          opacity: animatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: [carouselProps.inactiveSlideOpacity, 1]
          })
      };
  }
  if (carouselProps.inactiveSlideScale < 1) {
      animatedScale = {
          transform: [{
              scaleY: animatedValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [carouselProps.inactiveSlideScale, 1]
              })
          }]
      };
  }
  return {
    ...animatedOpacity,
    ...animatedScale
  }
}

const activeStyle = tailwind("w-7 h-1.5 mr-1.5 bg-black rounded-full")
const inactiveStyle = tailwind("w-1.5 h-1.5 mr-1.5 bg-gray-300 rounded-full")

export const MyCarousel = props => {
  const [entries, setEntries] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0)
  const carouselRef = useRef(null);

  const goForward = () => {
    carouselRef.current.snapToNext();
  };

  useEffect(() => {
    setEntries(ENTRIES1);
  }, []);

  const renderItem = ({item, index}) => {
    return (
        <View style={{...styles.shadow_4}}>
            <Image style={tailwind("h-64 rounded-xl mx-2")} source={{uri: item.imgUrl}}/>
        </View>
    )
  };

  return (
    <View style={tailwind("pt-5")}>
      <View style={tailwind("absolute flex flex-row items-center top-0 right-0 mr-5")}>
        <View style={activeIndex == 0 ? activeStyle : inactiveStyle}></View>
        <View style={activeIndex == 1 ? activeStyle : inactiveStyle}></View>
        <View style={activeIndex == 2 ? activeStyle : inactiveStyle}></View>

      </View>
      <Carousel
        onSnapToItem={(index) => {
          setActiveIndex(index)
        }}
        loop
        enableSnap
        slideInterpolatedStyle={animatedStyle}
        ref={carouselRef}
        sliderWidth={screenWidth}
        itemWidth={screenWidth * 1/2}
        data={entries}
        renderItem={renderItem}
        hasParallaxImages={false}
      />
    </View>
  );
};