import { Platform } from "react-native";
import { PERMISSIONS, RESULTS, request } from "react-native-permissions";

export async function getLocationPermissions() {
    const granted = await request(
      Platform.select({
        android: PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
        ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      }),
      {
        title: 'Location Permission',
        message: 'This app needs access to your location to show it on the map.',
      },
    );
  
    return granted === RESULTS.GRANTED;
  }
  