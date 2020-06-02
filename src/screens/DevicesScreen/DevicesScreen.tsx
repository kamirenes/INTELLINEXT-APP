import React, { useContext, useState, useEffect } from "react";
import { FlatList, Text, TextInput, View, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { NavigationContext } from "react-navigation";
import { Entypo } from "@expo/vector-icons";
import { Dialog } from "react-native-simple-dialogs";
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from "react-native-responsive-screen";
import axios from "axios";

const baseUrl = "https://api.myintelli.net/v1/2/devices";

async function getDevices(search: string, token: any) {
  try {
    const response = await axios({
      url: `${baseUrl}`,
      method: "GET",
      params: {
        limit: 5,
        offset: 0,
        search: search,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (e) {
    console.log(e);
  }
}

export default function DevicesScreen() {
  //hooks
  const [menuVisible, setMenuVisible] = useState(false);
  const [search, setSearch] = useState("");
  const [isRefecth, setIsRefetch] = useState(false);
  const [results, setResults] = useState({});

  const navigation = useContext(NavigationContext);
  const modules = navigation.getParam("modules");
  const token = navigation.getParam("token");

  useEffect(() => {
    async function loadDevices() {
      const response = await getDevices(search, token);
      if (response?.status === 200) {
        setResults(response.data);
      }
    }
    loadDevices();
  }, [search]);

  const devices = Object.values(results);

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

      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            setMenuVisible(true);
          }}
        >
          <Entypo name="menu" size={50} color="#06316F" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Map", { modules: modules, token: token });
          }}
        >
          <Entypo name="map" size={30} color="#06316F" />
        </TouchableOpacity>
        <TextInput
          style={styles.searchInput}
          value={search}
          placeholder="Buscar"
          onChangeText={(search) => setSearch(search)}
        />
      </View>
      <FlatList
        data={devices}
        refreshing={isRefecth}
        //onRefresh={}
        onEndReachedThreshold={0.5}
        //onEndReached={}
        renderItem={({ item }: { item: any }) => (
          <View>
            {item.results != undefined &&
              item.results.map((i: any, k: number) => (
                <View style={styles.deviceBox} key={k}>
                  <Text>{i.device_model}</Text>
                  <Text>{i.device_name}</Text>
                  <Text>{i.id_device}</Text>
                </View>
              ))}
          </View>
        )}
        //keyExtractor={}
        onMomentumScrollBegin={() => {
          setIsRefetch(true);
        }}
        ListEmptyComponent={() => {
          return (
            <View>
              <Text>Busqueda vacía</Text>
            </View>
          );
        }}
      />
      <View style={styles.searchButton}>
        <TouchableOpacity
          onPress={() => {
            setIsRefetch(true);
          }}
        >
          <Text style={{ color: "white" }}>BUSCAR MÁS</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.homeButton}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Home", { modules: modules, token: token });
          }}
        >
          <Entypo name="home" size={30} color="#06316F" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: widthPercentageToDP(90),
    marginTop: heightPercentageToDP(5),
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "gray",
    width: widthPercentageToDP(50),
    paddingHorizontal: 10,
  },
  deviceBox: {
    marginVertical: heightPercentageToDP(2),
    width: widthPercentageToDP(80),
    height: heightPercentageToDP(13),
    borderColor: "gray",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  searchButton: {
    alignItems: "center",
    backgroundColor: "#06316F",
    borderRadius: 30,
    paddingVertical: 5,
    width: widthPercentageToDP(40),
    marginVertical: widthPercentageToDP(5),
  },
  menuLabel: {
    fontSize: 20,
    fontWeight: "500",
    color: "#071C39",
  },
  homeButton: {},
});
