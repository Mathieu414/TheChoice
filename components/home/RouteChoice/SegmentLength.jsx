import React, { useEffect } from "react";
import { Polyline, Text } from "react-native-svg";

const SegmentLength = ({ stroke, points }) => {

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
                const [x, y] = point.split(",");
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
