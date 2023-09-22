import React, { useEffect, useState } from "react";
import { SafeAreaView, View, StyleSheet, Dimensions, Text } from "react-native";
import { Button, Dialog } from "@rneui/themed";
import SafeViewAndroid from "./components/SafeViewAndroid";
import RandomPath from "./components/RandomPath";
import { generateRandomPoints } from "./utils/utils";
import AnswerDialog from "./components/AnswerDialog";
import Svg, { Circle, Rect, Polyline } from "react-native-svg";
import { color } from "@rneui/base";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const svgHeight = windowHeight * 0.7;

const App = () => {
  const [totalDistance1, setTotalDistance1] = useState(0);
  const [totalDistance2, setTotalDistance2] = useState(0);

  const [points1, setPoints1] = useState();
  const [points2, setPoints2] = useState();

  const [updatePoints, setUpdatePoints] = useState(0);

  useEffect(() => {
    const { points: newPoints1, totalDistance: newTotalDistance1 } =
      generateRandomPoints(svgHeight, windowWidth);
    const { points: newPoints2, totalDistance: newTotalDistance2 } =
      generateRandomPoints(svgHeight, windowWidth);
    setTotalDistance1(newTotalDistance1);
    setTotalDistance2(newTotalDistance2);
    setPoints1(newPoints1);
    setPoints2(newPoints2);
  }, [updatePoints]);

  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);

  const handleButtonPress = (buttonNumber) => {
    if (
      (buttonNumber === 1 && totalDistance1 < totalDistance2) ||
      (buttonNumber === 2 && totalDistance2 < totalDistance1)
    ) {
      setVisible1(true);
    } else {
      setVisible2(true);
    }
  };

  return (
    <>
      <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
        <Svg height={svgHeight}>
          <RandomPath stroke={"black"} points={points1} />
          <RandomPath stroke={"red"} points={points2} />
        </Svg>
        <View style={styles.buttonsContainer}>
          <View style={styles.inlineButtonsContainer}>
            <Button
              title="Choix Noir"
              buttonStyle={[styles.button, { backgroundColor: "black" }]}
              containerStyle={[styles.buttonContainer, { marginEnd: 20 }]}
              titleStyle={{ fontWeight: "bold" }}
              onPress={() => handleButtonPress(1)}
            />
            <Button
              title="Choix Rouge"
              buttonStyle={[styles.button, { backgroundColor: "red" }]}
              containerStyle={[styles.buttonContainer, { marginStart: 20 }]}
              titleStyle={{ fontWeight: "bold" }}
              onPress={() => handleButtonPress(2)}
            />
          </View>
        </View>

        <AnswerDialog
          answer={true}
          totalDistance1={totalDistance1}
          totalDistance2={totalDistance2}
          visible={visible1}
          escapeFunction={() => {
            setVisible1(false);
            setUpdatePoints(updatePoints + 1);
          }}
        />

        <AnswerDialog
          answer={false}
          totalDistance1={totalDistance1}
          totalDistance2={totalDistance2}
          visible={visible2}
          escapeFunction={() => {
            setVisible2(false);
            setUpdatePoints(updatePoints + 1);
          }}
        />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  buttonsContainer: {
    alignItems: "center",
    height: "20%",
  },
  inlineButtonsContainer: {
    flexDirection: "row",
  },
  button: {
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 50,
    height: 100,
  },
  buttonContainer: {
    marginVertical: 10,
    width: 150,
  },
});

export default App;
