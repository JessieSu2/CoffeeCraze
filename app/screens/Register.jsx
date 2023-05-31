import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  View,
  Alert,
} from "react-native";
import { auth, createUserDocument, db } from "../../firebase";
import { updateProfile } from "firebase/auth";
import { collection, getDatabase, ref, set } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
import { User } from "./ProfileScreen";
import LottieView from "lottie-react-native";
function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const navigation = useNavigation();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace("Home");
        console.log("Login::User uid: ", user.uid);
        this.userId = user.uid;
        console.log("Login::User id: ", this.userId);
      }
    });
    return unsubscribe;
  }, []);

  const handleCreateAccount = () => {
    console.log("hel");
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        user.displayName = displayName;
        console.log(user.email);
        setDoc(doc(db, "users", `${user.uid}`), {
          email: email,
          password: password,
          displayName: displayName,
        });
        updateProfile(auth.currentUser, { displayName: displayName }).catch(
          (err) => console.log(err)
        );
      })
      .catch((error) => alert(error.message));
  };

  return (
    <View style={styles.container} behavior="padding">
      <View>
        <LottieView
          autoPlay
          style={{
            width: 100,
            height: 100,
            justifyContent: "center",
            alignItems: "center",
          }}
          source={require("../assets/44298-coffee-love.json")}
        />
      </View>
      <View style={styles.signIn}>
        <Text style={styles.signInText}>Create Account</Text>
      </View>
      {/*  */}
      <View style={styles.inputContainer}>
        <View style={styles.userInput}>
          <TextInput
            placeholder="Username"
            value={displayName}
            onChangeText={(text) => setDisplayName(text)}
          />
        </View>
        <View style={styles.userInput}>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View style={styles.userInput}>
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
          />
        </View>
        {/*  */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            activeOpacity={0.3}
            style={[styles.buttons, styles.buttonOutline]}
            onPress={handleCreateAccount}
          >
            <Text style={styles.buttonOutlineText}>Create Account</Text>
          </TouchableOpacity>
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              marginTop: 15,
            }}
          >
            <Text>Already a user? </Text>
            <TouchableOpacity
              activeOpacity={0.3}
              onPress={() => {
                navigation.navigate("Login");
              }}
            >
              <Text style={styles.subText}>Login</Text>
            </TouchableOpacity>
          </View>
          <View style={{ alignItems: "center" }}>
            <Text style={{ margin: 15 }}>or</Text>
            <TouchableOpacity
              activeOpacity={0.3}
              onPress={() => {
                navigation.navigate("Home");
              }}
            >
              <Text>Skip</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#eacdb7",
    justifyContent: "center",
  },
  signIn: {
    // backgroundColor: "yellow",
    textAlign: "center",
    alignItems: "center",
  },
  signInText: {
    fontSize: 20,
    fontWeight: "300",
  },
  inputContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    marginTop: 20,
  },
  userInput: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    width: "100%",
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: 20,
  },
  buttons: {
    width: "100%",
    backgroundColor: "#603C30",
    textAlign: "center",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
  },
  buttonOutline: {
    marginTop: 5,
    borderColor: "#603C30",
    backgroundColor: "#EBDBCC",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },
  buttonOutlineText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#603C30",
  },
  subText: {
    fontWeight: "700",
    color: "#603C30",
  },
});

export default Register;
