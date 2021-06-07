import React from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'
import { selectUserProfile } from '../../../redux/slicers/user.slicer'
import { Avatar, Title, Caption, Drawer } from 'react-native-paper';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AntIcon from 'react-native-vector-icons/AntDesign'
import IonIcon from 'react-native-vector-icons/Ionicons'
import { styles } from './styles'
import { ALBUM_PAGE, MAIN_PAGE, CAMERA_PAGE, PROFILE_PAGE } from '../../../enums/page-name'
import { ALBUM_TITLE, CAMERA_TITLE, GALLERY_TITLE, HOME_TITLE, PROFILE_TITLE, SECTION_TITLE, SIGN_OUT_TITLE } from '../../../enums/drawer-title'
import { handleNavigation, handleSignOut } from './handler'
import { handlePressGallery } from '../../../pages/HomePage/handler'



export const NavigationDrawerContent = (props) => {
    const dispatch = useDispatch()
    const userProfile = useSelector(selectUserProfile)
    const {firstName, lastName, id, email, username, iconURL} = userProfile
    let fullName = `${firstName} ${lastName}`
    
    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{ flexDirection: 'row', marginTop: 15 }}>
                            <Avatar.Image
                                source={{
                                    uri: iconURL
                                }}
                                size={50}
                            />
                            <View style={{ marginLeft: 15, flexDirection: 'column' }}>
                                <Title style={styles.title}>{fullName}</Title>
                                <Caption style={styles.caption}>@{username}</Caption>
                            </View>
                        </View>
                    </View>

                    <Drawer.Section style={styles.drawerSection} title={SECTION_TITLE}>
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="home-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label={HOME_TITLE}
                            onPress={() => { props.navigation.navigate(MAIN_PAGE) }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="account-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label={PROFILE_TITLE}
                            onPress={() => { props.navigation.navigate(PROFILE_PAGE) }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="camera-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label={CAMERA_TITLE}
                            onPress={() => handleNavigation({navigation: props.navigation, pageName:CAMERA_PAGE})}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <AntIcon
                                    name="picture"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label={GALLERY_TITLE}
                            onPress={() => {() => handlePressGallery({navigation: props.navigation, dispatch}) }}
                        />

                        <DrawerItem
                            icon={({ color, size }) => (
                                <IonIcon
                                    name="albums-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label={ALBUM_TITLE}
                            onPress={() =>  handleNavigation({navigation: props.navigation, pageName: ALBUM_PAGE})}
                        />
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem
                    icon={({ color, size }) => (
                        <Icon
                            name="exit-to-app"
                            color={color}
                            size={size}
                        />
                    )}
                    label={SIGN_OUT_TITLE}
                    onPress={() => { handleSignOut({dispatch})}}
                />
            </Drawer.Section>
        </View>
    );
}
