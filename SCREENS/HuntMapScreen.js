import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import MapViewComponent from '../COMPONENTS/MapView';


const HuntMapScreen = ({ navigation }) => {
    const markers = [
        { coordinate: { latitude: 37.78825, longitude: -122.4324 } },
        // Lägg till fler markörer här om det behövs
    ];

    const handleCapturePhoto = () => {
        navigation.navigate('TakePhoto');
    };

    return (
        <View style={styles.container}>
            <MapViewComponent markers={markers} />
            <Button title="Capture Photo" onPress={handleCapturePhoto} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default HuntMapScreen;
