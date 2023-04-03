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

const BottomTab = createBottomTabNavigator();
const ShopStack = createStackNavigator();

function TabNavigator() {
  return (
    <BottomTab.Navigator
      screenOptions={({ route, navigation }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "rgba(34,36,40,1)",
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "TabOne") {
            iconName = focused ? "home" : "home";
          } else if (route.name === "TabTwo") {
            iconName = focused ? "heart" : "heart";
          } else if (route.name === "TabThree") {
            iconName = focused ? "person" : "person";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <BottomTab.Screen name="TabOne" component={ShopStackNavigator} />
      <BottomTab.Screen name="TabTwo" component={Likes} />
      <BottomTab.Screen name="TabThree" component={Profile} />
    </BottomTab.Navigator>
  );
}

function ShopStackNavigator() {
  return (
    <ShopStack.Navigator>
      <ShopStack.Screen
        name="shops"
        component={CoffeeShops}
        options={{ headerShown: false }}
      />
      <ShopStack.Screen
        name="Drinks"
        component={Drinks}
        options={{ headerShown: true, title: false }}
      />
      <ShopStack.Screen name="Description" component={DrinkDescription} />
    </ShopStack.Navigator>
  );
}

export default function App() {
  const isDarkMode = useColorScheme() === "dark";
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
        <TabNavigator options={{ headerShown: false }} />
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
