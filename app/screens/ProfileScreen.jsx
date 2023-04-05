import { View, Text, Image, Button, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useEffect } from "react";
const GiveTime = () => {
  var hours = new Date().getHours();
  console.log({ hours } >= 12);
  console.log(hours);
  console.log(hours >= 12 && hours < 17);
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

function Profile() {
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
        <View style={styles.usernameContainer}>
          <Text style={styles.regularText}>UserNaasme</Text>
        </View>
        <View style={styles.bottom}>
          <View style={styles.logout}>
            <Button title="Log Out"></Button>
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
  usernameContainer: {
    backgroundColor: "#121212",
    paddingHorizontal: 10,
    paddingVertical: 20,
    width: 250,
    borderRadius: 20,
  },
  bottom: {
    flex: 1,
    justifyContent: "flex-end",
  },
  logout: {
    backgroundColor: "#121212",
    paddingHorizontal: 10,
    paddingVertical: 7,
    width: 250,
    borderRadius: 15,
  },
  dotText: {
    fontSize: 30,
  },
  regularText: {
    color: "white",
  },
});

export default Profile;
