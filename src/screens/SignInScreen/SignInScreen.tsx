import React, { useState, useContext } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { NavigationContext } from "react-navigation";
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from "react-native-responsive-screen";
import axios from "axios";

export default function SignInScreen() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [client, setClient] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);

  const navigation = useContext(NavigationContext);

  const baseUrl = "https://api.myintelli.net/v1/login";

  async function onSubmit(
    newUserName: string,
    newPassword: string,
    newClient: number
  ) {
    const response = await require(newUserName, newPassword, newClient);
    if (response) {
      const da = response.data;
      navigation.navigate("Home", {
        token: da.token,
        modules: da.modules,
        role: da.role,
      });
    }
  }

  async function require(
    newUserName: string,
    newPassword: string,
    newClient: number
  ) {
    try {
      const response = await axios({
        url: `${baseUrl}`,
        method: "post",
        params: {
          username: newUserName,
          password: newPassword,
          client: newClient,
        },
      });

      /*if (response.status === 200) {
        handlerUpdateStates(response)
        console.log("M")
        console.log(modules)
        navigation.navigate("Home",{token:token, module:modules, role:role});
      }*/
      return response;
    } catch (e) {
      console.log("error");
      console.log(e);
    }
  }

  /*function _isDisable(){
    console.log("entro")
    if (userName == "" || password == "" || client == ""){
      setIsDisabled(true)
    }
    else{
      setIsDisabled(false)
    }
  }*/

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Inicia sesión</Text>
      </View>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>Ingresa con tu usuario y contraseña</Text>
      </View>
      <View style={styles.formContainer}>
        <View>
          <TextInput
            value={userName}
            placeholder={"usuario"}
            style={styles.input}
            onChangeText={(userName) => {
              setUserName(userName); //_isDisable()
            }}
          />
          {userName == "" && (
            <Text style={styles.validationLabel}>
              El usuario es obligatorio*
            </Text>
          )}
        </View>
        <View>
          <TextInput
            value={password}
            placeholder={"contraseña"}
            style={styles.input}
            onChangeText={(password) => {
              setPassword(password); //_isDisable()
            }}
            secureTextEntry={true}
          />
          {password == "" && (
            <Text style={styles.validationLabel}>
              La contraseña es obligatorio*
            </Text>
          )}
        </View>
        <View>
          <TextInput
            value={client}
            placeholder={"Id del cliente"}
            style={styles.input}
            onChangeText={(client) => {
              setClient(client); //_isDisable()
            }}
            keyboardType="number-pad"
          />
          {client == "" && (
            <Text style={styles.validationLabel}>
              El ID del cliente es obligatorio*
            </Text>
          )}
        </View>
      </View>
      <View style={/*isDisabled? styles.disableButton : */ styles.button}>
        <TouchableOpacity
          //disabled={isDisabled}
          onPress={() => {
            onSubmit(userName, password, parseInt(client));
          }}
        >
          <Text style={styles.buttonLabel}>Ingresar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  titleContainer: {
    marginVertical: widthPercentageToDP(3),
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#071C39",
  },
  labelContainer: {
    marginTop: heightPercentageToDP(10),
  },
  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#17273E",
  },
  formContainer: {
    paddingVertical: heightPercentageToDP(5),
    height: heightPercentageToDP(35),
    justifyContent: "space-between",
  },
  input: {
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    height: 50,
    width: widthPercentageToDP(80),
  },
  button: {
    marginTop: widthPercentageToDP(10),
    backgroundColor: "#06316F",
    width: widthPercentageToDP(40),
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 30,
  },
  disableButton: {
    marginTop: widthPercentageToDP(20),
    backgroundColor: "#8DA0BD",
    width: widthPercentageToDP(40),
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 30,
  },
  buttonLabel: {
    color: "white",
    fontWeight: "500",
  },
  validationLabel: {
    color: "red",
    fontSize: 10,
  },
});
