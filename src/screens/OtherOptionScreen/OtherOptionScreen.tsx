import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { NavigationContext } from "react-navigation";
import { Entypo } from "@expo/vector-icons";

export default function OtherOptionScreen() {
  const navigation = React.useContext(NavigationContext);
  const modules = navigation.getParam("modules");
  const token = navigation.getParam("token");

  return (
    <View style={styles.container}>
      <Text style={styles.label}>¡En construcción!</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Home", { modules: modules, token: token });
        }}
      >
        <Entypo name="home" size={40} color="#06316F" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  label: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#071C39",
  },
});
