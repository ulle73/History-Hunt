import React from "react";
import { View, Text, Button, StyleSheet, FlatList } from "react-native";

const HuntConfirmationScreen = ({ navigation, route }) => {
  const { hunt } = route.params;

  const handleConfirm = () => {
    navigation.navigate("InGame", { hunt });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Confirm Hunt</Text>
      <FlatList
        data={hunt.locations.selectedLocations}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <Text style={styles.locationText}>
            Location {index + 1}: {item.latitude}, {item.longitude}
          </Text>
        )}
      />
      <Button title="Confirm" onPress={handleConfirm} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  locationText: {
    fontSize: 16,
    marginBottom: 8,
  },
});

export default HuntConfirmationScreen;
