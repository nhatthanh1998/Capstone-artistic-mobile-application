import React, {useRef, useState} from 'react'
import {View, Image, Text, TouchableOpacity, SafeAreaView, Animated, FlatList} from 'react-native'
import tailwind from 'tailwind-rn'
import { styles } from '../../styles'
import {PhotoDetail} from '../../components/AlbumPage/PhotoDetail'
import {AlbumHeader} from './AlbumHeader'

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad5abb28ba',
        title: 'First Item',
      },    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53ab28ba',
        title: 'First Item',
      },    {
        id: 'bd7acbea-c1b1-46c2-aed5-3a53abb28ba',
        title: 'First Item',
      },    {
        id: 'bd7acbea-c1b1-46c2-aed5-3d53abb28ba',
        title: 'First Item',
      },
      {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28a',
        title: 'First Item',
      },
      {
          id: 'bd7acbea-c1b146c2-aed5-3ad53abb28ba',
          title: 'First Item',
        },    {
          id: 'bd7acbea-c1b146c2aed5-3ad53abb28ba',
          title: 'First Item',
        },    {
          id: 'bd7acbea-c1b1-46c2-ad5-3ad53abb28ba',
          title: 'First Item',
        },    {
          id: 'bd7acbe-c1b1-46c2-ae5-3ad53abb28ba',
          title: 'First Item',
        },    {
            id: 'bd7acbea-1b1-46c2-aed5-3ad3abb28ba',
            title: 'First Item',
          },
          {
              id: 'bd7abea-c1b1-46c2-aed5-3ad53abb8ba',
              title: 'First Item',
            },    {
              id: 'bd7abea-c1b1-46c2-aed5-3ad53ab28ba',
              title: 'First Item',
            },    {
              id: 'bd7acbea-c1b1-46c2-aed5-3ad53bb28ba',
              title: 'First Item',
            },    {
              id: 'bd7acbea-c1b1-46c2-aed5-3d53abb28ba',
              title: 'First Item',
            },
            {
                id: 'bd7abea-c1b1-46c2-aed5-3ad53abb8ba',
                title: 'First Item',
              },    {
                id: 'bd7abea-c1b1-46c2-aed5-3ad53ab28ba',
                title: 'First Item',
              },    {
                id: 'bd7acbea-c1b1-46c2-aed5-3ad53bb28ba',
                title: 'First Item',
              },    {
                id: 'bd7acbea-c1b1-46c2-aed5-3d53abb28ba',
                title: 'First Item',
              },
              {
                id: 'bd7abea-c1b1-46c2-aed5-3ad53abb8ba',
                title: 'First Item',
              },    {
                id: 'bd7abea-c1b1-46c2-aed5-3ad53ab28ba',
                title: 'First Item',
              },    {
                id: 'bd7acbea-c1b1-46c2-aed5-3ad53bb28ba',
                title: 'First Item',
              },    {
                id: 'bd7acbea-c1b1-46c2-aed5-3d53abb28ba',
                title: 'First Item',
              }
  ];

const PhotoItem = () => (
    <View style={tailwind("w-1/3 mb-5 flex-row justify-center")}>
        <View style={tailwind("relative")}>
            <TouchableOpacity style={{...tailwind("overflow-hidden relative z-10 rounded-3xl w-24 h-24"), ...styles.shadow_2}}>
                <Image source={{uri: "https://i.pinimg.com/564x/87/4c/56/874c565040aa10c0611a9d6f0ec690ed.jpg"}} style={tailwind("w-full h-full bg-red-100")}/>
            </TouchableOpacity>

            <TouchableOpacity style={{...tailwind("bg-gray-50 mt-3 py-2 rounded-full")}}>
                <Text style={tailwind("font-thin text-xs text-center")}>momo 001</Text>
            </TouchableOpacity>
        </View>
    </View>
)

const getCloser = (value, checkOne, checkTwo) => Math.abs(value - checkOne) < Math.abs(value - checkTwo) ? checkOne : checkTwo;

export const PhotoList = () => {
    const [headerHeight, setHeaderHeight] = useState(0)

    const ref = useRef()

    const scrollY = useRef(new Animated.Value(0)).current

    const handleScroll = Animated.event(
        [
          {
            nativeEvent: {
              contentOffset: {y: scrollY},
            },
          },
        ],
        {
          useNativeDriver: true,
        },
    );

    const handleSnap = ({nativeEvent}) => {
        const offsetY = nativeEvent.contentOffset.y;
        if (
          !(
            scrollY === 0 ||
            scrollY === -headerHeight
          )
        ) {
          if (ref.current) {
            ref.current.scrollToOffset({
              offset:
                getCloser(scrollY, -headerHeight, 0) ===
                -headerHeight
                  ? offsetY + headerHeight
                  : offsetY - headerHeight,
            });
          }
        }
      };

    const scrollYClamped = Animated.diffClamp(scrollY, 0, headerHeight);

    const translateY = scrollYClamped.interpolate({
        inputRange: [0, headerHeight],
        outputRange: [0, -(headerHeight)],
    });

    

    return (
        <SafeAreaView style={tailwind("h-full relative bg-white")} >
            <Animated.View
             style={{
                 ...tailwind("absolute w-full z-20"),
                 transform: [{translateY}]
            }}>
                <AlbumHeader setHeaderHeight={setHeaderHeight}/>
            </Animated.View>
            <AnimatedFlatList
                ref={ref}
                // onMomentumScrollEnd={handleSnap}
                onScroll={handleScroll}
                style={{...tailwind("overflow-hidden rounded-b-none px-5 h-full z-10"), paddingTop: headerHeight}}
                numColumns={3}
                showsVerticalScrollIndicator={false}
                data={DATA}
                renderItem={PhotoItem}
                keyExtractor={item => item.id}
            />
          <PhotoDetail visible={false} imageUrl="https://i.pinimg.com/564x/1a/3f/76/1a3f7634e5a3b52d38a36173ffb05e9f.jpg"/>
        </SafeAreaView>
    )
}
