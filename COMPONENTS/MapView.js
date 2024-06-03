import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MapViewComponent = ({ markers }) => (
    <MapView style={styles.map}>
        {markers.map((marker, index) => (
            <Marker key={index} coordinate={marker.coordinate} />
        ))}
    </MapView>
);

const styles = StyleSheet.create({
    map: {
        flex: 1,
    },
});

export default MapViewComponent;
