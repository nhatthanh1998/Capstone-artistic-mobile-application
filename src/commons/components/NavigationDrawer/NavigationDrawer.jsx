import React from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'
import { selectUserProfile } from '../../../redux/slicers/user.slicer'
import { Title, Caption, Drawer } from 'react-native-paper';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IonIcon from 'react-native-vector-icons/Ionicons'
import { styles } from './styles'
import { ALBUM_LIST_PAGE, MAIN_PAGE, PROFILE_PAGE, CHANGE_PASSWORD_PAGE } from '../../../enums/page-name'
import { ALBUM_TITLE, HOME_TITLE, PROFILE_TITLE, SECTION_TITLE, SIGN_OUT_TITLE, CHANGE_PASSWOR_TITLE } from '../../../enums/drawer-title'
import { handleNavigation, handleSignOut } from './handler'



export const NavigationDrawerContent = (props) => {
    const dispatch = useDispatch()
    const userProfile = useSelector(selectUserProfile)
    const { firstName, lastName, email } = userProfile
    let fullName = `${firstName} ${lastName}`

    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{ flexDirection: 'row', marginTop: 15 }}>
                            <View style={{ flexDirection: 'column' }}>
                                <Title style={styles.title}>{fullName}</Title>
                                <Caption style={styles.caption}>@{email}</Caption>
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
                                    name="account-key-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label={CHANGE_PASSWOR_TITLE}
                            onPress={() => { handleNavigation({ navigation: props.navigation, pageName: CHANGE_PASSWORD_PAGE }) }}
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
                            onPress={() => handleNavigation({ navigation: props.navigation, pageName: ALBUM_LIST_PAGE })}
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
                    onPress={() => { handleSignOut({ dispatch }) }}
                />
            </Drawer.Section>
        </View>
    );
}
