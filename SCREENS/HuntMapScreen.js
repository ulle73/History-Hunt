import React, { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import MapViewComponent from '../COMPONENTS/MapView';

const HuntMapScreen = ({ navigation, route }) => {
    const { title, estimatedTime, invitedFriends } = route.params;
    const [selectedLocations, setSelectedLocations] = useState([]);

    const handleMarkerPress = (coordinate) => {
        setSelectedLocations([...selectedLocations, coordinate]);
    };

    const handleCreateHunt = async () => {
        try {
            const response = await axios.post('https://historyhunt-12cfa-default-rtdb.firebaseio.com/hunts.json', {
                title,
                estimatedTime,
                invitedFriends,
                locations: selectedLocations,
            });

            const huntId = response.data.name;

            for (const email of invitedFriends) {
                await axios.post(`https://historyhunt-12cfa-default-rtdb.firebaseio.com/activeHunts/${email}.json`, {
                    huntId,
                    title,
                });
            }

            navigation.navigate('Start');
        } catch (error) {
            console.error('Error creating hunt:', error);
        }
    };

    return (
        <View style={styles.container}>
            <MapViewComponent markers={[]} onMarkerPress={handleMarkerPress} />
            <Button title="History Hunt" onPress={handleCreateHunt} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default HuntMapScreen;
