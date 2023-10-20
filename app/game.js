import React, {
  useCallback,
  useMemo,
  useRef,
  useEffect,
  useState,
  useContext,
} from "react";
import { useWindowDimensions, ActivityIndicator } from "react-native";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useIsFocused } from "@react-navigation/native";

import RouteChoice from "../components/home/RouteChoice/RouteChoice";
import { generatePaths } from "../utils/utils";
import { updateStatistics, removeStatistics } from "../database/db_statistics";
import { getSettings } from "../database/db_settings";
import ChoiceButtons from "../components/home/ChoiceButtons/ChoiceButtons";
import AnswerBottomSheet from "../components/home/AnswerBottomSheet/AnswerBottomSheet";
import { View } from "react-native-web";

const Game = () => {
  const { height, width, scale, fonctScale } = useWindowDimensions();
  const svgHeight = height * 0.7;
  const yOffset = 20;

  const [totalDistance1, setTotalDistance1] = useState(0);
  const [totalDistance2, setTotalDistance2] = useState(0);

  const [points1, setPoints1] = useState("");
  const [points2, setPoints2] = useState("");

  const [difficulty, setDifficulty] = useState(0);
  const [loading, setLoading] = useState(true);

  const isFocused = useIsFocused();

  useEffect(() => {
    async function fetchDifficulty() {
      const storedDifficulty = await getSettings();
      setDifficulty(storedDifficulty);
      console.log("difficulty fetched");
      setLoading(false);
    }
    console.log("fetchDifficulty");
    fetchDifficulty();
  }, [isFocused]);

  console.log("difficulty", difficulty);

  useEffect(() => {
    console.log("useEffect points loading");
    console.log("loading", loading);
    !loading ? updatePoints() : null;
    if (!isFocused) {
      setIsBottomSheetVisible(false);
      setDisplaySegments(false);
    }
  }, [difficulty, isFocused, loading]);

  const updatePoints = () => {
    console.log("updatePoints");
    const maxPoints = 7;
    const minDistance = svgHeight / maxPoints;
    const maxDistance = svgHeight / (maxPoints / 2);
    const {
      path1: newPoints1,
      length1: newTotalDistance1,
      path2: newPoints2,
      length2: newTotalDistance2,
    } = generatePaths(
      svgHeight,
      width,
      minDistance,
      maxDistance,
      maxPoints,
      yOffset,
      difficulty
    );
    setTotalDistance1(newTotalDistance1);
    setTotalDistance2(newTotalDistance2);
    setPoints1(newPoints1);
    setPoints2(newPoints2);
  };

  const [answer, setAnswer] = useState(false);

  const [displaySegments, setDisplaySegments] = useState(false);

  const handleButtonPress = (buttonNumber) => {
    if (
      (buttonNumber === 1 && totalDistance1 < totalDistance2) ||
      (buttonNumber === 2 && totalDistance2 < totalDistance1)
    ) {
      setAnswer(true);
    } else {
      setAnswer(false);
    }
    updateStatistics(answer, totalDistance1 - totalDistance2);
    console.log("handleButtonPress");
    setIsBottomSheetVisible(true);
    setDisplaySegments(true);
  };

  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <RouteChoice
          svgHeight={svgHeight}
          windowWidth={width}
          points1={points1}
          points2={points2}
          yOffset={yOffset}
          segments={displaySegments}
        />
        <ChoiceButtons pressCallback={handleButtonPress} />
        <AnswerBottomSheet
          isVisible={isBottomSheetVisible}
          setIsVisible={setIsBottomSheetVisible}
          answer={answer}
          updatePoints={() => {
            updatePoints();
            setDisplaySegments(false);
          }}
          totalDistance1={totalDistance1}
          totalDistance2={totalDistance2}
        />
      </SafeAreaView>
    </>
  );
};

export default Game;
