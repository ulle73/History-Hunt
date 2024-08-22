import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';
import Button from '../COMPONENTS/Button'
const InviteScreen = ({ navigation, route }) => {
    const { title, estimatedTime, image } = route.params;
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
                console.log("JONAS",usersList)
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
    

   
    





    const handleFinish = async () => {
        try {
      
          
            navigation.navigate('HuntMap', { invitedFriends, title, estimatedTime, image  });

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
                    <TouchableOpacity
                        onPress={() => handleInvite(item.email)}
                        style={[
                            styles.friendItem,
                            invitedFriends.includes(item.email) && styles.selectedFriendItem
                        ]}
                    >
                        <Text
                            style={[
                                styles.friendText,
                                invitedFriends.includes(item.email) && styles.selectedFriendText
                            ]}
                        >
                            {item.username}
                        </Text>
                    </TouchableOpacity>
                )}
                contentContainerStyle={styles.listContent}
            />
            <View style={styles.buttonContainer}>
                <Button title="Invite" onPress={handleFinish} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f7f7f7',
        paddingBottom: 50
    },
    listContent: {
        width: '100%',
        paddingVertical: 20,
        alignItems: 'center',
    },
    friendItem: {
        padding: 20,
        marginVertical: 10,
        backgroundColor: '#fff',
        borderRadius: 50, 
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 2,
        width: 80,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedFriendItem: {
        backgroundColor: '#0bc411', 
    },
    friendText: {
        color: '#333',
        textAlign: 'center',
    },
    selectedFriendText: {
        color: '#fff', 
    },
    buttonContainer: {
        marginTop: 20,
        width: '100%',
        alignItems: 'center',
    },
});

export default InviteScreen;
