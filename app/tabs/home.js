import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Pressable,
} from "react-native";
import { router } from "expo-router";

const App = () => {
  const handleGamePress = () => {
    router.push("game");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleGamePress}>
        <Text style={styles.buttonText}>Jouer</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    width: 200,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontFamily: "DMBold",
    color: "white",
    fontSize: 25,
  },
});

export default App;
