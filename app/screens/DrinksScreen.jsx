import React, { Component, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";

const Drink = (props) => {
  const navigation = useNavigation();
  const name = props.name;
  const storekey = props.storekey;
  const drinkid = props.drinkid;
  console.log("Drink props::", props);
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Description", {
          selectedDrink: props,
          name: name,
          storekey: storekey,
          drinkid: drinkid,
        });
        console.log("DrinksScreen::Navigated to: Description");
      }}
    >
      <View style={styles.drink}>
        <Text style={styles.text}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
};

function Drinks({ route }) {
  const [drinks, setDrinks] = useState([]);
  const path = route.params.mykey;
  console.log("DrinksScreen::Collection:", path);
  const RenderDrinks = () => {
    return drinks.map((item) => {
      console.log("drinks itme::", item);
      return (
        <Drink
          name={item.drinkname}
          id={item.id}
          storekey={path}
          key={item.key}
          drinkid={item.key}
        />
      );
    });
  };

  useEffect(() => {
    const drinksquery = collection(db, `/stores/${path}/drinks`);
    onSnapshot(drinksquery, (snapshot) => {
      let drinkslist = [];
      snapshot.docs.map((doc) =>
        drinkslist.push({ ...doc.data(), key: doc.id })
      );
      setDrinks(drinkslist);
      console.log(drinkslist);
    });
  }, []);

  return (
    <ScrollView>
      {/* <Drink name={drinks.drinkname} />
      <Drink name="Rainbow Drink" /> */}
      <RenderDrinks />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  drink: {
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

export default Drinks;
