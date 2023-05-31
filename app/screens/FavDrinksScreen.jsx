import React, { Component, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { collection, onSnapshot } from "firebase/firestore";
import { db, storage } from "../../firebase";
import { getDownloadURL, ref } from "firebase/storage";
import { Image } from "react-native";

const FavDrink = (props) => {
  const navigation = useNavigation();
  const name = props.name;
  const storekey = props.storekey;
  const drinkid = props.drinkid;
  console.log("Drink props::", props);
  const [imageUrl, setImageUrl] = useState();
  const url = props.imageUrl;
  const storageRef = ref(storage, `drinkImages/${url}`);
  console.log("CoffeeShops::Shops", props);
  if (url) {
    getDownloadURL(storageRef)
      .then((url) => {
        setImageUrl(url);
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    const storageRef = ref(storage, `drinkImages/filler_icon.png`);
    getDownloadURL(storageRef)
      .then((url) => {
        setImageUrl(url);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Description", {
          selectedDrink: props,
          name: name,
          storekey: storekey,
          drinkid: drinkid,
          imageUrl: imageUrl,
        });
        console.log("DrinksScreen::Navigated to: Description");
      }}
    >
      <View style={styles.drink}>
        <View style={styles.image}>
          <Image
            source={{ uri: imageUrl }}
            style={{
              flex: 1,
              resizeMode: "contain",
              height: 100,
              width: 70,
              borderRadius: 5,
            }}
          />
        </View>
        <Text style={styles.text}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
};

function FavDrinks({ route }) {
  useEffect(() => {
    navigation.setOptions({
      headerStyle: { backgroundColor: "#603C30" },
      headerTintColor: "#F8A621",
      headerBackTitle: "Back",
    });
  }, []);
  //   const [drinks, setDrinks] = useState([]);
  const navigation = useNavigation();
  const drinks = route.params.drinks;
  const key = route.params.mykey;
  console.log("FavDrinksScreen::key", route.params.mykey);
  console.log("FavDrinksScreen:", drinks);
  const favStoreDrinks = drinks
    .filter(function (item) {
      return item.storekey == key;
    })
    .map(function ({
      drinkname,
      id,
      howTo,
      imageUrl,
      showBarista,
      storekey,
      drinkid,
    }) {
      return { drinkname, id, howTo, imageUrl, showBarista, storekey, drinkid };
    });
  console.log(favStoreDrinks);
  const RenderDrinks = () => {
    return favStoreDrinks.map((item) => {
      console.log("drinks itme::", item);
      return (
        <FavDrink
          name={item.drinkname}
          id={item.id}
          storekey={item.storekey}
          key={item.drinkid}
          drinkid={item.drinkid}
          imageUrl={item.imageUrl}
        />
      );
    });
  };

  return (
    <ScrollView style={styles.container}>
      {/* <Drink name={drinks.drinkname} />
      <Drink name="Rainbow Drink" /> */}
      <RenderDrinks />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#eacdb7",
  },
  drink: {
    justifyContent: "space-between",
    backgroundColor: "#603C30",
    padding: 15,
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    color: "#EBDBCC",
    marginLeft: 15,
    fontSize: 15,
    flex: 1,
  },
  image: {
    resizeMode: "contain",
  },
});

export default FavDrinks;
