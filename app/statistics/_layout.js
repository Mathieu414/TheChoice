import { Stack } from "expo-router";
import { Icon } from "@rneui/themed";
import { router } from "expo-router";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerTransparent: true,
        title: null,
      }}
    >
      <Stack.Screen
        name="[session_id]"
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
  );
}
