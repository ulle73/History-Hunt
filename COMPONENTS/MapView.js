// import React, { useState, useEffect } from "react";
// import MapView, { Marker } from "react-native-maps";
// import { StyleSheet, Dimensions } from "react-native";
// import * as Location from "expo-location";

// const MapViewComponent = ({ markers, onMarkerPress }) => {
//   const [selectedMarkers, setSelectedMarkers] = useState(markers);
//   const [region, setRegion] = useState(null);

//   useEffect(() => {
//     (async () => {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== "granted") {
//         console.log("Permission to access location was denied");
//         return;
//       }

//       let location = await Location.getCurrentPositionAsync({});
//       setRegion({
//         latitude: location.coords.latitude,
//         longitude: location.coords.longitude,
//         latitudeDelta: 0.0922,
//         longitudeDelta: 0.0421,
//       });
//     })();
//   }, []);

//   const handleMapPress = (e) => {
//     const newMarker = {
//       coordinate: e.nativeEvent.coordinate,
//     };
//     setSelectedMarkers([...selectedMarkers, newMarker]);
//     onMarkerPress(newMarker.coordinate);
//   };

//   return (
//     <MapView
//       style={styles.map}
//       onPress={handleMapPress}
//       region={region}
//       showsUserLocation={true} // För att visa användarens nuvarande position på kartan
//     >
//       {selectedMarkers.map((marker, index) => (
//         <Marker key={index} coordinate={marker.coordinate} />
//       ))}
//     </MapView>
//   );
// };

// const styles = StyleSheet.create({
//   map: {
//     width: Dimensions.get("window").width,
//     height: Dimensions.get("window").height,
//   },
// });

// export default MapViewComponent;







// import React from 'react';
// import MapView, { Marker } from 'react-native-maps';
// import { StyleSheet, Dimensions } from 'react-native';

// const MapViewComponent = ({ markers, onMarkerPress }) => {

//     const renderMarkers = () => {
//         return markers.map((marker, index) => {
//             let markerTitle = `Point ${index + 1}`;

//             // Definiera start- och slutpunkt
//             if (index === 0) {
//                 markerTitle = 'Start Point';
//             } else if (index === markers.length - 1) {
//                 markerTitle = 'End Point';
//             }

//             return <Marker key={index} coordinate={marker} title={markerTitle} />;
//         });
//     };

//     return (
//         <MapView
//             style={styles.map}
//             onPress={(e) => onMarkerPress(e.nativeEvent.coordinate)}
//             initialRegion={{
//                 latitude: 57.698, // Exempelkoordinat
//                 longitude: 11.956,
//                 latitudeDelta: 0.0922,
//                 longitudeDelta: 0.0421,
//             }}
//         >
//             {renderMarkers()}
//         </MapView>
//     );
// };

// const styles = StyleSheet.create({
//     map: {
//         width: Dimensions.get('window').width,
//         height: Dimensions.get('window').height,
//     },
// });

// export default MapViewComponent;
















// import React from 'react';
// import MapView, { Marker } from 'react-native-maps';
// import { StyleSheet, Dimensions } from 'react-native';

// const MapViewComponent = ({ markers, startLocation, endLocation, onMarkerPress }) => {

//     return (
//         <MapView
//             style={styles.map}
//             onPress={(e) => onMarkerPress(e.nativeEvent.coordinate)}
//             initialRegion={{
//                 latitude: 57.698,
//                 longitude: 11.956,
//                 latitudeDelta: 0.0922,
//                 longitudeDelta: 0.0421,
//             }}
//         >
//             {startLocation && (
//                 <Marker
//                     coordinate={startLocation}
//                     title="Start Point"
//                     pinColor="green"
//                 />
//             )}
//             {endLocation && (
//                 <Marker
//                     coordinate={endLocation}
//                     title="End Point"
//                     pinColor="red"
//                 />
//             )}
//             {markers.map((marker, index) => (
//                 <Marker key={index} coordinate={marker} title={`Point ${index + 1}`} />
//             ))}
//         </MapView>
//     );
// };

// const styles = StyleSheet.create({
//     map: {
//         width: Dimensions.get('window').width,
//         height: Dimensions.get('window').height,
//     },
// });

// export default MapViewComponent;










import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Dimensions } from 'react-native';

const MapViewComponent = ({ markers, startLocation, endLocation, onMarkerPress }) => {
    return (
        <MapView
            style={styles.map}
            onPress={(e) => onMarkerPress(e.nativeEvent.coordinate)}
            initialRegion={{
                latitude: 57.698,
                longitude: 11.956,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
        >
            {startLocation && (
                <Marker
                    coordinate={startLocation}
                    title="Start Point"
                    pinColor="green"
                />
            )}
            {endLocation && (
                <Marker
                    coordinate={endLocation}
                    title="End Point"
                    pinColor="blue"
                />
            )}
            {markers.map((marker, index) => (
                <Marker key={index} coordinate={marker} title={`Point ${index + 1}`} />
            ))}
        </MapView>
    );
};

const styles = StyleSheet.create({
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});

export default MapViewComponent;

