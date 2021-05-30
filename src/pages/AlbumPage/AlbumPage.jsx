import React from 'react'
import {View, Text} from "react-native"
import CameraRollGallery from "react-native-camera-roll-gallery";

export const AlbumPage = () => {
    return (
        <CameraRollGallery
            enableCameraRoll={false} // default true,
            enableVerticalExit={true}
            imageContainerStyle={{
                width: 1000,
            }}

            // Get data logic goes here.
            // This will get trigger initially
            // and when it reached the end
            // if there is more.
            onGetData={(fetchParams, resolve) => {
                resolve({
                    assets: [
                        // Can be used with different image object fieldnames.
                        // Ex. source, source.uri, uri, URI, url, URL
                        { uri: "https://luehangs.site/pic-chat-app-images/beautiful-blond-blonde-hair-478544.jpg" },
                        // { source: require("yourApp/image.png"),
                        //     // IMPORTANT: It is REQUIRED for LOCAL IMAGES
                        //     // to include a dimensions field with the
                        //     // actual width and height of the image or
                        //     // it will throw an error.
                        //     dimensions: { width: 1080, height: 1920 } },
                        { source: { uri: "https://luehangs.site/pic-chat-app-images/beautiful-beautiful-women-beauty-40901.jpg" } },
                        { uri: "https://luehangs.site/pic-chat-app-images/animals-avian-beach-760984.jpg" },
                        { URI: "https://luehangs.site/pic-chat-app-images/beautiful-blond-fishnet-stockings-48134.jpg" },
                        { url: "https://luehangs.site/pic-chat-app-images/beautiful-beautiful-woman-beauty-9763.jpg" },
                        { URL: "https://luehangs.site/pic-chat-app-images/attractive-balance-beautiful-186263.jpg" },
                    ],
                    pageInfo: {
                        hasNextPage: false
                    }
                });
            }}
        />
    );
}