import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const HuntDetailScreen = ({ navigation, route }) => {
    const { hunt, completedHunts, plannedHunts, activeHunts } = route.params;

    return (
        <View style={styles.container}>
            <Text>Hunt Details for hunt {hunt.id}</Text>
            
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: hunt.locations.startLocation.latitude,
                    longitude: hunt.locations.startLocation.longitude,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05,
                }}
            >
                {/* Markör för startplats */}
                <Marker
                    coordinate={hunt.locations.startLocation}
                    title="Start"
                    pinColor="green"
                />
                
                {/* Markör för slutplats */}
                <Marker
                    coordinate={hunt.locations.endLocation}
                    title="End"
                    pinColor="blue"
                />

                {/* Markörer för andra platser */}
                {hunt.locations.selectedLocations.map((location, index) => (
                    <Marker
                        key={index}
                        coordinate={location}
                        title={`Point ${index + 1}`}
                    />
                ))}
            </MapView>

            <Button title="Start Hunt" onPress={() => navigation.navigate('InGame', { huntId: hunt.id, hunt, plannedHunts, activeHunts, completedHunts})} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    map: {
        width: '100%',
        height: 400,
        marginBottom: 16,
    },
});

export default HuntDetailScreen;
