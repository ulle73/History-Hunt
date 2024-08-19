import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const HuntDetailScreen = ({ navigation, route }) => {
    const { hunt } = route.params;

    return (
        <View style={styles.container}>
            <Text>Hunt Details for {hunt.id}</Text>
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
