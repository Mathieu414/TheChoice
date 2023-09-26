import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Dimensions,
  Text,
  Pressable,
  Platform,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { Icon } from "@rneui/themed";
import { Link, Stack } from "expo-router";

import SafeViewAndroid from "../components/SafeViewAndroid";
import RouteChoice from "../components/home/RouteChoice/RouteChoice";
import { generateRandomPoints } from "../utils/utils";
import AnswerDialog from "../components/AnswerDialog";
import { updateStatistics, removeStatistics } from "../database/db";
import ChoiceButtons from "../components/home/ChoiceButtons/ChoiceButtons";
import SimpleMenu from "../components/popUpMenu/SimpleMenu";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const svgHeight = windowHeight * 0.8;

const App = () => {
  const [totalDistance1, setTotalDistance1] = useState(0);
  const [totalDistance2, setTotalDistance2] = useState(0);

  const [points1, setPoints1] = useState();
  const [points2, setPoints2] = useState();

  const [updatePoints, setUpdatePoints] = useState(0);

  const [userStatistics, setUserStatistics] = useState();

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
    let answer = false;
    if (
      (buttonNumber === 1 && totalDistance1 < totalDistance2) ||
      (buttonNumber === 2 && totalDistance2 < totalDistance1)
    ) {
      setVisible1(true);
      answer = true;
    } else {
      setVisible2(true);
      answer = false;
    }
    updateStatistics(answer, totalDistance1 - totalDistance2);
  };

  return (
    <>
      <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
        <Stack.Screen
          options={{
            headerTransparent: true,
            headerRight: () => <SimpleMenu removeFunction={removeStatistics} />,
            headerTitle: "",
          }}
        />
        <RouteChoice
          svgHeight={svgHeight}
          windowWidth={windowWidth}
          points1={points1}
          points2={points2}
        />
        <ChoiceButtons pressCallback={handleButtonPress} />
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

export default App;
