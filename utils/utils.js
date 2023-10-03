const difficulties = {
  easy: [100, 200],
  medium: [50, 100],
  hard: [25, 50],
  hardcore: [1, 25],
};

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
      ) / dpRatio;
    // add distance to the distance array
    distanceArray.push(distance);
    pathLength += distance;

    path.push({ x: x, y: y });
  }

  // Add the last point at the bottom center of the screen
  path.push({ x: windowWidth / 2, y: yOffset });

  return { path: path, pathLength: pathLength };
}

// Helper function to check if two line segments intersect
const doLineSegmentsIntersect = (p1, p2, q1, q2) => {
  const dx1 = p2.x - p1.x;
  const dy1 = p2.y - p1.y;
  const dx2 = q2.x - q1.x;
  const dy2 = q2.y - q1.y;

  const denominator = dx1 * dy2 - dy1 * dx2;
  if (denominator === 0) {
    return false; // Lines are parallel
  }

  const t1 = ((q1.x - p1.x) * dy2 - (q1.y - p1.y) * dx2) / denominator;
  const t2 = ((q1.x - p1.x) * dy1 - (q1.y - p1.y) * dx1) / denominator;

  return t1 >= 0 && t1 <= 1 && t2 >= 0 && t2 <= 1;
};

const doPathsIntersect = (path1, path2) => {
  for (let i = 0; i < path1.length - 1; i++) {
    for (let j = 0; j < path2.length - 1; j++) {
      if (
        doLineSegmentsIntersect(path1[i], path1[i + 1], path2[j], path2[j + 1])
      ) {
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
  let path2, length2;
  let attempts = 0;

  const { path: path1, pathLength: length1 } = generateRandomPath(
    svgHeight,
    windowWidth,
    minSegmentDistance,
    maxSegmentDistance,
    maxPoints,
    yOffset
  );

  while (true) {
    ({ path: path2, pathLength: length2 } = generateRandomPath(
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
      currentDifference < difficulties[difficulty][1]
    ) {
      break;
    }

    attempts++;

    if (attempts > 1000) {
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
