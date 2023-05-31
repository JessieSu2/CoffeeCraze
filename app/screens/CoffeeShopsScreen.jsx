import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { collection, onSnapshot } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../firebase";
import { ScrollView } from "react-native-gesture-handler";
const Shop = (props) => {
  const [imageUrl, setImageUrl] = useState();
  const navigation = useNavigation();
  const name = props.name;
  const url = props.imageUrl;
  const storageRef = ref(storage, `storeLogo/${url}`);
  // console.log("CoffeeShops::Shops", props);
  getDownloadURL(storageRef)
    .then((url) => {
      setImageUrl(url);
    })
    .catch((error) => {
      console.log(error);
    });
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Drinks", {
          name: `${name} drinks`,
          mykey: props.storekey,
        });

        // console.log("CoffeeShops::Pressed ", name);
        // console.log("CoffeeShops::Path Key:", props.storekey);
      }}
    >
      <View style={styles.shop}>
        <View style={styles.image}>
          <Image
            source={{ uri: imageUrl }}
            style={{ flex: 1, resizeMode: "contain" }}
          />
        </View>
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
        <Shop
          name={item.name}
          id={item.id}
          storekey={item.key}
          key={item.id}
          imageUrl={item.imageUrl}
        />
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
      <ScrollView>
        <RenderShops />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 0,
    paddingTop: useSafeAreaInsets.top,
    backgroundColor: "#eacdb7",
  },
  shop: {
    alignItems: "center",
    backgroundColor: "#603C30",
    // backgroundColor: "#2e2521",
    padding: 25,
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 10,
    flexDirection: "row",
  },
  text: {
    // color: "#EBDBCC",
    color: "#FFFFFF",
    // marginLeft: 10,
    fontSize: 20,
  },
  image: {
    height: 85,
    aspectRatio: 1,
    resizeMode: "contain",
  },
});

export default CoffeeShops;
