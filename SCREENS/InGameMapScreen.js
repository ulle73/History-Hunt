import React, { useState } from "react";
import {
  View,
  Button,
  StyleSheet,
  Text,
  Image,
  Alert,
  ScrollView,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";

const GOOGLE_MAPS_APIKEY = "YOUR_GOOGLE_MAPS_API_KEY";

function InGameMapScreen({ route, navigation }) {
  const { hunt } = route.params;
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [photos, setPhotos] = useState([]);

  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions();

  const handleMarkerPress = (location, index) => {
    setSelectedMarker(location);
    setCurrentIndex(index);
  };

  const verifyPermissions = async () => {
    if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }

    if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions!",
        "You need to grant camera permissions to use this app."
      );
      return false;
    }

    return true;
  };

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }

    const result = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    if (!result.canceled) {
      setPhotos([...photos, result.assets[0].uri]);
      if (currentIndex + 1 === hunt.locations.selectedLocations.length) {
        navigation.navigate("Start");
        // Remove hunt from active hunts and move to medals
      } else {
        setSelectedMarker(null);
      }
    }
  };

  return (
    <ScrollView style={styles.form}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: hunt.locations.startLocation.latitude,
          longitude: hunt.locations.startLocation.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {hunt.locations.selectedLocations.map((location, index) => (
          <Marker
            key={index}
            coordinate={location}
            title={`Location ${index + 1}`}
            onPress={() => handleMarkerPress(location, index)}
          />
        ))}

        {selectedMarker && (
          <MapViewDirections
            origin={hunt.locations.startLocation}
            destination={selectedMarker}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={5}
            strokeColor="blue"
          />
        )}
      </MapView>

      {selectedMarker && (
        <View style={styles.actions}>
          <Button title="Take Photo" onPress={takeImageHandler} />
          <Text>
            {photos.length}/{hunt.locations.selectedLocations.length} locations
            visited
          </Text>
          {photos.map((photo, index) => (
            <Image
              key={index}
              source={{ uri: photo }}
              style={styles.previewImage}
            />
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  map: {
    width: "100%",
    height: 400,
    marginVertical: 16,
  },
  actions: {
    marginVertical: 16,
    alignItems: "center",
  },
  previewImage: {
    width: "100%",
    height: 200,
    marginTop: 16,
  },
});

export default InGameMapScreen;
