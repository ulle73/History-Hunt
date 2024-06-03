import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import InviteFriend from '../COMPONENTS/InviteFriend';

const InviteScreen = ({ navigation }) => {
    const handleInvite = (email) => {
        // Implement invite logic here
    };

    const handleFinish = () => {
        navigation.navigate('Start');
    };

    return (
        <View style={styles.container}>
            <InviteFriend onInvite={handleInvite} />
            <Button title="History Hunt" onPress={handleFinish} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
});

export default InviteScreen;
