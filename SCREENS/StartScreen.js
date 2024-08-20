import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Pressable, Alert } from 'react-native';
import UserAvatar from '../COMPONENTS/UserAvatar';
import HuntItem from '../COMPONENTS/HuntItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';

const StartScreen = ({ navigation }) => {
    const [userImage, setUserImage] = useState('https://cdn-icons-png.flaticon.com/512/17/17004.png'); // Standardbild
    const [activeHunts, setActiveHunts] = useState([]);
    const [plannedHunts, setPlannedHunts] = useState([]);
    const [completedHunts, setCompletedHunts] = useState([]);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const fetchHunts = async () => {
            try {
                const id = await AsyncStorage.getItem('loggedInUser');
                setUserId(id);
    
                // Hämta användarens data
                const userResponse = await axios.get(`https://historyhunt-12cfa-default-rtdb.firebaseio.com/user/${id}.json`);
                const userData = userResponse.data;
    
                // Hämta alla hunts från Firebase
                const huntsResponse = await axios.get('https://historyhunt-12cfa-default-rtdb.firebaseio.com/hunts.json');
                const huntsData = huntsResponse.data;
    
                const active = [];
                const planned = [];
                const completed = []; // Här kan du implementera logik för completed hunts
    
                // Kategorisera hunts
                for (const key in huntsData) {
                    const hunt = huntsData[key];
                    
                    if (hunt.creator === id) {
                        planned.push({ id: key, ...hunt });
                    } else if (hunt.invitedFriends && hunt.invitedFriends.includes(userData.email)) {
                        active.push({ id: key, ...hunt });
                    }
                }
    
                setActiveHunts(active);
                setPlannedHunts(planned);
                setCompletedHunts(completed);
            } catch (error) {
                console.error('Error fetching hunts:', error);
            }
        };
    
        fetchHunts();
    }, [plannedHunts]);

    const handleImagePicked = async () => {
        try {
            // Begär åtkomst till mediebiblioteket
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Sorry, we need camera roll permissions to make this work!');
                return;
            }

            // Öppna bildgalleri
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            if (!result.canceled) {
                const uri = result.assets[0].uri;

                // Hantera bildändring (exempelvis uppdatera lokal state)
                setUserImage(uri);
            }
        } catch (error) {
            console.error('Error picking image:', error);
        }
    };

    const handleHuntPress = (hunt) => {
        // Navigera till en detaljerad vy för hunten
        navigation.navigate('HuntDetail', { hunt });
    };

    return (
        <View style={styles.container}>
            <UserAvatar uri={userImage} onImagePicked={handleImagePicked} />
            
            <Text>ANDRA HUNTS DÄR JAG ÄR INBJUDEN</Text>
            <FlatList
                data={activeHunts}
                renderItem={({ item }) => (
                    <Pressable onPress={() => handleHuntPress(item)}>
                        <HuntItem title={item.title} />
                    </Pressable>
                )}
                keyExtractor={(item) => item.id}
            />

            <Text>MINA HUNTS</Text>
            <FlatList
                data={plannedHunts}
                renderItem={({ item }) => (
                    <Pressable onPress={() => handleHuntPress(item)}>
                        <HuntItem title={item.title} />
                    </Pressable>
                )}
                keyExtractor={(item) => item.id}
            />

            <Text>Medals</Text>
            <FlatList
                data={completedHunts}
                renderItem={({ item }) => (
                    <Pressable onPress={() => handleHuntPress(item)}>
                        <HuntItem title={item.title} />
                    </Pressable>
                )}
                keyExtractor={(item) => item.id}
            />

            <Button title="Create Hunt" onPress={() => navigation.navigate('CreateHunt')} />

            <Button title="ADAM" onPress={() => navigation.navigate('InGame')} />
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
