import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
  StatusBar,
} from "react-native";
import React, { Component, useEffect, useState } from "react";
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { FlatList, TouchableWithoutFeedback } from "react-native-web";
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Drinks from "./DrinksScreen";
import { ScrollView } from "react-native-gesture-handler";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
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
        navigation.navigate("Drinks", { name: `${name} drinks` });
        console.log("pressed ", name);
        // navigation.setOptions({ title: name });
      }}
    >
      <View style={styles.shop}>
        <Image source={require("../assets/favicon.png")} />
        <Text style={styles.text}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
};

function CoffeeShops() {
  const [shops, setShops] = useState([]);
  const RenderShops = () => {
    return shops.map((item) => {
      return <Shop name={item.name} key={item.id} />;
    });
  };

  useEffect(() => {
    const shopsquery = collection(db, "stores");
    onSnapshot(shopsquery, (snapshot) => {
      let shopslist = [];
      snapshot.docs.map((doc) => shopslist.push({ ...doc.data() }));
      setShops(shopslist);
      console.log(shopslist);
    });
  }, []);
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* <ScrollView>
        <Shop name={shops} />
        <Shop name="Dunkin Donuts" />
        <Shop name="Other shop 1" />
        <Shop name="Other shop 2" />
        <Shop name="Other shop 3" />
        <Shop name="Other shop 4" />
        
      </ScrollView> */}
      <RenderShops />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 0,
    paddingTop: useSafeAreaInsets.top,
  },
  shop: {
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 40,
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 10,
    flexDirection: "row",
  },
  text: {
    color: "black",
    marginLeft: 15,
    fontSize: 20,
  },
});

export default CoffeeShops;
