import { Svg, Circle, Line } from "react-native-svg";
import RandomPath from "./RandomPath";

const RouteChoice = ({svgHeight, windowWidth, points1, points2}) => {
return <Svg height={svgHeight}>
          <Circle
            cx={windowWidth / 2}
            cy="47.5"
            r="30"
            stroke="purple"
            strokeWidth="2.5"
            fillOpacity={0}
          />
          <RandomPath stroke={"black"} points={points1} />
          <Line
            x1={windowWidth / 2}
            y1="77.5"
            x2={windowWidth / 2}
            y2={svgHeight - 77.5}
            stroke="purple"
            strokeWidth="2.5"
          />
          <RandomPath stroke={"red"} points={points2} />
          <Circle
            cx={windowWidth / 2}
            cy={svgHeight - 47.5}
            r="30"
            stroke="purple"
            strokeWidth="2.5"
            fillOpacity={0}
          />
        </Svg>
}

export default RouteChoice;