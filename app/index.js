import { Text, AppRegistry } from "react-native";
import { Redirect, useRouter, useFocusEffect } from "expo-router";

import { gestureHandlerRootHOC } from "react-native-gesture-handler";

AppRegistry.registerComponent("thechoice", () => gestureHandlerRootHOC(App));

export default function Index() {
  const router = useRouter();

  useFocusEffect(() => {
    // Call the replace method to redirect to a new route without adding to the history.
    // We do this in a useFocusEffect to ensure the redirect happens every time the screen
    // is focused.
    console.log("Redirecting to /home");
    router.replace("/home");
  });
  return <Text>Redirecting...</Text>;
}
