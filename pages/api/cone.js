// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import calcCone from '../../utils/calcCone.js'

export default function handler(req, res) {
  const [height, radius, segments] = JSON.parse(req.body);
  const parsedConeData = calcCone(Number(height), Number(radius), Number(segments))

  res.status(200).json(parsedConeData);
}
