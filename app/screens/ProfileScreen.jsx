import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useEffect } from "react";
import { TouchableHighlight } from "react-native";
import { auth, db } from "../../firebase";
import { useNavigation } from "@react-navigation/core";
import {
  QuerySnapshot,
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
// import handleSignOut from "./SignOut";
const GiveTime = () => {
  var hours = new Date().getHours();
  console.log("Hour in 24hr format:", hours);
  if (hours >= 5 && hours < 12) {
    return <Text style={styles.dotText}>Good Morning! </Text>;
  } else if (hours >= 12 && hours < 17) {
    return <Text style={styles.dotText}>Good Afternoon</Text>;
  } else {
    return <Text style={styles.dotText}>Good Evening</Text>;
  }
  // else if({hours} `&gte;` 12:00 && {hours} `&lte;` 17:00)
  // {<Text>Afternoon</Text>}
  // else{<Text>Evening</Text>}
};

// const updateUserInfo = () => {
//   const currentUser = auth.currentUser;
//   console.log("You are ", currentUser);
//   const uid = currentUser.uid;
//   const userData = { lastLoginTime: new Date(), favorites: [] };
//   return db.doc(`user/${uid}`).set(userData, { merge: true });
// };

export const updateUserFavorites = (favoriteId, storeId) => {
  console.log("adding ", favoriteId, " to favorites");
  const currentUser = auth.currentUser;
  // console.log("You are ", currentUser);
  const uid = currentUser.uid;
  // const userData = { storeId: favoriteId };
  const test = `favorites.${storeId}`;
  updateDoc(
    doc(db, "users", `${uid}`),
    {
      // favorites: arrayUnion(favoriteId),
      [`${test}`]: arrayUnion(favoriteId),
    },
    { merge: true }
  ).catch((error) => {
    console.log("couldnt update doc");
    alert(error.message);
  });
  // updateDoc(
  //   doc(db, "users", `${uid}`),
  //   {
  //     // favorites: arrayUnion(favoriteId),
  //     [`${test}`]: arrayRemove(favoriteId),
  //   },
  //   { merge: true }
  // ).catch((error) => {
  //   console.log("couldnt update doc");
  //   alert(error.message);
  // });
};

function Profile() {
  const navigation = useNavigation();
  // const docRef = doc(db, "users", `${auth.currentUser?.uid}`);
  // console.log(`${auth.currentUser?.uid}`);

  // const docSnap = getDoc(docRef);
  // console.log(getDoc(docRef));

  // if (docSnap.exists) {
  //   console.log("Document data:", docSnap.data());
  // } else {
  //   // docSnap.data() will be undefined in this case
  //   console.log("No such document!");
  // }

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => {
        error.message;
        console.log(error);
      });
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.centered}>
        <GiveTime />
        <View>
          <Text>Username</Text>
        </View>
        <View>
          <Image
            style={styles.image}
            source={require("../assets/favicon.png")}
          />
        </View>
        <View style={styles.profileContainer}>
          <View style={styles.information}>
            <Text style={styles.regularText}>Username</Text>
            <Text style={styles.regularText}>
              {auth.currentUser?.displayName}
            </Text>
          </View>
          <View style={styles.information}>
            <Text style={styles.regularText}>Email</Text>
            <Text style={styles.regularText}>{auth.currentUser?.email}</Text>
          </View>
          {/* <View style={styles.information}>
            <Text style={styles.regularText}>Birthday</Text>
            <Text style={styles.regularText}>July 17, 2001</Text>
          </View> */}
        </View>
        <View style={styles.bottom}>
          <View style={styles.logout}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                // Alert.alert("Logged Out");
                handleSignOut();
              }}
            >
              <View>
                <Text style={styles.logoutText}>Log Out</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
  },
  centered: {
    paddingTop: 30,
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 20,
    borderRadius: 20,
  },
  profileContainer: {
    width: 300,
  },
  information: {
    // backgroundColor: "#121212",
    // width: 250,
    // borderRadius: 20,
    // padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
  },
  bottom: {
    flex: 1,
    justifyContent: "flex-end",
  },
  logout: {
    color: "#121212",
    paddingVertical: 10,
    width: 100,
    borderRadius: 20,
  },
  button: {
    borderRadius: 20,
    backgroundColor: "#121212",
    alignItems: "center",
    padding: 10,
  },
  dotText: {
    fontSize: 30,
  },
  regularText: {
    color: "black",
    fontSize: 15,
  },
  logoutText: {
    color: "white",
    fontSize: 15,
  },
});

export default Profile;
