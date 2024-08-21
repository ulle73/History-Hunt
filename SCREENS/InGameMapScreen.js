import React, { useState, useEffect } from "react";
import {
    View,
    Button,
    StyleSheet,
    Text,
    Image,
    Alert,
    ScrollView,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import {
    launchCameraAsync,
    useCameraPermissions,
    PermissionStatus,
} from "expo-image-picker";
import axios from "axios"
import * as MediaLibrary from 'expo-media-library';

const GOOGLE_MAPS_APIKEY = "AIzaSyCjCPzxEsoRdmj2A5mX7YO_y_yd4H_tVEg";



function ImagePicker({ onTakeImage }) {
    const [pickedImage, setPickedImage] = useState();
    const [cameraPermissionInformation, requestCameraPermission] = useCameraPermissions();
    const [mediaPermissionInformation, requestMediaPermission] = MediaLibrary.usePermissions();

    async function verifyPermissions() {
        // Kolla kamerabehörigheter
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

        // Kolla media bibliotek behörigheter
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


function InGameMapScreen({ route, navigation }) {
    const { hunt, setActiveHunts, setPlannedHunts, setCompletedHunts, completedHunts, activeHunts, plannedHunts } = route.params;
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    //   const [activeHunts, setActiveHunts] = useState([]);
    //   const [medals, setMedals] = useState([]);
    const [photos, setPhotos] = useState([]);

    const [cameraPermissionInformation, requestPermission] =
        useCameraPermissions();


    const [mediaPermissionInformation, requestMediaPermission] = MediaLibrary.usePermissions();

    const handleMarkerPress = (location, index) => {
        setSelectedMarker(location);
        // setCurrentIndex(index);
    };

    const verifyPermissions = async () => {
        if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermission();
            return permissionResponse.granted;
        }

        if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
            Alert.alert(
                "Insufficient Permissions!",
                "You need to grant camera permissions to use this app."
            );
            return false;
        }

        // return true;
        // Kolla media bibliotek behörigheter
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


const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
        return;
    }

    const result = await launchCameraAsync({
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0.5,
    });

    if (!result.canceled) {
        const newPhoto = result.assets[0].uri;
        setPhotos([...photos, newPhoto]);

        try {
            const asset = await MediaLibrary.createAssetAsync(newPhoto);
            console.log('Image saved to media library:', asset);
        } catch (error) {
            console.error('Error saving image to media library:', error);
        }

        setCurrentIndex((prevIndex) => {
            const newIndex = prevIndex + 1;
            console.log("prev index", prevIndex)
            console.log(`New Current Index: ${newIndex}`);

            if (newIndex === hunt.locations.selectedLocations.length + 1) {
                // När alla platser har besökts och fotograferats, avsluta jakten
                finishHunt();
            }

            return newIndex;
        });
    }
};

const finishHunt = () => {
    console.log("Finishing hunt...");

    // Flytta jakten från activeHunts till completedHunts
    removeHuntFromActive();
    addHuntToCompleted(hunt);

    // Navigera tillbaka till Start-skärmen
    navigation.navigate("Start", { setActiveHunts, setCompletedHunts });
};


const removeHuntFromActive = () => {
    console.log("Removing hunt from active...");
    const updatedActiveHunts = activeHunts.filter((h) => h.id !== hunt.id);
    setActiveHunts(updatedActiveHunts);
    console.log("Updated active hunts: ", updatedActiveHunts);
};

const addHuntToCompleted = (completedHunt) => {
    console.log("Adding hunt to completed...");
    
    // Inkludera bilderna i det slutförda hunt-objektet
    const huntWithPhotos = { ...completedHunt, photos };
    
    setCompletedHunts([...completedHunts, huntWithPhotos]);
    console.log("Updated completed hunts: ", [...completedHunts, huntWithPhotos]);
};


const addHuntToMedals = (completedHunt) => {
    console.log("Adding hunt to medals...");
    setCompletedHunts([...completedHunts, completedHunt]);
    console.log("Updated medals: ", [...completedHunts, completedHunt]);
};

useEffect(() => {
    // Testa att useEffect triggas
    console.log('useEffect Triggered');
    console.log('Current Index:', currentIndex);
    console.log('Selected Locations Length:', hunt.locations.selectedLocations.length);

    if (
        currentIndex > 0 &&
        currentIndex === hunt.locations.selectedLocations.length + 1
    ) {
        // När alla platser har besökts och fotograferats, avsluta jakten
        finishHunt();
    }
}, [currentIndex, hunt, navigation]);



return (
    <ScrollView style={styles.form}>
        <MapView
            style={styles.map}
            initialRegion={{
                latitude: hunt.locations.startLocation.latitude,
                longitude: hunt.locations.startLocation.longitude,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
            }}
            showsUserLocation={true}
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
                pinColor="blue"
                onPress={() => handleMarkerPress(hunt.locations.endLocation)}
            />

            {/* Markörer för andra platser */}
            {hunt.locations.selectedLocations.map((location, index) => (
                <Marker
                    key={index}
                    coordinate={location}
                    title={`Location ${index + 1}`}
                    onPress={() => handleMarkerPress(location, index)}
                />
            ))}

            {/* Rutt mellan startplats och vald plats */}
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

        {selectedMarker && (
            <View style={styles.actions}>
                <Button title="Take Photo" onPress={takeImageHandler} />
                <Text>
                    {photos.length}/{hunt.locations.selectedLocations.length + 1}{" "}
                    locations visited
                </Text>
                {photos.map((photo, index) => (
                    <Image
                        key={index}
                        source={{ uri: photo }}
                        style={styles.previewImage}
                    />
                ))}
            </View>
        )}
    </ScrollView>
);
}

const styles = StyleSheet.create({
    form: {
        flex: 1,
        padding: 24,
    },
    map: {
        width: "100%",
        height: 400,
        marginVertical: 16,
    },
    actions: {
        marginVertical: 16,
        alignItems: "center",
    },
    previewImage: {
        width: "100%",
        height: 200,
        marginTop: 16,
    },
});

export default InGameMapScreen;
