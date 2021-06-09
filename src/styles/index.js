import {StyleSheet} from 'react-native'

export const styles = StyleSheet.create({
    darken: {
        backgroundColor: 'rgba(0,0,0,0.4)'
    },
    lighten: {
        backgroundColor: 'rgba(253, 253, 253, 0.85)'
    },
    bodyRadius: {
        paddingTop: 50,
        borderTopEndRadius: 50,
        borderTopStartRadius: 50,
        transform: [{translateY: -50}]
    },
    shadow_1: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,

        elevation: 1,
    },
    shadow_2: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
    },
    shadow_4: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.48,
        shadowRadius: 11.95,
        elevation: 18,
    }
})