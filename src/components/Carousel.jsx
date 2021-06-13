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
            <Image style={tailwind("h-72 rounded-xl mx-1")} source={{uri: item.imgUrl}}/>
        </View>
    )
  };

  return (
    <View>
      <TouchableOpacity onPress={goForward}>
        <Text>go to next slide</Text>
      </TouchableOpacity>
      <Carousel
        ref={carouselRef}
        enableSnap
        sliderWidth={screenWidth}
        sliderHeight={screenWidth}
        itemWidth={screenWidth * 1/2}
        data={entries}
        renderItem={renderItem}
        hasParallaxImages={false}
      />
    </View>
  );
};