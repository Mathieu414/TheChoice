import React, {
  useCallback,
  useMemo,
  useRef,
  useEffect,
  useState,
} from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Dimensions,
  Text,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { Icon } from "@rneui/themed";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";

import SafeViewAndroid from "../components/SafeViewAndroid";
import RouteChoice from "../components/home/RouteChoice/RouteChoice";
import { generateRandomPoints } from "../utils/utils";
import AnswerDialog from "../components/AnswerDialog";
import { updateStatistics, removeStatistics } from "../database/db";
import ChoiceButtons from "../components/home/ChoiceButtons/ChoiceButtons";
import SimpleMenu from "../components/popUpMenu/SimpleMenu";
import AnswerBottomSheet from "../components/home/AnswerBottomSheet/AnswerBottomSheet";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const svgHeight = windowHeight * 0.8;

const App = () => {
  const [totalDistance1, setTotalDistance1] = useState(0);
  const [totalDistance2, setTotalDistance2] = useState(0);

  const [points1, setPoints1] = useState();
  const [points2, setPoints2] = useState();

  const [userStatistics, setUserStatistics] = useState();

  const updatePoints = () => {
    const { points: newPoints1, totalDistance: newTotalDistance1 } =
      generateRandomPoints(svgHeight, windowWidth);
    const { points: newPoints2, totalDistance: newTotalDistance2 } =
      generateRandomPoints(svgHeight, windowWidth);
    setTotalDistance1(newTotalDistance1);
    setTotalDistance2(newTotalDistance2);
    setPoints1(newPoints1);
    setPoints2(newPoints2);
  };

  useEffect(() => {
    updatePoints();
  }, []);

  const [answer, setAnswer] = useState(false);

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
    handlePresentModalPress();
  };

  // ref
  const bottomSheetModalRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ["18%"], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  return (
    <>
      <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
        <BottomSheetModalProvider>
          <RouteChoice
            svgHeight={svgHeight}
            windowWidth={windowWidth}
            points1={points1}
            points2={points2}
          />
          <ChoiceButtons pressCallback={handleButtonPress} />
          <AnswerBottomSheet
            bottomSheetModalRef={bottomSheetModalRef}
            snapPoints={snapPoints}
            answer={answer}
            updatePoints={() => {
              updatePoints();
            }}
            totalDistance1={totalDistance1}
            totalDistance2={totalDistance2}
          />
        </BottomSheetModalProvider>
      </SafeAreaView>
    </>
  );
};

export default App;
