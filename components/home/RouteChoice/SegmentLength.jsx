import React, { useEffect } from "react";
import { View } from "react-native";
import { Text } from "react-native-svg";
import { useWindowDimensions } from "react-native";

const SegmentLength = ({ stroke, points }) => {

    // get the window dimensions
    const { height, width, scale, fonctScale } = useWindowDimensions();

    let totalDistance = 0;
    let accumulatedDistance = [0];
    const pointsArray = points ? points.split(" ") : [];
    for (let i = 0; i < pointsArray.length - 1; i++) {
        const [x1, y1] = pointsArray[i].split(",");
        const [x2, y2] = pointsArray[i + 1].split(",");
        const distance = (Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2) / 1.5875);
        totalDistance += distance;
        accumulatedDistance.push(totalDistance);
    }

    return (
        <>
            {points.split(" ").map((point, index) => {
                let [x, y] = point.split(",");
                if (x < 20) {
                    x = 20;
                }
                if (x > width - 20) {
                    x = width - 20;
                }
                if (y < 30 && stroke === "black") {
                    y = 30;
                    x = x - 35;
                }
                if (y < 30 && stroke === "red") {
                    y = 30;
                }
                return (
                    <Text
                        key={index}
                        x={x}
                        y={y}
                        fill={stroke}
                        fontSize="16"
                        fontWeight="bold"
                        textAnchor="middle"
                        dy="-10"
                    >
                        {Math.round(accumulatedDistance[index])}
                    </Text>
                );
            })}
        </>
    );
};


export default SegmentLength;
