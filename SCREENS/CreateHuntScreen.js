import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Alert, Image, Text, TouchableOpacity  } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import {  ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage} from "../firebase/firebaseConfig"
import Button from '../COMPONENTS/Button'


const CreateHuntScreen = ({ navigation }) => {
    const [title, setTitle] = useState('');
    const [estimatedTime, setEstimatedTime] = useState('');
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState('');

    const handleImagePicked = async () => {
        try {
            // Begär åtkomst till användarens mediebibliotek
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Tyvärr behöver vi behörighet till kamerarullen för att detta ska fungera!');
                return;
            }

            // Öppna mediebiblioteket och låt användaren välja en bild
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            if (!result.canceled) {
                const uri = result.assets[0].uri;
                setImage(uri);
            }
        } catch (error) {
            console.error('Fel vid val av bild:', error);
        }
    };

    const uploadImageToFirebase = async () => {
        if (!image) return null;

        try {
            // Konfigurera Firebase Storage
            // const storage = getStorage();
            const response = await fetch(image);
            const blob = await response.blob();

            // Skapa ett unikt filnamn baserat på titeln och tiden
            const filename = `${title}_${new Date().getTime()}.jpg`;
            const storageRef = ref(storage, `hunts/${filename}`);
            await uploadBytes(storageRef, blob);

            // Hämta URL för den uppladdade bilden

            console.log("HÄR 1")
            const downloadUrl = await getDownloadURL(storageRef);
            console.log("HÄR 2")
            setImageUrl(downloadUrl);
            console.log("HÄR 3")
            return downloadUrl;
        } catch (error) {
            console.error('Fel vid uppladdning av bild:', error);
            return null;
        }
    };

    const handleCreateHunt = async () => {
        if (title && estimatedTime) {
            // Ladda upp bilden till Firebase och få URL
            const uploadedImageUrl = await uploadImageToFirebase();
            console.log("Bild uppladdad till:", uploadedImageUrl);

            if (!uploadedImageUrl) {
                alert('Det gick inte att ladda upp bilden. Försök igen.');
                return;
            }

            try {
                const huntData = {
                    title: title,
                    estimatedTime: estimatedTime,
                    image: uploadedImageUrl, // Spara bildens URL i databasen
                };

                console.log("Hunt-data:", huntData);

                // Skicka hunt-data till Firebase Realtime Database
                 //await axios.post('https://historyhunt-12cfa-default-rtdb.firebaseio.com/hunts.json', huntData);

                // Navigera till Invite-skärmen och skicka med hunt-data
                console.log("kommer du hit? 1")
                navigation.navigate('Invite', {
                    title: title,
                    estimatedTime: estimatedTime,
                    image: uploadedImageUrl,
                });
                console.log("kommer du hit? 2")
            } catch (error) {
                console.error('Fel vid skapande av hunt:', error);
                alert('Det gick inte att skapa hunt. Försök igen.');
            }
        } else {
            alert('Fyll i alla fält.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Customize Hunt</Text>

            <Text style={styles.subtitle}>Duration of the hunt</Text>
            <TextInput
                style={styles.input}
                placeholder="3 hours? 2 days?"
                value={estimatedTime}
                onChangeText={setEstimatedTime}
                keyboardType="numeric"
            />

            <Text style={styles.subtitle}>Name of the hunt</Text>
            <TextInput
                style={styles.input}
                placeholder="Name"
                value={title}
                onChangeText={setTitle}
            />

            <TouchableOpacity style={styles.imagePicker} onPress={handleImagePicked}>
                {image ? (
                    <Image source={{ uri: image }} style={styles.imagePreview} />
                ) : (
                    <Text style={styles.imagePlaceholderText}>insert image</Text>
                )}
            </TouchableOpacity>

            <Button title="Continue" onPress={handleCreateHunt} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 18,
        color: '#a65fec',
       
        marginBottom: 8,
        textAlign: 'center',
        alignItems: 'center'
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
        borderRadius: 8,
        textAlign: 'center',
    },
    imagePicker: {
        width: 200,
        height: 200,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 20,
    },
    imagePlaceholderText: {
        color: '#ff00ff',
    },
    imagePreview: {
        width: 200,
        height: 200,
        borderRadius: 100,
    },
});

export default CreateHuntScreen;
