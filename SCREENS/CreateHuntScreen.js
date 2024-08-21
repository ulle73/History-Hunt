import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Image, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import {  ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage} from "../firebase/firebaseConfig"


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
            <Text style={styles.label}>Titel på Hunt</Text>
            <TextInput
                style={styles.input}
                placeholder="Ange titel för hunt"
                value={title}
                onChangeText={setTitle}
            />
            <Text style={styles.label}>Beräknad tid</Text>
            <TextInput
                style={styles.input}
                placeholder="Ange beräknad tid"
                value={estimatedTime}
                onChangeText={setEstimatedTime}
                keyboardType="numeric"
            />
            <Button title="Välj bild" onPress={handleImagePicked} />
            {image && (
                <>
                    <Text style={styles.label}>Vald bild:</Text>
                    <Image source={{ uri: image }} style={styles.imagePreview} />
                </>
            )}
            <Button title="Fortsätt" onPress={handleCreateHunt} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        fontWeight: 'bold',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
    },
    imagePreview: {
        width: '100%',
        height: 200,
        marginTop: 10,
    },
});

export default CreateHuntScreen;
