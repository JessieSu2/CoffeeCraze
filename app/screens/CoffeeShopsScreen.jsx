import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { collection, onSnapshot } from "firebase/firestore";

import { db } from "../../firebase";
const Shop = (props) => {
  const navigation = useNavigation();
  const name = props.name;
  console.log("CoffeeShops::Shops", props);
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Drinks", {
          name: `${name} drinks`,
          mykey: props.storekey,
        });
        // console.log("CoffeeShops::Pressed ", name);
        // console.log("CoffeeShops::Path Key:", props.storekey);
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
      return (
        <Shop name={item.name} id={item.id} storekey={item.key} key={item.id} />
      );
    });
  };

  useEffect(() => {
    const shopsquery = collection(db, "stores");
    onSnapshot(shopsquery, (snapshot) => {
      let shopslist = [];
      snapshot.docs.map((doc) =>
        shopslist.push({ ...doc.data(), key: doc.id })
      );
      setShops(shopslist);
      // console.log("CoffeeShops::ShopsList", shopslist);
    });
  }, []);
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
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
