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
import { auth, db, storage } from "../../firebase";
import { useAsync } from "react-async";
import { useCallback, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/native";
import { getDownloadURL, ref } from "firebase/storage";
import { NotAuthenticated } from "./ProfileScreen";
import LottieView from "lottie-react-native";

function Likes() {
  const currentUser = auth.currentUser?.uid;
  const navigation = useNavigation();
  const [shops, setShops] = useState([]);
  const [drinks, setFavDrinks] = useState([]);
  const [present, setPresent] = useState(false);
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
        // console.log("Document data:", docSnap.data());
        // console.log("Favorites:", docSnap.get("favorites"));
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
            // console.log("Current data: ", doc.data());
            shopslist.push({ ...doc.data(), key: doc.id });
          });

          for (const item of value) {
            const docRef = doc(db, `stores/${key}/drinks`, `${item}`);
            const docSnap1 = await getDoc(docRef);
            // console.log("Doc", docSnap1.data());
            drinkslist.push({
              ...docSnap1.data(),
              storekey: `${key}`,
              drinkid: `${item}`,
            });
            // console.log("item", item);
          }
        }
        setFavDrinks(drinkslist);
        console.log("CoffeeShops::ShopsList", shopslist);
        shopslist.sort((a, b) => (a.id > b.id ? 1 : -1));
        console.log(drinks);
        setShops(shopslist);
        // console.log(shopslist);
        // console.log("LikesScreen::", shops);
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
    }
  };

  const Shop = (props) => {
    const name = props.name;
    // console.log("LikesScreen::Shops", props);
    const [imageUrl, setImageUrl] = useState();
    const url = props.imageUrl;
    const storageRef = ref(storage, `storeLogo/${url}`);
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
          navigation.navigate("FavDrinks", {
            name: `${name} drinks`,
            mykey: props.storekey,
            drinks: drinks,
          });
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
  const RenderShops = () => {
    return shops.map((item) => {
      // console.log("item", item);
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
  if (currentUser) {
    if (shops.length != 0) {
      return (
        <SafeAreaView style={styles.container}>
          <RenderShops />
        </SafeAreaView>
      );
    } else {
      return (
        <SafeAreaView style={styles.container}>
          <View style={styles.centered}>
            <Text style={{ color: "#603C30", fontSize: 18 }}>
              Find the coffee that fills your craze!
            </Text>
            <LottieView
              autoPlay
              style={{
                width: 200,
                height: 200,
                justifyContent: "center",
                alignItems: "center",
              }}
              source={require("../assets/44298-coffee-love.json")}
            />
            <TouchableOpacity
              style={styles.buttons}
              onPress={() => {
                navigation.navigate("Shops");
              }}
            >
              <Text style={styles.buttonText}>Find Your Coffee Craze!</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      );
    }
  } else {
    return <NotAuthenticated />;
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#eacdb7",
    flex: 1,
    width: "100%",
  },
  buttons: {
    width: "80%",
    backgroundColor: "#603C30",
    textAlign: "center",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
  centered: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  shop: {
    alignItems: "center",
    backgroundColor: "#603C30",
    padding: 25,
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 10,
    flexDirection: "row",
  },
  text: {
    color: "#EBDBCC",
    // marginLeft: 10,
    fontSize: 20,
  },
  image: {
    height: 85,
    aspectRatio: 1,
    resizeMode: "contain",
  },
});
export default Likes;
