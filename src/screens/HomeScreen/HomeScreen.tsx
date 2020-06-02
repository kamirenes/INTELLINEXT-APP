import React, { useState, useContext } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from "react-native-responsive-screen";
import { Entypo } from "@expo/vector-icons";
import { Dialog } from "react-native-simple-dialogs";
import { NavigationContext } from "react-navigation";

export default function HomeScreen() {
  //hooks
  const [menuVisible, setMenuVisible] = useState(false);
  const navigation = useContext(NavigationContext);

  const modules = navigation.getParam("modules");
  const token = navigation.getParam("token");
  return (
    <View style={styles.container}>
      <Dialog
        visible={menuVisible}
        onTouchOutside={() => {
          setMenuVisible(false);
        }}
      >
        <View
          style={{
            justifyContent: "space-between",
            height: heightPercentageToDP(30),
          }}
        >
          {modules &&
            modules.map((item: any, key: number) => (
              <View key={key}>
                {item.key == "Configurations" ? (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("Devices", {
                        modules: modules,
                        token: token,
                      });
                    }}
                  >
                    <Text style={styles.menuLabel}>{item.key}</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("OtherOption", {
                        modules: modules,
                        token: token,
                      });
                    }}
                  >
                    <Text style={styles.menuLabel}>{item.key}</Text>
                  </TouchableOpacity>
                )}
              </View>
            ))}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SignIn");
            }}
          >
            <Text style={styles.menuLabel}>Cerrar Sesión</Text>
          </TouchableOpacity>
        </View>
      </Dialog>
      <View style={styles.menu}>
        <TouchableOpacity
          onPress={() => {
            setMenuVisible(true);
          }}
        >
          <Entypo name="menu" size={40} color="#06316F" />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>BIENVENID@</Text>
        <Image
          style={styles.image}
          source={require("./assets/tech-image.jpg")}
        />
        <Text style={styles.label}>
          Ahora haces parte del TEAM del cambio, ayudanos a crecer y transformar
          el mundo.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#071C39",
  },
  image: {
    marginTop: 50,
    height: 100,
    width: 100,
  },
  label: {
    paddingHorizontal: 50,
    marginTop: 50,
    textAlign: "center",
    fontWeight: "600",
    color: "#17273E",
  },
  menu: {
    marginTop: widthPercentageToDP(8),
    marginLeft: 10,
    justifyContent: "flex-start",
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
  },
  menuLabel: {
    fontSize: 20,
    fontWeight: "500",
    color: "#071C39",
  },
});
