import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { Icon } from "react-native-elements";
import { auth, db, storage } from "../../firebase";
import { ref, getDownloadURL } from "firebase/storage";
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  deleteField,
  onSnapshot,
} from "firebase/firestore";
import { useIsFocused } from "@react-navigation/native";
import { Alert } from "react-native";
const removeKeyIfEmpty = async (keyToRemove, favoriteStoreKeyPath, uid) => {
  if (uid) {
    try {
      const docRef = doc(db, "users", uid);
      const documentSnapshot = await getDoc(docRef);
      if (documentSnapshot.exists()) {
        const data = documentSnapshot.data();
        if (
          data &&
          data.favorites &&
          data.favorites[keyToRemove].length === 0
        ) {
          await updateDoc(docRef, {
            [`${favoriteStoreKeyPath}`]: deleteField(),
          });
          console.log("Array removed successfully");
        }
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log("removeKeyIfEmpty::No account");
  }
};

const updateAddUserFavorites = async (drinkId, storeKey) => {
  const uid = auth.currentUser?.uid;
  if (uid) {
    const favoriteStoreKeyPath = `favorites.${storeKey}`;
    try {
      const docRef = doc(db, "users", uid);
      const documentSnapshot = await getDoc(docRef);
      const favorites = documentSnapshot.data().favorites;
      updateDoc(
        doc(db, "users", `${uid}`),
        {
          [`${favoriteStoreKeyPath}`]: arrayUnion(drinkId),
        },
        { merge: true }
      ).catch((error) => {
        console.log("couldnt update doc");
        alert(error.message);
      });
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log("updateAddUserFav:: No Account");
  }
};

const updateRemoveUserFavorites = async (drinkId, storeKey) => {
  const uid = auth.currentUser?.uid;
  if (uid) {
    const favoriteStoreKeyPath = `favorites.${storeKey}`;
    try {
      updateDoc(
        doc(db, "users", `${uid}`),
        {
          [`${favoriteStoreKeyPath}`]: arrayRemove(drinkId),
        },
        { merge: true }
      ).catch((error) => {
        console.log("couldnt update doc");
        alert(error.message);
      });
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log("updateRemoveUserFav::No account");
  }
};

const updateLiked = async (drinkId, liked) => {
  const uid = auth.currentUser?.uid;
  if (uid) {
    try {
      const docRef = doc(db, "favorites", uid);
      const documentSnapshot = await getDoc(docRef);
      updateDoc(
        doc(db, "favorites", `${uid}`),
        {
          [drinkId]: liked,
        },
        { merge: true }
      ).catch((error) => {
        console.log("couldnt update doc");
        alert(error.message);
      });
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log("UpdateLiked::No account");
  }
};

const GetLikedData = async (selectedDrinkData) => {
  const currentUser = auth.currentUser?.uid;
  if (currentUser) {
    const docRef = doc(db, "favorites", `${currentUser}`);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      data = docSnap.data();
      console.log("GetLikedData", data[selectedDrinkData.drinkid]);
      if (data[selectedDrinkData.drinkid] == true) {
        return true;
      } else {
        return false;
      }
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
      return false;
    }
  } else {
    console.log("not logged in");
    return false;
  }
};

const DrinkDescription = ({ route }) => {
  const uid = auth.currentUser?.uid;
  const [liked, setLiked] = useState(false);
  const [howTo, setHowTo] = useState("");
  const [showTo, setShowTo] = useState();
  const [imageUrl, setImageUrl] = useState();
  const selectedDrinkData = route.params.selectedDrink;
  const favoriteStoreKeyPath = `favorites.${selectedDrinkData.storekey}`;
  // console.log("DrinkDescription::route ", route);
  // console.log("DrinkDescription::DrinkName ", selectedDrinkData.name);
  const selectedDrinkName = selectedDrinkData.name;
  // console.log("DrinkDescriptionData::storkey", selectedDrinkData.storekey);
  // console.log("DrinkDescriptionData::drinkid", selectedDrinkData.drinkid);
  const isFocused = useIsFocused();
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isFocused) {
          const isLiked = await GetLikedData(selectedDrinkData);
          setLiked(isLiked);
          console.log("UseEffect", isLiked);
          const docRef = doc(
            db,
            `stores/${selectedDrinkData.storekey}/drinks`,
            `${selectedDrinkData.drinkid}`
          );
          const querySnapshot = await getDoc(docRef);
          const howToOrder = querySnapshot.get("howTo");
          setHowTo(howToOrder);
          // console.log(showTo);
          const showBaristaData = querySnapshot.get("showBarista");
          setShowTo(showBaristaData);
          const getImageUrl = querySnapshot.get("imageUrl");
          // console.log(getImageUrl);
          const storageRef = ref(storage, `drinkImages/${getImageUrl}`);
          getDownloadURL(storageRef)
            .then((url) => {
              setImageUrl(url);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      } catch (error) {
        console.error(error);
        setLiked(false);
      }
    };

    fetchData();

    // Clean-up function here (if needed)
  }, [isFocused]);

  const toggleLike = () => {
    // Update the liked state67
    if (uid) {
      setLiked(!liked);
      console.log(!liked);
      if (!liked) {
        console.log("Added Favorites");
        updateAddUserFavorites(
          selectedDrinkData.drinkid,
          selectedDrinkData.storekey
        );
        updateLiked(selectedDrinkData.drinkid, !liked);
      } else {
        console.log("Removed Favorites");
        updateRemoveUserFavorites(
          selectedDrinkData.drinkid,
          selectedDrinkData.storekey
        );
        updateLiked(selectedDrinkData.drinkid, !liked);
        removeKeyIfEmpty(selectedDrinkData.storekey, favoriteStoreKeyPath, uid);
      }
    } else {
      Alert.alert("Cant like if not logged");
    }
  };

  const TopSection = () => {
    return (
      <>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            // source={require("../assets/favicon.png")}
            source={{ uri: imageUrl }}
            resizeMode="contain"
          />
        </View>

        <View style={styles.top}>
          {/* Drink Name */}
          <Text style={styles.drinkName}>{selectedDrinkName}</Text>
          <View style={styles.row1}>
            <View style={styles.row}>
              <Text>Recipe By:</Text>
              <View style={styles.username}>
                <Text>CoffeeCraze</Text>
              </View>
            </View>
            <View style={styles.icon}>
              <TouchableOpacity onPress={toggleLike}>
                {liked ? (
                  <Icon name="favorite" />
                ) : (
                  <Icon name="favorite-outline" />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.middle}>
          {/* Title */}
          <Text style={styles.title}>How To Order</Text>
          <Text>{howTo}</Text>
        </View>

        <Text style={styles.or}>or</Text>

        <View style={styles.bottom}>
          <Text style={styles.title}>Show The Barista</Text>
        </View>
      </>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.sizeOfColumn}>
        <FlatList
          contentContainerStyle={{ paddingBottom: 100 }}
          style={styles.bottom}
          showsVerticalScrollIndicator={false}
          data={showTo}
          renderItem={({ item }) => <Text>{`\u2043 ${item} `}</Text>}
          ListHeaderComponent={TopSection}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  // Whole container
  container: {
    alignItems: "center",
    // backgroundColor: "#ffc2c2",
    flex: 1,
  },
  // Inner container
  sizeOfColumn: {
    // paddingHorizontal: 15,
    // paddingBottom: 15,
  },
  // Image
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    height: 300,
    width: 200,
  },

  //Drink name + username
  top: {
    flexDirection: "column",
    paddingVertical: 15,
  },
  drinkName: {
    fontSize: 30,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  row1: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 10,
  },
  username: {
    backgroundColor: "white",
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    padding: 5,
    marginLeft: 10,
  },

  icon: {
    justifyContent: "space-evenly",
  },

  //HOW TO ORDER???
  middle: {
    paddingVertical: 15,
  },

  or: {},

  // SHOW BARISTA!!!
  bottom: {
    paddingTop: 15,
  },

  title: {
    fontSize: 22,
  },
});
export default DrinkDescription;
