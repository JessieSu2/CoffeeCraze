import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { collection, doc, getDoc, query, where, get } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { useAsync } from "react-async";
import { useEffect } from "react";
// const Shop = (props) => {
//   const navigation = useNavigation();
//   const name = props.name;
//   return (
//     <TouchableOpacity
//       onPress={() => {
//         navigation.navigate("Drinks", { name: `${name} drinks` });
//         console.log("pressed ", name);
//         // navigation.setOptions({ title: name });
//       }}
//     >
//       <View style={styles.shop}>
//         <Image source={require("../assets/favicon.png")} />
//         <Text style={styles.text}>{name}</Text>
//       </View>
//     </TouchableOpacity>
//   );
// };

// function CoffeeShops() {
//   return (
//     <SafeAreaView style={styles.container} edges={["top"]}>
//       <ScrollView>
//         <Shop name="Starbucks" />
//         <Shop name="Dunkin Donuts" />
//         <Shop name="Other shop 1" />
//         <Shop name="Other shop 2" />
//         <Shop name="Other shop 3" />
//         <Shop name="Other shop 4" />
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const GetLikes = async () => {
//   try {
//     const currentUser = auth.currentUser?.uid;
//     if (currentUser) {
//       console.log("getting favorites for", `${currentUser}`);
//       // const userData = userDoc.data();
//       // console.log(userData);
//       // if (!userData) {
//       //   console.log("NoFavorites");
//       //   return;
//       // }
//       // const favorites = userData.favorites;
//       // favorites.array.forEach((drinkId) => {
//       //   console.log(`getting thing ${drinkId}`);
//       // });

//       const docref = db.collection("Users").doc(`${currentUser}`);
//       docref
//         .get()
//         .then((doc) => {
//           if (doc.exists) {
//             console.log("Document dataL", doc.data());
//           } else {
//             console.log("No such document");
//           }
//         })
//         .catch((error) => {
//           console.log("Erorr getting document:", error);
//         });
//     }
//   } catch {
//     return "error";
//   }
// };

function Likes() {
  useEffect(() => {
    // declare the data fetching function
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
          console.log(favorites);
          if (!favorites) {
            console.log("NoFavorites");
            return;
          }
          favorites.forEach((drinkId) => {
            console.log(`getting thing ${drinkId}`);
            console.log(getDoc(doc(db, "stores")));
          });
        } else {
          // docSnap.data() will be undefined in this case
          console.log("No such document!");
        }
        // console.log(userData);

        // const docref = db.collection("Users").doc(`${currentUser}`);
        // console.log(docref);
        // docref
        //   .get()
        //   .then((doc) => {
        //     if (doc.exists) {
        //       console.log("Document dataL", doc.data());
        //     } else {
        //       console.log("No such document");
        //     }
        //   })
        //   .catch((error) => {
        //     console.log("Erorr getting document:", error);
        //   });
      }
    };
    // call the function
    GetLikes()
      // make sure to catch any error
      .catch(console.error);
  }, []);
  return (
    <SafeAreaView>
      <Text>Likes</Text>
    </SafeAreaView>
  );
}

export default Likes;
