import React, {
  useCallback,
  useMemo,
  useRef,
  useEffect,
  useState,
} from "react";
import { SafeAreaView, useWindowDimensions } from "react-native";
import { Icon } from "@rneui/themed";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

import SafeViewAndroid from "../components/SafeViewAndroid";
import RouteChoice from "../components/home/RouteChoice/RouteChoice";
import { generatePaths } from "../utils/utils";
import { updateStatistics, removeStatistics } from "../database/db";
import ChoiceButtons from "../components/home/ChoiceButtons/ChoiceButtons";
import AnswerBottomSheet from "../components/home/AnswerBottomSheet/AnswerBottomSheet";

const App = () => {
  const { height, width, scale, fonctScale } = useWindowDimensions();
  console.log("height", height);
  console.log("width", width);
  const svgHeight = height * 0.8;
  const yOffset = 80;

  const [totalDistance1, setTotalDistance1] = useState(0);
  const [totalDistance2, setTotalDistance2] = useState(0);

  const [points1, setPoints1] = useState();
  const [points2, setPoints2] = useState();

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
      "hard"
    );
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
            windowWidth={width}
            points1={points1}
            points2={points2}
            yOffset={yOffset}
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
