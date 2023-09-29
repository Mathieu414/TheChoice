import { useFonts } from "expo-font";
import { Tabs } from "expo-router";
import { Icon } from "@rneui/themed";

export default function Layout() {
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
    <Tabs
      screenOptions={{
        tabBarShowLabel: false, // hide labels
        headerShown: false, // hide the header
        tabBarActiveTintColor: "#e91e63",
      }}
    >
      <Tabs.Screen
        // Name of the route to hide.
        name="index"
        options={{
          // This tab will no longer show up in the tab bar.
          href: null,
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" type="antdesign" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="statistics"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="barschart" type="antdesign" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="setting" type="antdesign" color={color} size={size} />
          ),
          href: null,
        }}
      />
    </Tabs>
  );
}
