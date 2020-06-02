import React, { useContext, useState, useRef, useEffect } from "react";
import { View } from "react-native";
import { NavigationContext } from "react-navigation";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Entypo } from "@expo/vector-icons";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { GeolocationData } from "../../../typings/types";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { Platform } from "react-native";
import Constants from "expo-constants";

const DEFAULT_CENTER = { lat: 4.6357418, lng: -74.1894268 };

export default function MapScreen() {
  const [location, setLocation] = useState<GeolocationData>(DEFAULT_CENTER);

  const navigation = useContext(NavigationContext);
  const modules = navigation.getParam("modules");
  const token = navigation.getParam("token");

  const deviceLocationRef = useRef<Location.LocationData>();

  useEffect(() => {
    async function getLocation(
      deviceLocationRef: React.MutableRefObject<
        Location.LocationData | undefined
      >
    ) {
      if (Platform.OS === "android" && !Constants.isDevice) return; //Exit early if its an android emulator

      const { status } = await Permissions.getAsync(Permissions.LOCATION);
      if (status !== "granted") return;

      const deviceLocation = await Location.getCurrentPositionAsync({});
      setLocation({
        lat: deviceLocation.coords.latitude,
        lng: deviceLocation.coords.longitude,
      });
      deviceLocationRef.current = deviceLocation;
    }
    getLocation(deviceLocationRef);
  }, [deviceLocationRef]);

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          height: heightPercentageToDP(10),
          justifyContent: "center",
          backgroundColor: "#17273E",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Devices", { modules: modules, token: token });
          }}
        >
          <Entypo name="chevron-left" size={40} color="white" />
        </TouchableOpacity>
      </View>

      <MapView
        provider={PROVIDER_DEFAULT}
        scrollEnabled={true}
        style={{
          width: widthPercentageToDP(100),
          height: heightPercentageToDP(100),
        }}
        initialRegion={{
          latitude: location.lat,
          longitude: location.lng,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{
            latitude: location.lat,
            longitude: location.lng,
          }}
        />
      </MapView>
    </View>
  );
}
