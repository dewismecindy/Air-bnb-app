import { useWindowDimensions } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  Button,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import Constants from "expo-constants";
import { SafeAreaView } from "react-native-safe-area-context";
import logo from "../assets/logo.png";

export default function SignInScreen({ setToken }) {
  const { height } = useWindowDimensions();
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [failConnexion, setFailConnexion] = useState();
  const [missingEmail, setMissingEmail] = useState();
  const [missingPassword, setMissingPassword] = useState();

  // Sending connexion to back and redirect user
  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/log_in",
        {
          email,
          password,
        }
      );
      const userToken = response.data.token;
      setToken(userToken);
      await AsyncStorage.setItem("token", userToken);
      alert("Connexion réussie");
    } catch (error) {
      setFailConnexion(true);
      console.log(error.response);
      alert("Connexion ratée");
    }
  };

  return (
    <SafeAreaView>
      <KeyboardAwareScrollView>
        <View
          style={[
            styles.mainContainer,
            { height: height - Constants.statusBarHeight },
          ]}
        >
          <View>
            <Image source={logo} style={styles.splashLogo}></Image>
            <Text style={styles.pageTitle}>Sign in</Text>
          </View>

          <View style={styles.form}>
            <TextInput
              style={styles.textInput}
              placeholder="email"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
              }}
            />

            <TextInput
              style={styles.textInput}
              placeholder="password"
              value={password}
              secureTextEntry={true}
              onChangeText={(text) => {
                setPassword(text);
              }}
            />
          </View>

          <View>
            {missingEmail && <Text>Il faut un email valide !</Text>}
            {missingPassword && <Text>Il faut un mot de passe valide !</Text>}
            {failConnexion && <Text>identifiants incorrects</Text>}
            <TouchableOpacity
              style={styles.buttonView}
              onPress={async () => {
                if (email) {
                  if (password) {
                    handleSubmit();
                  } else {
                    setMissingPassword(true);
                  }
                } else {
                  setMissingEmail(true);
                }

                // const userToken = "secret-token";
                // setToken(userToken);
              }}
            >
              <Text style={[styles.greyText, styles.mediumSizeFont]}>
                Sign in
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate("SignUp");
              }}
            >
              <Text
                style={[
                  styles.centerText,
                  styles.greyText,
                  styles.smallTopMargin,
                ]}
              >
                Not account ? Register !
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    paddingVertical: 30,
    alignItems: "center",
    justifyContent: "space-around",
    // borderColor: "red",
    // borderWidth: 3,
  },

  splashLogo: {
    resizeMode: "contain",
    width: 200,
    height: 100,
    marginBottom: 20,
  },

  pageTitle: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    color: "grey",
  },

  form: {
    marginTop: 0,
    // borderColor: "blue",
    // borderWidth: 3,
  },

  textInput: {
    borderBottomWidth: 2,
    borderColor: "#ffbac0",
    width: 300,
    marginBottom: 50,
    padding: 5,
  },

  buttonView: {
    borderWidth: 2,
    height: 50,
    paddingHorizontal: 80,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "red",
    borderRadius: 50,
  },

  greyText: {
    color: "grey",
  },
  mediumSizeFont: {
    fontSize: 20,
  },

  centerText: {
    textAlign: "center",
  },

  smallTopMargin: {
    marginTop: 20,
  },
});
