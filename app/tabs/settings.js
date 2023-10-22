import { React, useEffect, useState, useContext } from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Slider, Text, Icon, ListItem } from "@rneui/themed";
import MyContext from "../../components/MyContext";
import { storeSettings, getSettings } from "../../database/db_settings";
import { removeStatistics } from "../../database/db_statistics";

const difficultyMap = {
  0: "Facile",
  1: "Moyen",
  2: "Difficile",
  3: "Hardcore",
};

const Settings = () => {
  const [difficulty, setDifficulty] = useState(0);

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
        <View style={{ backgroundColor: "red" }}>
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
                  Valeur : {difficultyMap[difficulty]}
                </Text>
              </View>
            </ListItem.Content>
          </ListItem>
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
