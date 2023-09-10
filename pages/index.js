import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

import Cone from '../Components/Cone.jsx'
import Options from '../Components/Options.jsx'

export default function Home() {
  const [coneData, setConeData] = useState({});
  const [height, setHeight] = useState('3');
  const [radius, setRadius] = useState('2');
  const [segments, setSegments] = useState('8');
  const [isSmooth, setIsSmooth] = useState(false);

  useEffect(() => {
    async function postData() {
      const response = await fetch('/api/cone', {
        method: 'POST',
        body: JSON.stringify([height, radius, segments])
      })

      const data = await response.json();
      setConeData(data);
    }

    postData();
  }, [height, radius, segments]);

  return (
    <div className="container" style={{ display: 'inline-flex' }}>
      <div className="options">
        <Options
          height={height}
          radius={radius}
          segments={segments}
          isSmooth={isSmooth}
          setHeight={setHeight}
          setRadius={setRadius}
          setSegments={setSegments}
          setIsSmooth={setIsSmooth}
        />
      </div>

      <div className="canvas" style={{ height: '700px', width: '100%' }}>
        <Canvas mode="concurrent">
          {coneData.conePositions && coneData.coneNormals && (
            <Cone
              position={[-1, 2, -2]}
              rotation={[-1.75, -0.75, 0.5]}
              positions={coneData.conePositions}
              normals={coneData.coneNormals}
              isSmooth={isSmooth}
            />
          )}

          <OrbitControls />
        </Canvas>
      </div>
    </div>
  );
}
