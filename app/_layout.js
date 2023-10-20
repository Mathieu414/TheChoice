import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { useFonts } from "expo-font";
import { Stack, router } from "expo-router";
import { Icon } from "@rneui/themed";

export default function Layout() {
  const [difficulty, setDifficulty] = useState(0);

  const [fontsLoaded] = useFonts({
    DMBold: require("../assets/fonts/DMSans-Bold.ttf"),
    DMMedium: require("../assets/fonts/DMSans-Medium.ttf"),
    DMRegular: require("../assets/fonts/DMSans-Regular.ttf"),
    ComfortaaBold: require("../assets/fonts/Comfortaa-Bold.ttf"),
    ComfortaaRegular: require("../assets/fonts/Comfortaa-Regular.ttf"),
    ComfortaaLight: require("../assets/fonts/Comfortaa-Light.ttf"),
    ComfortaaMedium: require("../assets/fonts/Comfortaa-Medium.ttf"),
    ComfortaaSemiBold: require("../assets/fonts/Comfortaa-SemiBold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Stack
      screenOptions={{
        headerTransparent: true,
        title: null,
      }}
    >
      <Stack.Screen name="tabs" />
      <Stack.Screen
        name="game"
        options={{
          headerLeft: () => (
            <Icon
              name="close"
              type="antdesign"
              size={30}
              onPress={() => router.back()}
            />
          ),
        }}
      />
    </Stack>
  );
}
