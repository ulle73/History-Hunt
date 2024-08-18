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
                    username: usersData[key].username,
                }));

                setFriends(usersList);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleInvite = (email) => {
        if (invitedFriends.includes(email)) {
            setInvitedFriends(invitedFriends.filter(friend => friend !== email));
        } else {
            setInvitedFriends([...invitedFriends, email]);
        }
    };
    

    // const handleFinish = async () => {
    //     try {
    //         // Kontrollera vad som skickas
    //         console.log({
    //             title,
    //             estimatedTime,
    //             invitedFriends,
    //         });
    
    //         const huntResponse = await axios.post('https://historyhunt-12cfa-default-rtdb.firebaseio.com/hunts.json', {
    //             title,
    //             estimatedTime,
    //             invitedFriends,
    //         });
    
    //         const huntId = huntResponse.data.name;
    
    //         for (const email of invitedFriends) {
    //             await axios.post(`https://historyhunt-12cfa-default-rtdb.firebaseio.com/activeHunts/${email}.json`, {
    //                 huntId,
    //                 title,
    //             });
    //         }
    
    //         navigation.navigate('Start');
    //     } catch (error) {
    //         console.error('Error creating hunt:', error.response?.data || error.message);
    //     }
    // };
    





    const handleFinish = async () => {
        try {
            const huntResponse = await axios.post('https://historyhunt-12cfa-default-rtdb.firebaseio.com/hunts.json', {
                title,
                estimatedTime,
                invitedFriends,
            });
    
            const huntId = huntResponse.data.name;
    
            for (const email of invitedFriends) {
                const encodedEmail = encodeURIComponent(email);
                await axios.post(`https://historyhunt-12cfa-default-rtdb.firebaseio.com/activeHunts/${encodedEmail}.json`, {
                    huntId,
                    title,
                });
            }
    
            // Navigera till kartan efter att inbjudningarna har skickats
          
            navigation.navigate('HuntMap', { huntId, title });

        } catch (error) {
            console.error('Error creating hunt:', error.response?.data || error.message);
        }
    };
    
    

    return (
        <View style={styles.container}>
           <FlatList
    data={friends}
    keyExtractor={(item) => item.email}
    renderItem={({ item }) => (
        <TouchableOpacity onPress={() => handleInvite(item.email)} style={styles.friendItem}>
            <Text style={{ fontWeight: invitedFriends.includes(item.email) ? 'bold' : 'normal' }}>
                {item.username}
            </Text>
        </TouchableOpacity>
    )}
/>
            <Button title="Invite" onPress={handleFinish} />
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
