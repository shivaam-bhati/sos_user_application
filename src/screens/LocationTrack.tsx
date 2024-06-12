import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, PermissionsAndroid } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { getLocationPermissions } from '../hooks/permissions';
import GetLocation from 'react-native-get-location';


const LocationTrack = () => {

  const [region, setRegion] = useState({
    latitude:26.85776654964965,
    longitude:75.77342916691464,
    latitudeDelta: 0.07,
    longitudeDelta: 0.07,
  });

  useEffect(() => {
    async function fetchData() {

      const permission = await getLocationPermissions();
      if (permission) {
        GetLocation.getCurrentPosition({
          enableHighAccuracy: true,
          timeout: 60000,
        })
          .then(location => {
            setRegion({
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            });
          })
          .catch(error => {
            const { code, message } = error;
            console.warn(code, message);
          })
      } else {
        alert('Location permission denied');
      }

    }
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
        <MapView
          style={styles.map}
          region={region}
          showsUserLocation
          followsUserLocation
        >
          <Marker coordinate={region}  />
        </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default LocationTrack;
