import { React, useEffect, useState } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, ListItem } from "@rneui/themed";
import {
  getUserStatistics,
  removeStatistics,
} from "../../database/db_statistics";
import { useIsFocused } from "@react-navigation/native";
import { useLocalSearchParams } from "expo-router";

export default function SessionStatistics() {
  const local = useLocalSearchParams();

  console.log("Session id : ", local.session_id);

  const [userStatistics, setUserStatistics] = useState();
  const [reset, setReset] = useState(false);

  const isFocused = useIsFocused();

  useEffect(() => {
    // Get user statistics and store in a variable
    async function fetchUserStatistic(sessionId) {
      const newUserStatistics = await getUserStatistics();
      setUserStatistics(newUserStatistics[sessionId]);
    }
    fetchUserStatistic(local.session_id);
    console.log("single entry stat : ", userStatistics);
  }, [isFocused, reset]);

  // Count the number of true and false scores
  let trueCount = 0;
  let falseCount = 0;
  if (userStatistics) {
    userStatistics.forEach((stat) => {
      if (stat.answer === true) {
        trueCount++;
      } else {
        falseCount++;
      }
    });
  }

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={{ alignItems: "center" }}>
            <Text
              style={{
                fontSize: 30,
                fontFamily: "DMBold",
                margin: 20,
              }}
            >
              Statistiques
            </Text>
          </View>
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
                    : "-"}
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
                          .filter((stat) => !stat.answer)
                          .reduce((acc, stat) => acc + stat.difference, 0) /
                          falseCount
                      )}m`
                    : "-"}
                </ListItem.Title>
              </ListItem.Content>
            </ListItem>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
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
    fontFamily: "DMRegular",
  },
  successText: {
    fontSize: 40,
    fontWeight: "bold",
  },
});
