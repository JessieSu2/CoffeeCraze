import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import React, { Component } from "react";

class Shop extends Component {
  render() {
    return (
      <View>
        <Text>This is {this.props.name}</Text>
      </View>
    );
  }
}

class CoffeeShops extends Component {
  render() {
    return (
      <>
        <Shop name="Starbucks" />
        <Shop name="Dunkin Donuts" />
      </>
    );
  }
}

export default CoffeeShops;
