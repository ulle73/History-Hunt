import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Button = ({ onPress, title }) => (
    <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    button: {
        width: '80%',
        height: 50,
        backgroundColor: '#6A5ACD', // Lila bakgrundsfärg
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25, // Rundade hörn på knappen
        marginTop: 24,
    },
    text: {
        color: '#ffffff',
        fontSize: 16,
    },
});

export default Button;
