import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "./containers/HomeScreen";
import ProfileScreen from "./containers/ProfileScreen";
import SignInScreen from "./containers/SignInScreen";
import SignUpScreen from "./containers/SignUpScreen";
import SettingsScreen from "./containers/SettingsScreen";
import SplashScreen from "./containers/SplashScreen";
import { View, Text, Image } from "react-native";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  const setToken = async (token) => {
    if (token) {
      await AsyncStorage.setItem("userToken", token);
    } else {
      await AsyncStorage.removeItem("userToken");
    }

    setUserToken(token);
  };

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      // We should also handle error for production apps
      const userToken = await AsyncStorage.getItem("userToken");

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      setUserToken(userToken);

      setIsLoading(false);
    };

    bootstrapAsync();
  }, []);

  if (isLoading === true) {
    // We haven't finished checking for the token yet
    return null;
  }

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Tab1">
          {() => (
            <Stack.Navigator>
              <Stack.Screem name="Home" component={HomeScreen} />
              <Stack.Screem name="Profile" component={ProfileScreen} />
            </Stack.Navigator>
          )}
        </Tab.Screen>
        <Tab.Screen name="Tab2" component={SettingsScreen}></Tab.Screen>
      </Tab.Navigator>
      {/* <Stack.Navigator screenOptions={{ headerShown: false }}>
        {userToken === null ? (
          // No token found, user isn't signed in
          <>
            <Stack.Screen
              name="SignIn"
              options={{
                headerShown: false,
              }}
            >
              {() => <SignInScreen setToken={setToken} />}
            </Stack.Screen>
            <Stack.Screen
              name="SignUp"
              options={{
                headerShown: false,
              }}
            >
              {(props) => <SignUpScreen {...props} setToken={setToken} />}
            </Stack.Screen>
          </>
        ) : (
          // User is signed in ! 🎉
          <Stack.Screen name="Tab" options={{ headerShown: false }}>
            {() => (
              <Tab.Navigator
                screenOptions={{
                  headerShown: false,
                  tabBarActiveTintColor: "tomato",
                  tabBarInactiveTintColor: "gray",
                }}
              >
                <Tab.Screen
                  name="TabHome"
                  options={{
                    tabBarLabel: "Home",
                    tabBarIcon: ({ color, size }) => (
                      <Ionicons name={"ios-home"} size={size} color={color} />
                    ),
                  }}
                >
                  {() => (
                    <Stack.Navigator
                      screenOptions={{
                        headerTitle: () => (
                          <Image
                            source={{
                              uri: "http://crapaudvoyageur.com/wp-content/uploads/2019/11/airbnb-vector-png-airbnb-logo-airbnb-logo-877.png",
                            }}
                            style={{ width: 30, height: 30 }}
                          />
                        ),
                        headerTitleContainerStyle: {
                          alignItems: "center",
                          justifyContent: "center",
                          marginLeft: -30, // ajustez selon vos besoins
                        },
                      }}
                    >
                      <Stack.Screen
                        name="Home"
                        options={{
                          title: "Logo air Bnb",
                          headerStyle: { backgroundColor: "white" },
                          headerTitleStyle: { color: "coral" },
                        }}
                      >
                        {() => <HomeScreen />}
                      </Stack.Screen>

                      <Stack.Screen
                        name="Profile"
                        options={{
                          title: "User Profile",
                          headerBackTitleVisible: false,
                        }}
                      >
                        {() => <ProfileScreen />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
                <Tab.Screen
                  name="TabSettings"
                  options={{
                    tabBarLabel: "Settings",
                    tabBarIcon: ({ color, size }) => (
                      <Ionicons
                        name={"ios-options"}
                        size={size}
                        color={color}
                      />
                    ),
                  }}
                >
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="Settings"
                        options={{
                          title: "Settings",
                        }}
                      >
                        {() => <SettingsScreen setToken={setToken} />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
              </Tab.Navigator>
            )}
          </Stack.Screen>
        )}
      </Stack.Navigator> */}
    </NavigationContainer>
  );
}
