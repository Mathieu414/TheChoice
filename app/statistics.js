import { React, useEffect, useState } from "react";
import { SafeAreaView, View, StyleSheet, Dimensions, Text } from "react-native";
import { Button, Dialog } from "@rneui/themed";
import SafeViewAndroid from "../components/SafeViewAndroid";
import {
  storeUserStatistics,
  getUserStatistics,
  mergeUserStatistics,
} from "../database/db";
import { Stack, useRouter } from "expo-router";
import { color } from "@rneui/base";

export default function Statistics() {
  const [userStatistics, setUserStatistics] = useState();

  const router = useRouter();

  useEffect(() => {
    // Get user statistics and store in a variable
    async function fetchUserStatistics() {
      const userStatistics = await getUserStatistics();
      setUserStatistics(userStatistics);
      console.log(userStatistics);
    }
    fetchUserStatistics();
  }, []);

  // Count the number of true and false scores
  let trueCount = 0;
  let falseCount = 0;
  if (userStatistics) {
    userStatistics.forEach((stat) => {
      if (stat.score === true) {
        trueCount++;
      } else {
        falseCount++;
      }
    });
  }

  return (
    <>
      <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
        <Stack.Screen
          options={{
            headerShadowVisible: false,
            headerTitle: "Statistics",
          }}
        />
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreText}>
            <Text style={{ color: "green" }}>{trueCount}</Text>
            <Text> : </Text>
            <Text style={{ color: "red" }}>{falseCount}</Text>
          </Text>
          <Text style={styles.scoreText}>
            {trueCount || falseCount
              ? `${(trueCount / (trueCount + falseCount)) * 100}%`
              : "Pas de données"}
          </Text>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  scoreContainer: {
    flex: 1,
  },
  scoreText: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
  },
});
