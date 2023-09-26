import { Text } from "react-native";
import { Redirect, useRouter, useFocusEffect } from "expo-router";

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
