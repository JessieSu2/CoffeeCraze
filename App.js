import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  Platform,
  StatusBar,
  useColorScheme,
} from "react-native";
import CoffeeShops from "../TrendyDrinks/app/screens/CoffeeShopsScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import Drinks from "./app/screens/DrinksScreen";
import Icon from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import Profile from "./app/screens/ProfileScreen";
import Likes from "./app/screens/LikesScreen";
import { createStackNavigator } from "@react-navigation/stack";
import DrinkDescription from "./app/screens/DrinkDescription";
import Login from "./app/screens/Login";

const BottomTab = createBottomTabNavigator();
const ShopStack = createStackNavigator();
const Stack = createStackNavigator();
function TabNavigator() {
  return (
    <BottomTab.Navigator
      screenOptions={({ route, navigation }) => ({
        headerShown: false,
        tabBarLabel: () => {
          return null;
        },
        tabBarStyle: {
          backgroundColor: "rgba(34,36,40,1)",
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Stores") {
            iconName = focused ? "home" : "home";
          } else if (route.name === "Likes") {
            iconName = focused ? "heart" : "heart";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <BottomTab.Screen name="Stores" component={ShopStackNavigator} />
      <BottomTab.Screen name="Likes" component={Likes} />
      <BottomTab.Screen name="Profile" component={Profile} />
    </BottomTab.Navigator>
  );
}

function ShopStackNavigator() {
  return (
    <ShopStack.Navigator>
      <ShopStack.Screen
        name="Shops"
        component={CoffeeShops}
        options={{ headerShown: false }}
      />
      <ShopStack.Screen
        name="Drinks"
        component={Drinks}
        options={({ route }) => ({
          headerShown: true,
          title: route.params.name,
        })} //title: false
        // options={({ route }) => ({ title: route.params.name })}
      />
      <ShopStack.Screen
        name="Description"
        component={DrinkDescription}
        options={({ route }) => ({
          headerShown: true,
          title: route.params.name,
        })}
      />
    </ShopStack.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      {Platform.OS === "ios" ? (
        <StatusBar barStyle="dark-content" />
      ) : (
        <StatusBar barStyle="default" />
      )}

      <NavigationContainer>
        {/* <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={TabNavigator}
            options={{ headerShown: false }}
          />
        </Stack.Navigator> */}
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={TabNavigator}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
        {/* <Login /> */}
        {/* <TabNavigator options={{ headerShown: false }} /> */}
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
//
