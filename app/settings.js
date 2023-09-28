import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SafeViewAndroid from "../components/SafeViewAndroid";

export default function Settings() {
  return (
    <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
      <Text>Settings</Text>
    </SafeAreaView>
  );
}
