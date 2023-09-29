export function generateRandomPoints(svgHeight, windowWidth) {
  const dpRatio = 0.15875;

  const numPoints = 7;
  const minDistance = svgHeight / numPoints;
  const maxDistance = svgHeight / (numPoints / 2);
  const points = [];

  let x = windowWidth / 2;
  let y = svgHeight - 47.5;
  let totalDistance = 0;

  points.push(`${x},${y}`);

  for (let i = 0; i < numPoints; i++) {
    const angle = (Math.random() * 0.5 + 0.5) * 2 * Math.PI;
    const distance = Math.random() * (maxDistance - minDistance) + minDistance;
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
    if (y < minDistance) {
      y = minDistance;
      i = numPoints;
    }

    // totalDistance is now in millimeters
    totalDistance +=
      Math.sqrt(
        Math.pow(x - points[points.length - 1].split(",")[0], 2) +
          Math.pow(y - points[points.length - 1].split(",")[1], 2)
      ) / dpRatio;

    points.push(`${x},${y}`);
  }

  // Add the last point at the bottom center of the screen
  points.push(`${windowWidth / 2},${47.5}`);

  return { points: points.join(" "), totalDistance: totalDistance };
}
