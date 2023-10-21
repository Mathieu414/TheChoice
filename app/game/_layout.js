import { Stack, router } from "expo-router";
import { Icon } from "@rneui/themed";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerTransparent: true,
        title: null,
      }}
    >
      <Stack.Screen
        name="game_view"
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
