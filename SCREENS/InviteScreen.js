import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet, FlatList, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';

const InviteScreen = ({ navigation, route }) => {
    const { title, estimatedTime } = route.params;
    const [friends, setFriends] = useState([]);
    const [invitedFriends, setInvitedFriends] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('https://historyhunt-12cfa-default-rtdb.firebaseio.com/user.json');
                const usersData = response.data;

                // Omvandla objekt till array
                const usersList = Object.keys(usersData).map(key => ({
                    email: usersData[key].email,
                }));

                setFriends(usersList);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleInvite = (email) => {
        setInvitedFriends([...invitedFriends, email]);
    };

    const handleFinish = async () => {
        try {
            await axios.post('https://historyhunt-12cfa-default-rtdb.firebaseio.com/hunts.json', {
                title,
                estimatedTime,
                invitedFriends,
            });

            navigation.navigate('Start');
        } catch (error) {
            console.error('Error creating hunt:', error);
        }
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={friends}
                keyExtractor={(item) => item.email}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleInvite(item.email)} style={styles.friendItem}>
                        <Text>{item.email}</Text>
                    </TouchableOpacity>
                )}
            />
            <Button title="History Hunt" onPress={handleFinish} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    friendItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
});

export default InviteScreen;
