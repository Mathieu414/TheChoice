import React, { useEffect, useState } from "react";
import { useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useIsFocused } from "@react-navigation/native";
import { router } from "expo-router";

import RouteChoice from "../../components/home/RouteChoice/RouteChoice";
import { generatePaths } from "../../utils/utils";
import {
  updateStatistics,
  removeStatistics,
} from "../../database/db_statistics";
import { getSettings } from "../../database/db_settings";
import ChoiceButtons from "../../components/home/ChoiceButtons/ChoiceButtons";
import AnswerBottomSheet from "../../components/home/AnswerBottomSheet/AnswerBottomSheet";
import { getCurrentDateTimeString } from "../../utils/utils";

const Game = () => {
  // get the window dimensions
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

  const [sessionCount, setSessionCount] = useState(0);

  const [sessionScore, setSessionScore] = useState([]);

  const [time, setTime] = useState([0, 0]);

  // fetch difficulty from database
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

  // update points when difficulty changes
  useEffect(() => {
    console.log("useEffect points loading");
    !loading ? updatePoints() : null;
    if (!isFocused) {
      setIsBottomSheetVisible(false);
      setDisplaySegments(false);
    }
  }, [difficulty, isFocused, loading]);

  const updatePoints = () => {
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
    setTime([Date.now(), 0]);
  };

  const [answer, setAnswer] = useState(false);

  const [displaySegments, setDisplaySegments] = useState(false);

  const choiceButtonPress = (buttonNumber) => {
    // define an answer variable to store the user's answer locally.
    var answer;
    console.log("button pressed : ", buttonNumber);
    //TODO: add time here
    if (
      (buttonNumber === 1 && totalDistance1 < totalDistance2) ||
      (buttonNumber === 2 && totalDistance2 < totalDistance1)
    ) {
      answer = true;
    } else {
      answer = false;
    }
    setSessionCount(sessionCount + 1);
    setSessionScore([
      ...sessionScore,
      {
        answer: answer,
        difference: Math.abs(totalDistance1 - totalDistance2),
        time: Date.now() - time[0],
      },
    ]);
    setIsBottomSheetVisible(true);
    setDisplaySegments(true);
    // store the answer variable in the state, which will be executed AFTER the function ends
    setAnswer(answer);
    setTime([time[0], Date.now()]);
  };

  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

  const continueButtonPress = () => {
    setIsBottomSheetVisible(false);
    updatePoints();
    setDisplaySegments(false);
    if (sessionCount === 10) {
      setSessionCount(0);
      setSessionScore([]);
      const dateString = getCurrentDateTimeString();
      updateStatistics(dateString, sessionScore).then(() => {
        router.replace("statistics/" + dateString + "?canPlayAgain=true");
      });
    }
  };

  console.log("sessionCount", sessionCount);

  console.log("sessionScore", sessionScore);

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
        <ChoiceButtons pressCallback={choiceButtonPress} />
        <AnswerBottomSheet
          isVisible={isBottomSheetVisible}
          answer={answer}
          time={time[1] - time[0]}
          totalDistance1={totalDistance1}
          totalDistance2={totalDistance2}
          continueButtonPress={() => {
            continueButtonPress();
          }}
        />
      </SafeAreaView>
    </>
  );
};

export default Game;
