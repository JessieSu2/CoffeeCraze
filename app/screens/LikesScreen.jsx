import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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

function Likes() {
  return (
    <SafeAreaView>
      <Text>Likes</Text>
    </SafeAreaView>
  );
}

export default Likes;
