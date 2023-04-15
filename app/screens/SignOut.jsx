import { useNavigation } from "@react-navigation/native";
import { auth } from "../../firebase";
import React from "react";
const handleSignOut = () => {
  const navigation = useNavigation();
  auth
    .signOut()
    .then(() => {
      navigation.navigate("Login");
    })
    .catch((error) => error.message);
};

export default handleSignOut;
