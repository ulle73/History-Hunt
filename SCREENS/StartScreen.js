import React from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import UserAvatar from '../COMPONENTS/UserAvatar';
import HuntItem from '../COMPONENTS/HuntItem';

const StartScreen = ({ navigation }) => {
    const userImage = 'https://cdn-icons-png.flaticon.com/512/17/17004.png'; 
    const activeHunts = [{ id: '1', title: 'Active Hunt 1' }];
    const plannedHunts = [{ id: '2', title: 'Planned Hunt 1' }];
    const completedHunts = [{ id: '3', title: 'Completed Hunt 1' }];

    const handleImagePicked = (uri) => {

    };

    return (
        <View style={styles.container}>
            <UserAvatar uri={userImage} onImagePicked={handleImagePicked} />
            <Text>Active Hunts</Text>
            <FlatList
                data={activeHunts}
                renderItem={({ item }) => <HuntItem title={item.title} />}
                keyExtractor={(item) => item.id}
            />
            <Text>Planned Hunts</Text>
            <FlatList
                data={plannedHunts}
                renderItem={({ item }) => <HuntItem title={item.title} />}
                keyExtractor={(item) => item.id}
            />
            <Button title="Create Hunt" onPress={() => navigation.navigate('CreateHunt')} />
            <Text>Medals</Text>
            <FlatList
                data={completedHunts}
                renderItem={({ item }) => <HuntItem title={item.title} />}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
});

export default StartScreen;
