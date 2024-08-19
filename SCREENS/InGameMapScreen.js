import React, { useState } from 'react';
import { Alert, View, Image, StyleSheet, Text, Button } from 'react-native';
import { launchCameraAsync, useCameraPermissions, PermissionStatus } from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';

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

const styles = StyleSheet.create({
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
    }
});

export default ImagePicker;
