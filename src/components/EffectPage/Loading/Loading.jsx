import {View, Text} from 'react-native'
import LottieView from 'lottie-react-native'

export const Loading = ({isLoading, loadingText}) => {
    if (isLoading == false) {
        return
    } else {
        return (
          <View style={tailwind("flex-1 bg-white")}>
            <Text style={tailwind("w-full text-center text-xl pt-20 font-bold")}>{loadingText}</Text>
            <LottieView source={require("../../commons/lottie/loading2.json")} autoPlay={true} loop={true} />
          </View>
        )
      }
}