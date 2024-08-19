import React, { useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, Dimensions } from "react-native";
import * as Location from "expo-location";

const MapViewComponent = ({ markers, onMarkerPress }) => {
  const [selectedMarkers, setSelectedMarkers] = useState(markers);
  const [region, setRegion] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    })();
  }, []);

  const handleMapPress = (e) => {
    const newMarker = {
      coordinate: e.nativeEvent.coordinate,
    };
    setSelectedMarkers([...selectedMarkers, newMarker]);
    onMarkerPress(newMarker.coordinate);
  };

  return (
    <MapView
      style={styles.map}
      onPress={handleMapPress}
      region={region}
      showsUserLocation={true} // För att visa användarens nuvarande position på kartan
    >
      {selectedMarkers.map((marker, index) => (
        <Marker key={index} coordinate={marker.coordinate} />
      ))}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default MapViewComponent;
