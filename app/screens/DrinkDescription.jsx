import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const DrinkDescription = ({ route }) => {
  const selectedDrinkData = route.params.selectedDrink;
  console.log("route ", route);
  console.log("dinkr ", selectedDrinkData.name);
  const selectedDrinkName = selectedDrinkData.name;

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
          <View style={styles.row}>
            <Text>Recipe By:</Text>
            <View style={styles.username}>
              <Text>Username</Text>
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
  username: {
    backgroundColor: "white",
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    padding: 5,
    marginLeft: 10,
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
