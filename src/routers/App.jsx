import React from 'react'
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'

import { HomePage } from "../pages/HomePage"
const App = () => {
    const Stack = createStackNavigator()

    return (
        <NavigationContainer >
            <Stack.Navigator>
                <Stack.Screen name="Effects" component={HomePage}
                    options={{
                        title: 'Effects',
                    }}

                />

                <Stack.Screen name="HomePage" component={HomePage}
                    options={{
                        title: 'HomePage',
                        headerShown: false
                    }}

                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;