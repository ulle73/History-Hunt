import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Card = ({ children }) => (
    <View style={styles.card}>
        {children}
    </View>
);

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#ffffff',
        padding: 20,
        margin: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
    },
});

export default Card;
