import { React, useState, useEffect } from "react";
import {
  Pressable,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import {
  getUserStatistics,
  removeStatisticsById,
  removeStatistics,
} from "../../database/db_statistics";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";

import { ListItem, Icon } from "@rneui/themed";

export default function Statistics() {
  const [userStatistics, setUserStatistics] = useState();
  const [reset, setReset] = useState(false);

  const isFocused = useIsFocused();

  useEffect(() => {
    // Get user statistics and store in a variable
    async function fetchUserStatistics() {
      const newUserStatistics = await getUserStatistics();
      setUserStatistics(
        newUserStatistics ? Object.entries(newUserStatistics) : null
      );
    }
    fetchUserStatistics();
  }, [isFocused, reset]);

  const deleteRow = (id) => {
    removeStatisticsById(id).then(() => {
      setReset(!reset);
    });
  };

  const calculateScore = (data) => {
    let trueCount = 0;
    let falseCount = 0;
    data.forEach((stat) => {
      if (stat.answer === true) {
        trueCount++;
      } else {
        falseCount++;
      }
    });
    return (trueCount / (falseCount + trueCount)) * 100;
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <Text style={styles.title}>Parties</Text>
          {userStatistics ? (
            userStatistics.map(([id, data]) => (
              <Link key={id} href={"statistics/" + id} asChild>
                <Pressable>
                  <ListItem key={id} bottomDivider>
                    <ListItem.Content>
                      <ListItem.Title style={styles.listTitle}>
                        <Text style={styles.scoreText}>
                          {calculateScore(data).toFixed(0) + "%"}
                        </Text>
                      </ListItem.Title>
                      <ListItem.Subtitle style={styles.subtitle}>
                        {new Date(
                          id.slice(4, 8) +
                            "-" +
                            id.slice(0, 2) +
                            "-" +
                            id.slice(2, 4) +
                            "T" +
                            id.slice(9, 11) +
                            ":" +
                            id.slice(11, 13) +
                            ":" +
                            id.slice(13, 15)
                        ).toLocaleString("fr-FR", {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </ListItem.Subtitle>
                    </ListItem.Content>
                    <TouchableOpacity onPress={() => deleteRow(id)}>
                      <Icon name="delete" type="ant-design" color="red" />
                    </TouchableOpacity>
                  </ListItem>
                </Pressable>
              </Link>
            ))
          ) : (
            <Text style={styles.defaultText}>Pas de sessions enregistrées</Text>
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  defaultText: {
    fontFamily: "DMRegular",
    fontSize: 20,
    textAlign: "center",
  },
  listTitle: {
    fontFamily: "DMRegular",
    fontSize: 20,
  },
  title: {
    fontFamily: "DMBold",
    fontSize: 30,
    textAlign: "center",
    margin: 20,
  },
  scoreText: {
    fontSize: 40,
    fontWeight: "bold",
  },
  subtitle: {
    fontFamily: "DMRegular",
    fontSize: 15,
  },
});
