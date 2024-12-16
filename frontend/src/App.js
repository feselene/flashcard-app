import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import AddFlashcardScreen from './screens/AddFlashcardScreen';

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{ headerShown: false }} // Hide the header if you want
                />
                <Stack.Screen
                    name="AddFlashcard"
                    component={AddFlashcardScreen}
                    options={{ title: 'Add Flashcard' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
