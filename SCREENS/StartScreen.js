import React, {useEffect} from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import UserAvatar from '../COMPONENTS/UserAvatar';
import HuntItem from '../COMPONENTS/HuntItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios"



const StartScreen = ({ navigation }) => {
    const userImage = 'https://cdn-icons-png.flaticon.com/512/17/17004.png'; //ändra till firebasebild
    const activeHunts = [{ id: '1', title: 'Active Hunt 1' }];
    const plannedHunts = [{ id: '2', title: 'Planned Hunt 1' }];
    const completedHunts = [{ id: '3', title: 'Completed Hunt 1' }];


    useEffect(() => {
        const fetchInloggedUser = async () => {
            try {

                const id = await AsyncStorage.getItem('loggedInUser');
                console.log("loggedinUser:", id)




                const response = await axios.get(`https://historyhunt-12cfa-default-rtdb.firebaseio.com/user/${id}.json`);
                const userData = response.data;

                console.log(userData)

                // // Omvandla objekt till array
                // const usersList = Object.keys(usersData).map(key => ({
                //     email: usersData[key].email,
                //     username: usersData[key].username,
                // }));

           
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchInloggedUser();
    }, []);

    const handleImagePicked = (uri) => {

    };

    return (
        <View style={styles.container}>
            <UserAvatar uri={userImage} onImagePicked={handleImagePicked} />
            <Text>ANDRA HUNTS DÄR JAG ÄR INBJUDEN</Text>
            <FlatList
                data={activeHunts}
                renderItem={({ item }) => <HuntItem title={item.title}  />}
                keyExtractor={(item) => item.id}
            />
            <Text>MINA HUNTS</Text>
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





<Button title="JONATAN" onPress={() => navigation.navigate('HuntConfirmation')} />
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
