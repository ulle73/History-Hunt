import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './SCREENS/LoginScreen';
import SignupScreen from './SCREENS/SignupScreen';
import StartScreen from './SCREENS/StartScreen';
import CreateHuntScreen from './SCREENS/CreateHuntScreen';
import InviteScreen from './SCREENS/InviteScreen';
import HuntConfirmationScreen from './SCREENS/HuntConfirmationScreen';
import HuntDetailScreen from './SCREENS/HuntDetailScreen';
import HuntMapScreen from './SCREENS/HuntMapScreen';
import TakePhotoScreen from './SCREENS/TakePhotoScreen';


const Stack = createStackNavigator();

const App = () => (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="Start" component={StartScreen} />
            <Stack.Screen name="CreateHunt" component={CreateHuntScreen} />
            <Stack.Screen name="Invite" component={InviteScreen} />
            <Stack.Screen name="HuntConfirmation" component={HuntConfirmationScreen} />
            <Stack.Screen name="HuntDetail" component={HuntDetailScreen} />
            <Stack.Screen name="HuntMap" component={HuntMapScreen} />
            <Stack.Screen name="TakePhoto" component={TakePhotoScreen} />
        </Stack.Navigator>
    </NavigationContainer>
);

export default App
