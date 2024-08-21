// import React, {useEffect, useState} from 'react';
// import { View, Text, Button, FlatList, StyleSheet, Pressable } from 'react-native';
// import UserAvatar from '../COMPONENTS/UserAvatar';
// import HuntItem from '../COMPONENTS/HuntItem';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from "axios"

// const StartScreen = ({ navigation }) => {
    
//     const [userImage, setUserImage] = useState('https://cdn-icons-png.flaticon.com/512/17/17004.png'); // Ändra till Firebase-bild
//     const [activeHunts, setActiveHunts] = useState([]);
//     const [plannedHunts, setPlannedHunts] = useState([]);
//     const [completedHunts, setCompletedHunts] = useState([]);
//     const [userId, setUserId] = useState(null);

//     useEffect(() => {
//         const fetchHunts = async () => {
//             try {
//                 const id = await AsyncStorage.getItem('loggedInUser');
//                 setUserId(id);
    
//                 // Hämta användarens data
//                 const userResponse = await axios.get(`https://historyhunt-12cfa-default-rtdb.firebaseio.com/user/${id}.json`);
//                 const userData = userResponse.data;
    
//                 // Hämta alla hunts från Firebase
//                 const huntsResponse = await axios.get('https://historyhunt-12cfa-default-rtdb.firebaseio.com/hunts.json');
//                 const huntsData = huntsResponse.data;
    
//                 const active = [];
//                 const planned = [];
//                 const completed = []; // Här kan du implementera logik för completed hunts
    
//                 // Kategorisera hunts
//                 for (const key in huntsData) {
//                     const hunt = huntsData[key];
//                     //console.log(`Hunt ID: ${key}, Creator ID: ${hunt.creator}, Logged in User ID: ${id}`);
                    
//                     if (hunt.creator === id) {
//                        // console.log("Adding to planned hunts:", hunt.title);
//                         planned.push({ id: key, ...hunt });
//                     } else if (hunt.invitedFriends && hunt.invitedFriends.includes(userData.email)) {
//                         active.push({ id: key, ...hunt });
//                     }
//                 }
    
//                 //console.log("Planned Hunts:", planned);
//                 setActiveHunts(active);
//                 setPlannedHunts(planned);
//                 // setCompletedHunts(completed);
              
//             } catch (error) {
//                 //Sconsole.error('Error fetching hunts:', error);
//             }
//         };
    
//         fetchHunts();
//     }, [plannedHunts, activeHunts]);

//     const handleHuntPress = (hunt) => {
//         // Navigera till en detaljerad vy för hunten
//         navigation.navigate('HuntDetail', { hunt, setActiveHunts, setPlannedHunts, setCompletedHunts , completedHunts, activeHunts});
//     };

//     const handleImagePicked = (uri) => {
//         // Hantering av bildbyte
//     };

//     return (
//         <View style={styles.container}>
//             <UserAvatar uri={userImage} onImagePicked={handleImagePicked} />
            
//             <Text>ANDRA HUNTS DÄR JAG ÄR INBJUDEN</Text>
//             <FlatList
//                 data={activeHunts}
//                 renderItem={({ item }) => (
//                     <Pressable onPress={() => handleHuntPress(item)}>
//                         <HuntItem title={item.title} />
//                     </Pressable>
//                 )}
//                 keyExtractor={(item) => item.id}
//             />

//             <Text>MINA HUNTS</Text>
//             <FlatList
//                 data={plannedHunts}
//                 renderItem={({ item }) => (
//                     <Pressable onPress={() => handleHuntPress(item)}>
//                         <HuntItem title={item.title} />
//                     </Pressable>
//                 )}
//                 keyExtractor={(item) => item.id}
//             />

//             <Text>Medals</Text>
//             <FlatList
//                 data={completedHunts}
//                 renderItem={({ item }) => (
//                     <Pressable onPress={() => handleHuntPress(item)}>
//                         <HuntItem title={item.title} />
//                     </Pressable>
//                 )}
//                 keyExtractor={(item) => item.id}
//             />

//             <Button title="Create Hunt" onPress={() => navigation.navigate('CreateHunt')} />

            
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 16,
//     },
// });

// export default StartScreen;










import React, { useCallback, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Pressable } from 'react-native';
import { useFocusEffect } from '@react-navigation/native'; // Importera useFocusEffect
import UserAvatar from '../COMPONENTS/UserAvatar';
import Medals from '../COMPONENTS/Medals';
import HuntItem from '../COMPONENTS/HuntItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const StartScreen = ({ navigation }) => {
    const [userImage, setUserImage] = useState('https://cdn-icons-png.flaticon.com/512/17/17004.png'); // Ändra till Firebase-bild
    const [activeHunts, setActiveHunts] = useState([]);
    const [plannedHunts, setPlannedHunts] = useState([]);
    const [completedHunts, setCompletedHunts] = useState([]);
    const [userId, setUserId] = useState(null);

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
            //setCompletedHunts(completed);

        } catch (error) {
           // console.error('Error fetching hunts:', error);
        }
    };

    // Använd useFocusEffect för att hämta data när skärmen får fokus
    useFocusEffect(
        useCallback(() => {
            fetchHunts();
        }, [])
    );

    const handleHuntPress = (hunt) => {
        // Navigera till en detaljerad vy för hunten
        navigation.navigate('HuntDetail', { hunt, setActiveHunts, setPlannedHunts, setCompletedHunts, completedHunts, activeHunts });
    };

    const handleImagePicked = (uri) => {
        // Hantering av bildbyte
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

            <Text>Completed Hunts</Text>
            <FlatList
                data={completedHunts}
                renderItem={({ item }) => (
                    <Pressable onPress={() => handleHuntPress(item)}>
                        <HuntItem title={item.title} />
                        <Medals title={item.title}></Medals>
                    </Pressable>
                )}
                keyExtractor={(item) => item.id}
            />

            <Button title="Create Hunt" onPress={() => navigation.navigate('CreateHunt')} />
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
