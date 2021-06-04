import React from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'
import { selectUserProfile } from '../../../redux/slicers/user.slicer'
import { useTheme, Avatar, Title, Caption, Drawer, Text, TouchableRipple, Switch } from 'react-native-paper';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AntIcon from 'react-native-vector-icons/AntDesign'
import IonIcon from 'react-native-vector-icons/Ionicons'
import { styles } from './styles'

import { handleNavigation, handleSignOut } from './handler'


export const NavigationDrawerContent = (props) => {

    const dispatch = useDispatch()
    const userProfile = useSelector(selectUserProfile)

    const paperTheme = useTheme()
    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{ flexDirection: 'row', marginTop: 15 }}>
                            <Avatar.Image
                                source={{
                                    uri: 'https://i.pinimg.com/originals/c1/13/df/c113df816b94afc3224d925890e290e2.jpg'
                                }}
                                size={50}
                            />
                            <View style={{ marginLeft: 15, flexDirection: 'column' }}>
                                <Title style={styles.title}>Marumi</Title>
                                <Caption style={styles.caption}>@nhatthanhlolo1</Caption>
                            </View>
                        </View>
                    </View>

                    <Drawer.Section style={styles.drawerSection} title="Sections">
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="home-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Home"
                            onPress={() => { props.navigation.navigate('Home') }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="account-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Profile"
                            onPress={() => { props.navigation.navigate('Profile') }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="camera-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Camera"
                            onPress={() => { props.navigation.navigate('Gallery') }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <AntIcon
                                    name="picture"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Gallery"
                            onPress={() => { props.navigation.navigate('Gallery') }}
                        />

                        <DrawerItem
                            icon={({ color, size }) => (
                                <IonIcon
                                    name="albums-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Album"
                            onPress={() => { props.navigation.navigate('Gallery') }}
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
                    label="Sign Out"
                    onPress={() => { handleSignOut() }}
                />
            </Drawer.Section>
        </View>
    );
}
