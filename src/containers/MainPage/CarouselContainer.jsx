

export const CarouselContainer = ({styles}) => {
    return (
    <View>
            <MyCarousel data = {_.sampleSize(styles, 5)}/>
            <View style={tailwind("pt-5")}>
                <VerticalCarousel data={[{}, {}]}/>
            </View>
    </View>
    )
}