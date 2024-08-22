




import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Dimensions } from 'react-native';

const MapViewComponent = ({ markers, startLocation, endLocation, onMarkerPress, region }) => {
    return (
        <MapView
            style={styles.map}
            onPress={(e) => onMarkerPress(e.nativeEvent.coordinate)}
            region={region} // Här används region för att centrera kartan på användarens plats
            showsUserLocation={true} // Visa användarens nuvarande position på kartan
        >
            {startLocation && (
                <Marker
                    coordinate={startLocation}
                    title="Start Point"
                    pinColor="green"
                />
            )}
            {endLocation && (
                <Marker
                    coordinate={endLocation}
                    title="End Point"
                    pinColor="blue"
                />
            )}
            {markers.map((marker, index) => (
                <Marker key={index} coordinate={marker} title={`Point ${index + 1}`} />
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
