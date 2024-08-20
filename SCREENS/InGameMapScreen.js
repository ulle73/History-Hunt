import React, { useState } from 'react';
import { Alert, View, Image, StyleSheet, Text, Button, ScrollView, TextInput } from "react-native";
import { launchCameraAsync, useCameraPermissions, PermissionStatus } from "expo-image-picker";
import * as MediaLibrary from 'expo-media-library';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

// Din Google Maps API-nyckel
const GOOGLE_MAPS_APIKEY = 'AIzaSyCjCPzxEsoRdmj2A5mX7YO_y_yd4H_tVEg'; 

// ImagePicker-komponenten
function ImagePicker({ onTakeImage }) {
    const [pickedImage, setPickedImage] = useState();
    const [cameraPermissionInformation, requestCameraPermission] = useCameraPermissions();
    const [mediaPermissionInformation, requestMediaPermission] = MediaLibrary.usePermissions();

    async function verifyPermissions() {
        // Kontrollera kamerabehörigheter
        if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestCameraPermission();
            if (!permissionResponse.granted) {
                Alert.alert(
                    'Insufficient Permissions!',
                    'You need to grant camera permissions to use this app.'
                );
                return false;
            }
        }
        if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
            Alert.alert(
                'Insufficient Permissions!',
                'You need to grant camera permissions to use this app.'
            );
            return false;
        }

        // Kontrollera media bibliotek behörigheter
        if (mediaPermissionInformation.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestMediaPermission();
            if (!permissionResponse.granted) {
                Alert.alert(
                    'Insufficient Permissions!',
                    'You need to grant media library permissions to save photos.'
                );
                return false;
            }
        }
        if (mediaPermissionInformation.status === PermissionStatus.DENIED) {
            Alert.alert(
                'Insufficient Permissions!',
                'You need to grant media library permissions to save photos.'
            );
            return false;
        }

        return true;
    }

    async function takeImageHandler() {
        const hasPermission = await verifyPermissions();

        if (!hasPermission) {
            return;
        }

        const result = await launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5,
            saveToPhotos: true
        });

        if (!result.canceled) {
            const imageUri = result.assets[0].uri; // Hämta URI från första objektet i assets-arrayen
            setPickedImage(imageUri);
            onTakeImage(imageUri);

            // Spara bilden till media library
            try {
                const asset = await MediaLibrary.createAssetAsync(imageUri);
                console.log('Image saved to media library:', asset);
            } catch (error) {
                console.error('Error saving image to media library:', error);
            }
        }
    }

    let imagePreview = <Text>No image taken.</Text>;

    if (pickedImage) {
        imagePreview = <Image style={styles.image} source={{ uri: pickedImage }} />;
    }

    return (
        <View>
            <View style={styles.imagePreview}>
                {imagePreview}
            </View>
            <Button title="Take Image" onPress={takeImageHandler} />
        </View>
    );
}

// InGameMapScreen-komponenten
function InGameMapScreen({ route }) {
    const { hunt } = route.params;
    const [enteredTitle, setEnteredTitle] = useState('');
    const [selectedImage, setSelectedImage] = useState('');
    const [selectedMarker, setSelectedMarker] = useState(null);

    function changeTitleHandler(enteredText) {
        setEnteredTitle(enteredText);
    }

    function handleMarkerPress(location) {
        setSelectedMarker(location);
    }

    function handleTakeImage(imageUri) {
        setSelectedImage(imageUri);
    }

    return (
        <ScrollView style={styles.form}>
            <View>
                <Text style={styles.label}>Title</Text>
                <TextInput 
                    onChangeText={changeTitleHandler} 
                    value={enteredTitle} 
                    style={styles.input} 
                />
            </View>

            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: hunt.locations.startLocation.latitude,
                    longitude: hunt.locations.startLocation.longitude,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05,
                }}
            >
                {/* Markör för startplats */}
                <Marker
                    coordinate={hunt.locations.startLocation}
                    title="Start"
                    pinColor="green"
                    onPress={() => handleMarkerPress(hunt.locations.startLocation)}
                />
                
                {/* Markör för slutplats */}
                <Marker
                    coordinate={hunt.locations.endLocation}
                    title="End"
                    pinColor="red"
                    onPress={() => handleMarkerPress(hunt.locations.endLocation)}
                />

                {/* Markörer för andra platser */}
                {hunt.locations.selectedLocations.map((location, index) => (
                    <Marker
                        key={index}
                        coordinate={location}
                        title={`Point ${index + 1}`}
                        onPress={() => handleMarkerPress(location)}
                    />
                ))}

                {/* Rutt */}
                {selectedMarker && (
                    <MapViewDirections
                        origin={hunt.locations.startLocation}
                        destination={selectedMarker}
                        apikey={GOOGLE_MAPS_APIKEY}
                        strokeWidth={5}
                        strokeColor="blue"
                    />
                )}
            </MapView>

            {/* Lägg till ImagePicker-komponenten */}
            <ImagePicker onTakeImage={handleTakeImage} />

            {/* Visa vald bild om det finns en */}
            {selectedImage ? (
                <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
            ) : (
                <Text>No image selected.</Text>
            )}

            <Button title="Add Place" onPress={() => {}} />
        </ScrollView>
    );
}

export default InGameMapScreen;

const styles = StyleSheet.create({
    form: {
        flex: 1,
        padding: 24
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 4,
        color: '#333',
    },
    input: {
        marginVertical: 8,
        paddingHorizontal: 4,
        paddingVertical: 8,
        fontSize: 16,
        borderBottomWidth: 2,
        borderBottomColor: '#ccc',
        color: '#333',
    },
    imagePreview: {
        width: '100%',
        height: 200,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        borderRadius: 4,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    map: {
        width: '100%',
        height: 400,
        marginVertical: 16,
    },
    selectedImage: {
        width: '100%',
        height: 200,
        marginVertical: 8,
    },
});
