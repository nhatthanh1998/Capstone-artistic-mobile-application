import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export const  GalleryPage = () => {
    const [hasPermission, setHasPermission] = useState(null)
    const [image, setImage] = useState(null);

   async function getGalleryAccessPermission() {
        if (Platform.OS !== 'web') {
            const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (galleryStatus.status !== 'granted') {
                setHasPermission(false)
            } else {
                setHasPermission(true)
            }
        }
    }
    useEffect(() => {
        getGalleryAccessPermission()
    }, []);


    if(hasPermission === null) {
        return <Text>Something went wrong with the gallery permission</Text>
    }
    if(hasPermission === false) {
        return <Text>Need Gallery Access Permission to access the gallery</Text>
    }



    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };


    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button title="Pick an image from camera roll" onPress={pickImage} />
            {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        </View>
    );
}
