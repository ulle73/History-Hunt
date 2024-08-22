





import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MapViewComponent from '../COMPONENTS/MapView';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location'; // Lägg till denna import för att använda GPS
import Button from '../COMPONENTS/Button'

const HuntMapScreen = ({ navigation, route }) => {
    const { title, estimatedTime, invitedFriends, image } = route.params;
    const [selectedLocations, setSelectedLocations] = useState([]);
    const [startLocation, setStartLocation] = useState(null);
    const [endLocation, setEndLocation] = useState(null);
    const [region, setRegion] = useState(null); // State för att hålla regionen
    const [currentStep, setCurrentStep] = useState('start'); // start, end, markers

    // Hämta användarens nuvarande plats när skärmen laddas
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setRegion({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            });
        })();
    }, []);

    const handleMarkerPress = (coordinate) => {
        if (currentStep === 'start') {
            setStartLocation(coordinate);
            setCurrentStep('end');
        } else if (currentStep === 'end') {
            setEndLocation(coordinate);
            setCurrentStep('markers');
        } else if (currentStep === 'markers') {
            setSelectedLocations([...selectedLocations, coordinate]);
        }
    };

    const handleCreateHunt = async () => {
        if (!startLocation || !endLocation) {
            alert('Please set both a start and end point before proceeding.');
            return;
        }

        try {
            const id = await AsyncStorage.getItem('loggedInUser');
           
            const response = await axios.post('https://historyhunt-12cfa-default-rtdb.firebaseio.com/hunts.json', {
                title,
                estimatedTime,
                invitedFriends,
                locations: { startLocation, endLocation, selectedLocations },
                creator: id,
                image
            });

            navigation.navigate('Start');
        } catch (error) {
            console.error('Error creating hunt:', error);
        }
    };

    return (
        <View style={styles.container}>
            <MapViewComponent
                markers={selectedLocations}
                startLocation={startLocation}
                endLocation={endLocation}
                onMarkerPress={handleMarkerPress}
                region={region} 
            />
            <View style={styles.buttonContainer}>
                <Button title="Create History Hunt" onPress={handleCreateHunt} />
            </View>
        </View>
    )}



const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 20, 
        left: 20,  
        right: 20, 
        zIndex: 1,  
       
        padding: 10, 
        borderRadius: 10, 
     
        alignItems: 'center',
        paddingBottom: 50
    },
});

export default HuntMapScreen;
