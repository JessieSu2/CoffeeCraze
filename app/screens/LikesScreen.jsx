import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  collection,
  doc,
  getDoc,
  query,
  where,
  get,
  DocumentSnapshot,
  onSnapshot,
} from "firebase/firestore";
import { auth, db } from "../../firebase";
import { useAsync } from "react-async";
import { useCallback, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/native";
function Likes() {
  const [shops, setShops] = useState([]);
  const [drinks, setFavDrinks] = useState([]);
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      // Fetch the likes data when the "Likes" screen is focused
      GetLikes();
    }
  }, [isFocused]);

  const GetLikes = async () => {
    const currentUser = auth.currentUser?.uid;
    if (currentUser) {
      console.log("getting favorites for", `${currentUser}`);
      const docRef = doc(db, "users", `${currentUser}`);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        console.log("Favorites:", docSnap.get("favorites"));
        const favorites = docSnap.get("favorites");
        // console.log(favorites);
        if (!favorites) {
          console.log("NoFavorites");
          return;
        }
        let shopslist = [];
        let drinkslist = [];

        for (const [key, value] of Object.entries(favorites)) {
          console.log("key", key);
          console.log("value", value);
          const unsub = onSnapshot(doc(db, "stores", `${key}`), (doc) => {
            console.log("Current data: ", doc.data());
            shopslist.push(doc.data());
          });

          for (const item of value) {
            const docRef = doc(db, `stores/${key}/drinks`, `${item}`);
            const docSnap1 = await getDoc(docRef);
            console.log("Doc", docSnap1.data());
            drinkslist.push(docSnap1.data());
            console.log("item", item);
          }
        }
        setShops(shopslist);
        setFavDrinks(drinkslist);
        console.log("CoffeeShops::ShopsList", shopslist);
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
    }
  };

  const Shop = (props) => {
    const navigation = useNavigation();
    const name = props.name;
    console.log("CoffeeShops::Shops", props);
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("FavDrinks", {
            name: `${name} drinks`,
            mykey: props.storekey,
          });
          console.log("CoffeeShops::Pressed ", name);
          console.log("CoffeeShops::Path Key:", props.storekey);
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
  const RenderShops = () => {
    return shops.map((item) => {
      return (
        <Shop name={item.name} id={item.id} storekey={item.key} key={item.id} />
      );
    });
  };
  return (
    <SafeAreaView>
      <RenderShops />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
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
export default Likes;
