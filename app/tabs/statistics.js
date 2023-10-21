import { React, useState, useEffect } from "react";
import { Pressable, StyleSheet } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { getUserStatistics } from "../../database/db_statistics";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";

import { ListItem } from "@rneui/themed";

export default function Statistics() {
  const [userStatistics, setUserStatistics] = useState();
  const [reset, setReset] = useState(false);

  const isFocused = useIsFocused();

  useEffect(() => {
    // Get user statistics and store in a variable
    async function fetchUserStatistics() {
      const newUserStatistics = await getUserStatistics();
      setUserStatistics(Object.entries(newUserStatistics));
      console.log("user stats : ", userStatistics);
    }
    fetchUserStatistics();
  }, [isFocused, reset]);

  return (
    <>
      <SafeAreaView style={styles.container}>
        {userStatistics &&
          userStatistics.map(([id, _]) => (
            <Link key={id} href={"statistics/" + id} asChild>
              <Pressable>
                <ListItem key={id} bottomDivider>
                  <ListItem.Content>
                    <ListItem.Title>{id}</ListItem.Title>
                  </ListItem.Content>
                </ListItem>
              </Pressable>
            </Link>
          ))}
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
});
