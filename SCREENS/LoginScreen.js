import React , {useState} from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from  "../COMPONENTS/Button"

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        const response = await axios.get("https://historyhunt-12cfa-default-rtdb.firebaseio.com/user.json");
        const users = response.data;
        const userToString = JSON.stringify(users);
        console.log("1", users);
        console.log("2", userToString);


    
        for (const id in users) {
            console.log("3", users[id].email)
            console.log("4", users[id].password)
          
            if (users[id].email === email && users[id].password === password) {
                console.log("success");
await AsyncStorage.setItem(
    'loggedInUser', id
)
                navigation.navigate('Start');
            } else {
            
                

                console.log("login failed");
            }
                
        }
    };
    





    
    
    return (    
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <View style={styles.butt}>
            <Button title="Login" onPress={handleLogin} />
            <Button title="Sign up here" onPress={() => navigation.navigate('Signup')} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
      
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
        
    },
    butt:{
        alignItems:'center'
    }
});

export default LoginScreen
