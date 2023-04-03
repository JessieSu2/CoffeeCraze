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
            <Text style={styles.username}>Username</Text>
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
          {/* Title */}
          <Text style={styles.title}>Show The Barista</Text>
        </View>
      </>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.sizeOfColumn}>
        <FlatList
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffc2c2",
    flex: 1,
  },
  // Inner container
  sizeOfColumn: {
    paddingHorizontal: 10,
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
    backgroundColor: "yellow",
    flexDirection: "column",
  },
  drinkName: {
    fontSize: 30,
  },
  row: {
    flexDirection: "row",
  },

  //HOW TO ORDER???
  middle: {
    backgroundColor: "blue",
  },

  or: {
    backgroundColor: "pink",
  },

  // SHOW BARISTA!!!
  bottom: {
    backgroundColor: "orange",
  },
});
export default DrinkDescription;
