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

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Description", {
          selectedDrink: props,
          name: name,
        });
        console.log("Navigated to: Description");
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
  const params = route.params;
  const path = route.params.mykey;
  const RenderDrinks = () => {
    return drinks.map((item) => {
      console.log("RGIHGIR:", path);
      return (
        <Drink
          name={item.drinkname}
          id={item.id}
          storekey={item.key}
          key={item.id}
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
