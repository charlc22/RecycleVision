import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import CameraScreen from './screens/CameraScreen';
import ResultsScreen from './screens/ResultsScreen';
import InfoScreen from './screens/InfoScreen';

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Home"
                screenOptions={{ headerShown: false }}
            >
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Camera" component={CameraScreen} />
                <Stack.Screen name="Results" component={ResultsScreen} />
                <Stack.Screen name="Info" component={InfoScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}