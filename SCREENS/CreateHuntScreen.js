import React from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const CreateHuntScreen = ({ navigation }) => {
    const [title, setTitle] = React.useState('');
    const [estimatedTime, setEstimatedTime] = React.useState('');

    const handleCreateHunt = () => {
        // Implement create hunt logic here
        navigation.navigate('Invite');
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Hunt Title"
                value={title}
                onChangeText={setTitle}
            />
            <TextInput
                style={styles.input}
                placeholder="Estimated Time"
                value={estimatedTime}
                onChangeText={setEstimatedTime}
                keyboardType="numeric"
            />
            <Button title="Insert Image" onPress={() => {}} />
            <Button title="Continue" onPress={handleCreateHunt} />
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
});

export default CreateHuntScreen;
