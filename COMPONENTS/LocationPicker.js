import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const LocationPicker = ({ onLocationPicked }) => {
    const [selectedLocation, setSelectedLocation] = React.useState(null);

    const handleSelectLocation = (event) => {
        setSelectedLocation(event.nativeEvent.coordinate);
    };

    const handleConfirm = () => {
        if (selectedLocation) {
            onLocationPicked(selectedLocation);
        }
    };

    return (
        <View style={styles.container}>
            <MapView style={styles.map} onPress={handleSelectLocation}>
                {selectedLocation && <Marker coordinate={selectedLocation} />}
            </MapView>
            <Button title="Confirm Location" onPress={handleConfirm} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
});

export default LocationPicker;
