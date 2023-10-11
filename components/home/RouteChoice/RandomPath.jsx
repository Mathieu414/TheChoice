import React, { useEffect } from "react";
import { Polyline, Text } from "react-native-svg";

const RandomPath = ({ stroke, points }) => {

  return (
    <>
      <Polyline points={points} fill="none" stroke={stroke} strokeWidth="3" />
    </>
  );
};


export default RandomPath;
