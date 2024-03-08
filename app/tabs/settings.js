import { React, useEffect, useState, useContext } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Slider, Text, Icon, ListItem, Button } from "@rneui/themed";
import MyContext from "../../components/MyContext";
import { storeSettings, getSettings } from "../../database/db_settings";
import { removeStatistics } from "../../database/db_statistics";

const difficultyStringMap = {
  0: "Facile",
  1: "Moyen",
  2: "Difficile",
  3: "Hardcore",
};

const difficultyValueMap = {
  0: [100, 200],
  1: [50, 100],
  2: [25, 50],
  3: [1, 25],
};

const Settings = () => {
  const [difficulty, setDifficulty] = useState(null);

  useEffect(() => {
    async function fetchDifficulty() {
      const storedDifficulty = await getSettings();
      console.log("storedDifficulty", storedDifficulty);
      setDifficulty(storedDifficulty);
    }
    fetchDifficulty();
  }, []);

  console.log("difficulty", difficulty);

  const sliderChange = (value) => {
    console.log("value", value);
    storeSettings(value);
    setDifficulty(value);
    removeStatistics();
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Settings</Text>
        <View>
          {difficulty === null ? (
            <ActivityIndicator size="large" />
          ) : (
            <ListItem bottomDivider>
              <ListItem.Content>
                <ListItem.Title style={styles.listTitle}>
                  Niveau de difficulté
                </ListItem.Title>
                <View style={styles.contentView}>
                  <Slider
                    value={difficulty}
                    onSlidingComplete={sliderChange}
                    maximumValue={3}
                    minimumValue={0}
                    step={1}
                    allowTouchTrack
                    trackStyle={{ height: 5, backgroundColor: "transparent" }}
                    thumbStyle={{
                      height: 20,
                      width: 20,
                      backgroundColor: "red",
                    }}
                  />
                  <Text style={styles.textIndicator}>
                    {difficultyStringMap[difficulty]}
                  </Text>
                  <Text style={styles.description}>
                    <Icon name="infocirlce" type="antdesign" size={12} />{" "}
                    Différence de choix comprise entre{" "}
                    {difficultyValueMap[difficulty][0]} et{" "}
                    {difficultyValueMap[difficulty][1]} m
                  </Text>
                </View>
              </ListItem.Content>
            </ListItem>
          )}
        </View>
        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          <Button
            title="Remise à zéro"
            buttonStyle={{
              borderColor: "red",
            }}
            type="outline"
            titleStyle={{ color: "red", fontFamily: "DMBold" }}
            containerStyle={{
              marginHorizontal: 70,
              marginVertical: 40,
            }}
            icon={{
              name: "delete",
              type: "antdesign",
              color: "red",
            }}
            onPress={() => {
              removeStatistics();
            }}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  contentView: {
    padding: 20,
    width: "100%",
    justifyContent: "center",
    alignItems: "stretch",
  },
  subHeader: {
    backgroundColor: "#2089dc",
    color: "white",
    textAlign: "center",
    paddingVertical: 5,
    marginBottom: 10,
  },
  listTitle: {
    fontSize: 25,
    fontFamily: "DMBold",
  },
  textIndicator: {
    fontSize: 20,
    color: "grey",
    fontFamily: "DMRegular",
    alignItems: "center",
  },
  description: {
    fontSize: 15,
    color: "grey",
    fontFamily: "DMRegular",
    alignItems: "center",
  },
  title: {
    fontFamily: "DMBold",
    fontSize: 30,
    margin: 20,
    textAlign: "center",
  },
});

export default Settings;
