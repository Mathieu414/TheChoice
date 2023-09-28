import { React, useEffect, useState } from "react";
import { SafeAreaView, View, StyleSheet, Dimensions, Text } from "react-native";
import { Button, Dialog, ListItem } from "@rneui/themed";
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
        <View style={styles.scoreContainer}>
          <View style={{ alignItems: "center" }}>
            <Text style={styles.scoreSubtitle}>Score</Text>
            <Text style={styles.scoreText}>
              <Text style={{ color: "green" }}>{trueCount}</Text>
              <Text> : </Text>
              <Text style={{ color: "red" }}>{falseCount}</Text>
            </Text>
          </View>
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Subtitle style={styles.scoreSubtitle}>
                Réussite
              </ListItem.Subtitle>
              <ListItem.Title style={styles.successText}>
                {trueCount || falseCount
                  ? `${Math.round(
                      (trueCount / (trueCount + falseCount)) * 100
                    )}%`
                  : "Pas de données"}
              </ListItem.Title>
            </ListItem.Content>
          </ListItem>
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Subtitle style={styles.scoreSubtitle}>
                Ecart moyen des mauvaises réponses
              </ListItem.Subtitle>
              <ListItem.Title style={styles.successText}>
                {userStatistics && falseCount > 0
                  ? `${Math.round(
                      userStatistics
                        .filter((stat) => !stat.score)
                        .reduce((acc, stat) => acc + stat.difference, 0) /
                        falseCount
                    )}`
                  : "Pas de données"}
              </ListItem.Title>
            </ListItem.Content>
          </ListItem>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  scoreContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  scoreText: {
    fontSize: 80,
    fontWeight: "bold",
  },
  scoreSubtitle: {
    fontSize: 18,
    color: "grey",
  },
  successText: {
    fontSize: 40,
    fontWeight: "bold",
  },
});
