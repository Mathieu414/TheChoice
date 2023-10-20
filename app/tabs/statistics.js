import { React, useEffect, useState } from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Dialog, ListItem } from "@rneui/themed";
import {
  storeUserStatistics,
  getUserStatistics,
  mergeUserStatistics,
  removeStatistics,
} from "../../database/db_statistics";
import { Stack, useRouter } from "expo-router";
import { useIsFocused } from "@react-navigation/native";

export default function Statistics() {
  const [userStatistics, setUserStatistics] = useState();
  const [reset, setReset] = useState(false);

  const isFocused = useIsFocused();

  useEffect(() => {
    // Get user statistics and store in a variable
    async function fetchUserStatistics() {
      const userStatistics = await getUserStatistics();
      setUserStatistics(userStatistics);
      console.log(userStatistics);
    }
    fetchUserStatistics();
  }, [isFocused, reset]);

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
      <SafeAreaView style={styles.container}>
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
                        .filter((stat) => !stat.score)
                        .reduce((acc, stat) => acc + stat.difference, 0) /
                        falseCount
                    )}m`
                  : "-"}
              </ListItem.Title>
            </ListItem.Content>
          </ListItem>
        </View>
        <Button
          title="Reset statistics"
          buttonStyle={{
            borderColor: "red",
          }}
          type="outline"
          titleStyle={{ color: "red", fontFamily: "DMBold" }}
          containerStyle={{
            marginHorizontal: 70,
            marginBottom: 40,
          }}
          icon={{
            name: "reload1",
            type: "antdesign",
            color: "red",
          }}
          onPress={() => {
            removeStatistics();
            setReset(!reset);
          }}
        />
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
