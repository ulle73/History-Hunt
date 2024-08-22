import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HuntItem = ({ title }) => (
    <View style={styles.huntItem}>
        <Text style={styles.title}>{title}</Text>
    </View>
);

const styles = StyleSheet.create({
    huntItem: {
        padding: 15,
        
    },
    title: {
        fontSize: 14,
        fontWeight: '600'
        
    },
});

export default HuntItem;
