/**
 * Claculate single triangle
 * @param {Number} R radius
 * @param {Number} N number of segments
 * @param {Number} i number of the node
 * @returns coordinate of the node [x, y, z]
 */
const calcTriangle = (R, N, i) => {
  const x = R * Math.cos(2 * Math.PI * i / N);
  const y = R * Math.sin(2 * Math.PI * i / N);
  const z = 0;

  return [x, y, z];
};

/**
 * Calculate triangle's normal to make it smooth
 * @param {Number} B point on a cone axis
 * @param {Number} Pi triangulation node
 * @returns normale of the node [x, y, z]
 */
const calcNormal = (B, Pi) => {
  const magnitude = Math.sqrt((Pi[0] - B[0]) ** 2 + (Pi[1] - B[1]) ** 2 + (Pi[2] - B[2]) ** 2);
  const Ni = [Pi[0] - B[0], Pi[1] - B[1], Pi[2] - B[2]];

  return [Ni[0] / magnitude, Ni[1] / magnitude, Ni[2] / magnitude];
}

/**
 * Calculate cone's positions and normales
 * @param {Number} height
 * @param {Number} radius
 * @param {Number} segmentsCount
 * @returns Collection of positions and normales: { conePositions: [pos1, pos2...], coneNormals: [normal1, normal2...] }
 */
const getConeData = (height, radius, segmentsCount) => {
  const conePositions = [];
  const coneNormals = [];

  const B = [0, 0, -(radius ** 2) / height];
  const coneApex = [0, 0, height];

  for (let i = 0; i < segmentsCount; i += 1) {
    const PiPos = calcTriangle(radius, segmentsCount, i);
    const PnextPos = calcTriangle(radius, segmentsCount, i + 1);

    conePositions.push(...coneApex);
    conePositions.push(...PiPos);
    conePositions.push(...PnextPos);

    coneNormals.push(...calcNormal(B, coneApex));
    coneNormals.push(...calcNormal(B, PiPos));
    coneNormals.push(...calcNormal(B, PnextPos));
  }

  return {conePositions, coneNormals};
}

export default getConeData;
