import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const HuntConfirmationScreen = ({ navigation }) => {
    const handleConfirm = () => {
        // Implement confirm logic here
        navigation.navigate('HuntMap');
    };

    return (
        <View style={styles.container}>
            <Text>Hunt Confirmation</Text>
            {/* Add details about the hunt here */}
            <Button title="Confirm" onPress={handleConfirm} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
});

export default HuntConfirmationScreen;
