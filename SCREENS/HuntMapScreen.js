// import React, { useState } from 'react';
// import { View, Button, StyleSheet } from 'react-native';
// import MapViewComponent from '../COMPONENTS/MapView';
// import axios from "axios"

// const HuntMapScreen = ({ navigation, route }) => {
//     const { title, estimatedTime, invitedFriends } = route.params;
//     const [selectedLocations, setSelectedLocations] = useState([]);
   

//     const handleMarkerPress = (coordinate) => {
//         setSelectedLocations([...selectedLocations, coordinate]);
//     };

//     const handleCreateHunt = async () => {
//         try {

//             setTimeout(async () => {
//             const response = await axios.post('https://historyhunt-12cfa-default-rtdb.firebaseio.com/hunts.json', {
//                 invitedFriends,
//                 locations: selectedLocations,
//                 title,
//                 estimatedTime,
//             });
//             }, 1000);

//             // const huntId = response.data.name;

//             // for (const email of invitedFriends) {
//             //     await axios.post(`https://historyhunt-12cfa-default-rtdb.firebaseio.com/activeHunts/${email}.json`, {
//             //         huntId,
//             //         title,
//             //     });
//             // }

//             navigation.navigate('Start');
//         } catch (error) {
//             console.error('Error creating hunt:', error);
//         }
//     };







//     return (
//         <View style={styles.container}>
//             <Button title="History Hunt" onPress={handleCreateHunt} />
//             <MapViewComponent markers={[]} onMarkerPress={handleMarkerPress} />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//     },
// });

// export default HuntMapScreen;











// import React, { useState } from 'react';
// import { View, Button, StyleSheet } from 'react-native';
// import MapViewComponent from '../COMPONENTS/MapView';
// import axios from 'axios';

// const HuntMapScreen = ({ navigation, route }) => {
//     const { title, estimatedTime, invitedFriends } = route.params;
//     const [selectedLocations, setSelectedLocations] = useState([]);

//     const handleMarkerPress = (coordinate) => {
//         // Sätt första marker som startpunkt och sista som slutpunkt
//         setSelectedLocations([...selectedLocations, coordinate]);
//     };

//     const handleCreateHunt = async () => {
//         try {
//             setTimeout(async () => {
//                 const response = await axios.post('https://historyhunt-12cfa-default-rtdb.firebaseio.com/hunts.json', {
//                     invitedFriends,
//                     locations: selectedLocations,
//                     title,
//                     estimatedTime,
//                 });

//                 // Kod för att lägga till hunt i activeHunts för inbjudna vänner
//                 const huntId = response.data.name;

//                 for (const email of invitedFriends) {
//                     const safeEmail = email.replace('.', ',', '@');
//                     await axios.post(`https://historyhunt-12cfa-default-rtdb.firebaseio.com/activeHunts/${safeEmail}.json`, {
//                         huntId,
//                         title,
//                     });
//                 }

//                 navigation.navigate('Start');
//             }, 1000);
//         } catch (error) {
//             console.error('Error creating hunt:', error);
//         }
//     };

//     return (
//         <View style={styles.container}>
//             <Button title="History Hunt" onPress={handleCreateHunt} />
//             <MapViewComponent markers={selectedLocations} onMarkerPress={handleMarkerPress} />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//     },
// });

// export default HuntMapScreen;




























// import React, { useState } from 'react';
// import { View, Button, StyleSheet } from 'react-native';
// import MapViewComponent from '../COMPONENTS/MapView';
// import axios from 'axios';

// const HuntMapScreen = ({ navigation, route }) => {
//     const { title, estimatedTime, invitedFriends } = route.params;
//     const [selectedLocations, setSelectedLocations] = useState([]);
//     const [startLocation, setStartLocation] = useState(null);
//     const [endLocation, setEndLocation] = useState(null);

//     const handleMarkerPress = (coordinate) => {
//         if (!startLocation) {
//             // Sätt första marker som startpunkt
//             setStartLocation(coordinate);
//         } else if (startLocation && !endLocation) {
//             // Sätt andra marker som slutpunkt
//             setEndLocation(coordinate);
//         } else {
//             // Övriga markers som vanliga locations
//             setSelectedLocations([...selectedLocations, coordinate]);
//         }
//     };

//     const handleCreateHunt = async () => {
//         try {
//             if (!startLocation || !endLocation) {
//                 alert("Please set both start and end points!");
//                 return;
//             }

//             const response = await axios.post('https://historyhunt-12cfa-default-rtdb.firebaseio.com/hunts.json', {
//                 invitedFriends,
//                 title,
//                 estimatedTime,
//                 startLocation,
//                 endLocation,
//                 locations: selectedLocations,
//             });

//             const huntId = response.data.name;

//             for (const email of invitedFriends) {
//                 const safeEmail = email.replace('.', ',', '@');
//                 await axios.post(`https://historyhunt-12cfa-default-rtdb.firebaseio.com/activeHunts/${safeEmail}.json`, {
//                     huntId,
//                     title,
//                 });
//             }

//             navigation.navigate('Start');
//         } catch (error) {
//             console.error('Error creating hunt:', error);
//         }
//     };

//     return (
//         <View style={styles.container}>
//             <Button title="History Hunt" onPress={handleCreateHunt} />
//             <MapViewComponent
//                 markers={selectedLocations}
//                 startLocation={startLocation}
//                 endLocation={endLocation}
//                 onMarkerPress={handleMarkerPress}
//             />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//     },
// });

// export default HuntMapScreen;

















import React, { useState } from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import MapViewComponent from '../COMPONENTS/MapView';
import axios from 'axios';

const HuntMapScreen = ({ navigation, route }) => {
    const { title, estimatedTime, invitedFriends } = route.params;
    const [selectedLocations, setSelectedLocations] = useState([]);
    const [startLocation, setStartLocation] = useState(null);
    const [endLocation, setEndLocation] = useState(null);
    const [currentStep, setCurrentStep] = useState('start'); // start, end, markers

    const handleMarkerPress = (coordinate) => {
        if (currentStep === 'start') {
            setStartLocation(coordinate);
            setCurrentStep('end');
        } else if (currentStep === 'end') {
            setEndLocation(coordinate);
            setCurrentStep('markers');
        } else if (currentStep === 'markers') {
            setSelectedLocations([...selectedLocations, coordinate]);
        }
    };

    const handleCreateHunt = async () => {
        if (!startLocation || !endLocation) {
            alert('Please set both a start and end point before proceeding.');
            return;
        }

        try {
            const response = await axios.post('https://historyhunt-12cfa-default-rtdb.firebaseio.com/hunts.json', {
                title,
                estimatedTime,
                invitedFriends,
                // startLocation,
                // endLocation,
                locations: {startLocation, endLocation, selectedLocations},
            });

        

            navigation.navigate('Start');
        } catch (error) {
            console.error('Error creating hunt:', error);
        }
    };

    return (
        <View style={styles.container}>
             <Button title="Create History Hunt" onPress={handleCreateHunt} />
            <Text>
                {currentStep === 'start'
                    ? 'Tap to set the Start Point'
                    : currentStep === 'end'
                    ? 'Tap to set the End Point'
                    : 'Tap to add additional markers'}
            </Text>
            <MapViewComponent
                markers={selectedLocations}
                startLocation={startLocation}
                endLocation={endLocation}
                onMarkerPress={handleMarkerPress}
            />
           
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
});

export default HuntMapScreen;
