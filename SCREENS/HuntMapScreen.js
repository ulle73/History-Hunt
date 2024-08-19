import React, { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import MapViewComponent from '../COMPONENTS/MapView';
import axios from "axios"

const HuntMapScreen = ({ navigation, route }) => {
    const { title, estimatedTime, invitedFriends } = route.params;
    const [selectedLocations, setSelectedLocations] = useState([]);
   

    const handleMarkerPress = (coordinate) => {
        setSelectedLocations([...selectedLocations, coordinate]);
    };

    const handleCreateHunt = async () => {
        try {

            setTimeout(async () => {
            const response = await axios.post('https://historyhunt-12cfa-default-rtdb.firebaseio.com/hunts.json', {
                invitedFriends,
                locations: selectedLocations,
                title,
                estimatedTime,
            });
            }, 1000);

            // const huntId = response.data.name;

            // for (const email of invitedFriends) {
            //     await axios.post(`https://historyhunt-12cfa-default-rtdb.firebaseio.com/activeHunts/${email}.json`, {
            //         huntId,
            //         title,
            //     });
            // }

            navigation.navigate('Start');
        } catch (error) {
            console.error('Error creating hunt:', error);
        }
    };







    return (
        <View style={styles.container}>
            <Button title="History Hunt" onPress={handleCreateHunt} />
            <MapViewComponent markers={[]} onMarkerPress={handleMarkerPress} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default HuntMapScreen;
