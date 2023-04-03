import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import React, { Component } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableWithoutFeedback } from "react-native-web";
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Drinks from "./DrinksScreen";

// class Shop extends Component {
//   render() {
//     return (
//       <View style={styles.shop}>
//         <Text style={styles.text}>{this.props.name}</Text>
//       </View>
//     );
//   }
// }

const Shop = (props) => {
  const navigation = useNavigation();
  const name = props.name;
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Drinks");
      }}
    >
      <View style={styles.shop}>
        <Text style={styles.text}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
};

function CoffeeShops() {
  return (
    <SafeAreaView>
      <Shop name="Starbucks" />
      <Shop name="Dunkin Donuts" />
    </SafeAreaView>
  );
}

// function CoffeeShops({ navigation }) {
//   return (
//     <SafeAreaView>
//       <ShopStack.Navigator>
//         <ShopStack.Screen name="shops" component={Shops} />
//         <ShopStack.Screen name="drinks" component={Drinks} />
//       </ShopStack.Navigator>
//     </SafeAreaView>
//   );
// }

const styles = StyleSheet.create({
  shop: {
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 40,
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 10,
  },
  text: {
    color: "black",
  },
});

export default CoffeeShops;
