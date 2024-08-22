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
        width: 150,
        height: 150,
        borderRadius: 75,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ccc',
        borderWidth: 5,               // Borderns tjocklek
        borderColor: '#ee00ee7e'
      
      
    },
    avatar: {
        width: 150,
        height: 150,
        borderRadius: 75,
        
       
     
    },
});

export default UserAvatar;
