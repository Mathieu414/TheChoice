import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { useFonts } from "expo-font";
import { Stack, router } from "expo-router";
import { Icon } from "@rneui/themed";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Layout() {
  const [difficulty, setDifficulty] = useState(0);

  const [fontsLoaded] = useFonts({
    DMBold: require("../assets/fonts/DMSans-Bold.ttf"),
    DMMedium: require("../assets/fonts/DMSans-Medium.ttf"),
    DMRegular: require("../assets/fonts/DMSans-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerShown: false, // hide the header
        }}
      >
        <Stack.Screen name="tabs" />
        <Stack.Screen name="game" />
        <Stack.Screen
          name="statistics"
          options={{
            headerLeft: () => (
              <Icon
                name="close"
                type="antdesign"
                size={30}
                onPress={() => router.replace("tabs/home")}
              />
            ),
          }}
        />
      </Stack>
    </GestureHandlerRootView>
  );
}
