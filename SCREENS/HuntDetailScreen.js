import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const HuntDetailScreen = ({ navigation, route }) => {
    const { huntId } = route.params;

    return (
        <View style={styles.container}>
            <Text>Hunt Details for {huntId}</Text>
            {/* Display hunt details here */}
            <Button title="Start Hunt" onPress={() => navigation.navigate('HuntMap')} />
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

export default HuntDetailScreen;
