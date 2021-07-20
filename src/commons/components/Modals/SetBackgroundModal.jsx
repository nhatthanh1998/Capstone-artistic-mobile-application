import React, {useState} from 'react'
import {View, Text, TouchableOpacity, Image} from 'react-native'
import tailwind from 'tailwind-rn'
import Modal from 'react-native-modal';
import { styles } from '../../../styles';
import { AlbumPicker } from './SavePhotoToAlbumModal/DropDown'
import { useDispatch } from 'react-redux';
import { setIsLoading } from '../../../redux/slicers/is-loading.slicer';
import { changeAlbumBackground } from '../../../apis/albums';
import Toast from 'react-native-toast-message';
import { updateAlbumThumbnail } from '../../../redux/slicers/albumss.slicer';


export const SetBackgroundModal = ({isVisible, onCancel, media }) => {
    const dispatch = useDispatch()
    const [selectedAlbum, setSelectedAlbum] = useState(null)

    const handleSetAlbumBackground = () => {
        onCancel()
        dispatch(setIsLoading(true))
        changeAlbumBackground({
            albumId: selectedAlbum,
            photoLocation: media.storageLocation
        }).then(data => {
            const {id, thumbnailURL} = data
            dispatch(updateAlbumThumbnail({id, thumbnailURL}))
            dispatch(setIsLoading(false))
            
        }).catch(err => {
            console.log(err)
            dispatch(setIsLoading(false))
        })
    }

    return (
        <Modal 
            isVisible={isVisible} 
            animationOut="bounceOut"
            animationIn="bounceInUp"
            animationInTiming={350}
            animationOutTiming={150}
            backdropColor="black"
            backdropOpacity={0.7}
        >
            <View style={tailwind("bg-white m-5 rounded-xl p-5 relative")}>
                <TouchableOpacity onPress={() => onCancel()} style={tailwind("absolute z-10 mt-3 mr-3 top-0 right-0")}>
                    <Image source={require('../../../assets/icons/x-square.png')} style={tailwind("w-5 h-5")}/>
                </TouchableOpacity>
                <Text style={tailwind("text-2xl font-bold tracking-tight text-center")}>Set Background</Text>
                <View style={tailwind("flex flex-row justify-center")}>
                    <Text style={tailwind("text-center mt-1 text-base tracking-wide text-gray-500 mb-3")}>
                        Choose album you want to set background
                    </Text>
                </View>
                <AlbumPicker
                    selectedAlbum={selectedAlbum}
                    setSelectedAlbum={setSelectedAlbum}
                />
                <View style={tailwind("flex flex-row relative w-full justify-center items-center z-10")}>
                    <TouchableOpacity onPress={() => {
                        handleSetAlbumBackground()
                    }} style={{...tailwind("p-3 bg-yellow-300 px-5 rounded-xl mt-4"), ...styles.shadow_2}}>
                        <Text style={tailwind("text-center text-sm")}>Set background</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}
