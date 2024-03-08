import { Svg, Circle, Line } from "react-native-svg";
import { Text } from "react-native";
import RandomPath from "./RandomPath";
import SegmentLength from "./SegmentLength";

const RouteChoice = ({ svgHeight, windowWidth, points1, points2, yOffset, segments }) => {
  const dpRatio = 0.15875;



  return <Svg height={svgHeight}>
    <Text style={{
      fontFamily: "DMRegular",
      fontSize: 18,
      position: 'absolute',
      top: 0,
      right: 10,
    }}>Échelle 1:4000</Text>
    <Circle
      cx={windowWidth / 2}
      cy={yOffset}
      r={3 / dpRatio}
      stroke="purple"
      strokeWidth="2.5"
      fillOpacity={0}
    />
    <RandomPath stroke={"black"} points={points1} />

    <Line
      x1={windowWidth / 2}
      y1={yOffset + (3 / dpRatio)}
      x2={windowWidth / 2}
      y2={svgHeight - (yOffset + (3 / dpRatio))}
      stroke="purple"
      strokeWidth="2.5"
    />
    <RandomPath stroke={"red"} points={points2} />
    <Circle
      cx={windowWidth / 2}
      cy={svgHeight - yOffset}
      r={3 / dpRatio}
      stroke="purple"
      strokeWidth="2.5"
      fillOpacity={0}
    />
  </Svg>
}

export default RouteChoice;