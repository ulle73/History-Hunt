import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const InviteFriend = ({ onInvite }) => {
    const [email, setEmail] = React.useState('');

    const handleInvite = () => {
        onInvite(email);
        setEmail('');
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Enter friend's email"
                value={email}
                onChangeText={setEmail}
                onSubmitEditing={handleInvite}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 10,
    },
    input: {
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        padding: 5,
    },
});

export default InviteFriend;
