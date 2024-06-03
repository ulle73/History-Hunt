import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const UserAvatar = ({ uri, onImagePicked }) => {
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            onImagePicked(result.uri);
        }
    };

    return (
        <TouchableOpacity onPress={pickImage}>
            <View style={styles.avatarContainer}>
                <Image source={{ uri }} style={styles.avatar} />
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    avatarContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ccc',
    },
    avatar: {
        width: '100%',
        height: '100%',
    },
});

export default UserAvatar;
