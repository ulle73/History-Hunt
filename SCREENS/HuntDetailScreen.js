import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Button from '../COMPONENTS/Button'

const HuntDetailScreen = ({ navigation, route }) => {
    const { hunt, completedHunts, plannedHunts, activeHunts, setActiveHunts, setPlannedHunts, setCompletedHunts } = route.params;

    return (
        <View style={styles.container}>
              <Text style={styles.title}>Customize Hunt</Text>
              <Text style={styles.pick}>You picked:</Text>
            <Text style={styles.hunt}>{hunt.title}</Text>
            
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

            <Button title="Start Hunt" onPress={() => navigation.navigate('InGame', { huntId: hunt.id, hunt, setActiveHunts, setPlannedHunts, setCompletedHunts , completedHunts, activeHunts   })} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#ffffff',
        alignItems: 'center'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10,
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        color: '#8E8E93',
        marginBottom: 4,
    },
    huntName: {
        fontSize: 18,
        textAlign: 'center',
        fontWeight: '600',
        color: '#4A4A4A',
        marginBottom: 10,
    },
    routeText: {
        textAlign: 'center',
        color: '#8E8E93',
        marginBottom: 10,
    },
    map: {
        width: '100%',
        height: 250,
        marginBottom: 16,
        borderRadius: 10,
        overflow: 'hidden',
    },
    timeText: {
        textAlign: 'center',
        color: '#8E8E93',
        marginTop: 10,
    },
    estimatedTime: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: '600',
        color: '#000000',
        marginVertical: 10,
    },
    buttonContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center'
    },
    pick: {
           color: '#ee00ee7e',
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 5
    },
    hunt: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 400,
        marginBottom: 20,
    }
});


export default HuntDetailScreen;
