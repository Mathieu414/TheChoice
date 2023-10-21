const difficulties = [
  [100, 200],
  [50, 100],
  [25, 50],
  [1, 25],
];

function generateRandomPath(
  svgHeight,
  windowWidth,
  minSegmentDistance,
  maxSegmentDistance,
  maxPoints,
  yOffset
) {
  const dpRatio = 0.15875;

  const path = [];
  const distanceArray = [];

  let x = windowWidth / 2;
  let y = svgHeight - yOffset;
  let pathLength = 0;

  path.push({ x: x, y: y });

  for (let i = 0; i < maxPoints; i++) {
    const angle = (Math.random() * 0.5 + 0.5) * 2 * Math.PI;
    let distance =
      Math.random() * (maxSegmentDistance - minSegmentDistance) +
      minSegmentDistance;
    x += Math.cos(angle) * distance;
    y += Math.sin(angle) * distance;

    securityX = 10;

    // Check if x is too close to the left edge and move it away from the edge
    if (x < securityX) {
      x = securityX;
    } else if (x > windowWidth - securityX) {
      x = windowWidth - securityX;
    }

    // Check if y is too close to the top edge and end the path
    if (y < minSegmentDistance) {
      y = minSegmentDistance;
      i = maxPoints;
    }

    // update the distance value : x and y can have updated values
    distance =
      Math.sqrt(
        Math.pow(x - path[path.length - 1].x, 2) +
          Math.pow(y - path[path.length - 1].y, 2)
      ) /
      (dpRatio * 10);
    // add distance to the distance array
    distanceArray.push(distance);
    pathLength += distance;

    path.push({ x: x, y: y });
  }

  // Add the last point at the bottom center of the screen
  path.push({ x: windowWidth / 2, y: yOffset });
  let distance =
    Math.sqrt(
      Math.pow(x - path[path.length - 1].x, 2) +
        Math.pow(y - path[path.length - 1].y, 2)
    ) /
    (dpRatio * 10);
  distanceArray.push(distance);
  pathLength += distance;

  return { path: path, pathLength: pathLength, distanceArray: distanceArray };
}

// returns true if the line from (a,b)->(c,d) intersects with (p,q)->(r,s)
function doLineSegmentsIntersect(p1, p2, p3, p4) {
  const a = p1.x,
    b = p1.y,
    c = p2.x,
    d = p2.y,
    p = p3.x,
    q = p3.y,
    r = p4.x,
    s = p4.y;
  var det, gamma, lambda;
  det = (c - a) * (s - q) - (r - p) * (d - b);
  if (det === 0) {
    return false;
  } else {
    lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
    gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;
    return 0 < lambda && lambda < 1 && 0 < gamma && gamma < 1;
  }
}

const doPathsIntersect = (path1, path2) => {
  for (let i = 0; i < path1.length - 1; i++) {
    for (let j = 0; j < path2.length - 1; j++) {
      if (
        doLineSegmentsIntersect(path1[i], path1[i + 1], path2[j], path2[j + 1])
      ) {
        console.log("intersects");
        return true;
      }
    }
  }
  return false;
};

export const generatePaths = (
  svgHeight,
  windowWidth,
  minSegmentDistance,
  maxSegmentDistance,
  maxPoints,
  yOffset,
  difficulty
) => {
  let path2, length2, distanceArray2;
  let attempts = 0;

  const {
    path: path1,
    pathLength: length1,
    distanceArray: distanceArray1,
  } = generateRandomPath(
    svgHeight,
    windowWidth,
    minSegmentDistance,
    maxSegmentDistance,
    maxPoints,
    yOffset
  );

  while (true) {
    ({
      path: path2,
      pathLength: length2,
      distanceArray: distanceArray2,
    } = generateRandomPath(
      svgHeight,
      windowWidth,
      minSegmentDistance,
      maxSegmentDistance,
      maxPoints,
      yOffset
    ));

    const currentDifference = Math.abs(length1 - length2);

    if (
      currentDifference > difficulties[difficulty][0] &&
      currentDifference < difficulties[difficulty][1] &&
      !doPathsIntersect(path1, path2)
    ) {
      console.log(length1);
      console.log(length2);
      console.log(distanceArray1);
      console.log(distanceArray2);
      break;
    }

    attempts++;

    if (attempts > 100000) {
      throw new Error("Unable to generate paths with the desired constraints.");
    }
  }

  const parsedPath1 = parsePathToSvg(path1);
  const parsedPath2 = parsePathToSvg(path2);

  return { path1: parsedPath1, length1, path2: parsedPath2, length2 };
};

const parsePathToSvg = (path) => {
  let svgPath = "";

  for (let i = 0; i < path.length; i++) {
    x = path[i].x;
    y = path[i].y;
    svgPath += `${x},${y} `;
  }

  return svgPath.trim();
};

export const getCurrentDateTimeString = () => {
  const date = new Date();
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };
  return date.toLocaleString("en-US", options).replace(/[/: ]/g, "");
};
