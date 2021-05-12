import React from 'react'
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'

import { HomePage } from "../pages/HomePage"
import { ImageTranferPage } from "../pages/ImageTranferPage"
const App = () => {
    const Stack = createStackNavigator()

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="EFFECTS" component={ImageTranferPage}
                    options={{
                        title: 'EFFECTS',
                        
                    }}

                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;