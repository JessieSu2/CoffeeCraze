import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { FlatList } from "react-native";
import { Icon } from "react-native-elements";
import { auth, db } from "../../firebase";
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  deleteField,
} from "firebase/firestore";
const removeKeyIfEmpty = async (keyToRemove, favoriteStoreKeyPath, uid) => {
  try {
    const docRef = doc(db, "users", uid);
    const documentSnapshot = await getDoc(docRef);
    if (documentSnapshot.exists()) {
      const data = documentSnapshot.data();
      if (data && data.favorites && data.favorites[keyToRemove].length === 0) {
        await updateDoc(docRef, {
          [`${favoriteStoreKeyPath}`]: deleteField(),
        });
        console.log("Array removed successfully");
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const updateAddUserFavorites = async (drinkId, storeKey) => {
  const currentUser = auth.currentUser;
  const uid = currentUser.uid;
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
};
const updateRemoveUserFavorites = async (drinkId, storeKey) => {
  const currentUser = auth.currentUser;
  const uid = currentUser.uid;
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
};

const DrinkDescription = ({ route }) => {
  const currentUser = auth.currentUser;
  // console.log("You are ", currentUser);
  const uid = currentUser.uid;
  const [liked, setLiked] = useState(false);
  const selectedDrinkData = route.params.selectedDrink;
  const favoriteStoreKeyPath = `favorites.${selectedDrinkData.storekey}`;
  // console.log("DrinkDescription::route ", route);
  // console.log("DrinkDescription::DrinkName ", selectedDrinkData.name);
  const selectedDrinkName = selectedDrinkData.name;
  // console.log("DrinkDescriptionData::storkey", selectedDrinkData.storekey);
  // console.log("DrinkDescriptionData::drinkid", selectedDrinkData.drinkid);
  const toggleLike = () => {
    // Update the liked state67
    setLiked(!liked);
    console.log(!liked);
    if (!liked) {
      console.log("Added Favorites");
      updateAddUserFavorites(
        selectedDrinkData.drinkid,
        selectedDrinkData.storekey
      );
    } else {
      console.log("Removed Favorites");
      updateRemoveUserFavorites(
        selectedDrinkData.drinkid,
        selectedDrinkData.storekey
      );
      removeKeyIfEmpty(selectedDrinkData.storekey, favoriteStoreKeyPath, uid);
    }
  };

  const TopSection = () => {
    return (
      <>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require("../assets/favicon.png")}
          />
        </View>

        <View style={styles.top}>
          {/* Drink Name */}
          <Text style={styles.drinkName}>{selectedDrinkName}</Text>
          <View style={styles.row1}>
            <View style={styles.row}>
              <Text>Recipe By:</Text>
              <View style={styles.username}>
                <Text>Username</Text>
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
          <Text>
            “Can I get a grande Mango Dragonfruit Lemonade with no dragonfruit
            inclusions, and a splash of peach juice, then topped with Iced
            Passion Tango Tea so that it's layered?”
          </Text>
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
          style={styles.bottom}
          showsVerticalScrollIndicator={false}
          data={[
            { key: "[Size] Mango Dragonfruit Lemonade" },
            { key: "No Mango Dragonfruit Inclusions" },
            { key: "Add peach juice" },
            { key: "Add passion tango on top" },
          ]}
          renderItem={({ item }) => <Text>{`\u2043 ${item.key} `}</Text>}
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
    backgroundColor: "#ffc2c2",
    flex: 1,
  },
  // Inner container
  sizeOfColumn: {
    paddingHorizontal: 15,
  },
  // Image
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    width: 200,
    height: 200,
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
