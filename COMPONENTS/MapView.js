import React, { useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Dimensions } from 'react-native';

const MapViewComponent = ({ markers, onMarkerPress }) => {
    const [selectedMarkers, setSelectedMarkers] = useState(markers);

    const handleMapPress = (e) => {
        const newMarker = {
            coordinate: e.nativeEvent.coordinate,
        };
        setSelectedMarkers([...selectedMarkers, newMarker]);
        onMarkerPress(newMarker.coordinate);
    };

    return (
        <MapView
            style={styles.map}
            onPress={handleMapPress}
            initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
        >
            {selectedMarkers.map((marker, index) => (
                <Marker key={index} coordinate={marker.coordinate} />
            ))}
        </MapView>
    );
};

const styles = StyleSheet.create({
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});

export default MapViewComponent;
