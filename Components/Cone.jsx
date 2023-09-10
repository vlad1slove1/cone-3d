import { useRef } from 'react';
import {
  BufferGeometry,
  Float32BufferAttribute,
  MeshPhongMaterial,
  DoubleSide,
} from 'three';

function getGeometry(positions, normals, isSmooth) {
  // Create geometry
  const geometry = new BufferGeometry();
  // Create TypedArray from the positions array
  geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));

  if (isSmooth) {
    // Create TypedArray from the normals array
    geometry.setAttribute('normals', new Float32BufferAttribute(normals, 3));
    // Calculate vertex normals
    geometry.computeVertexNormals();
  }

  return geometry;
}

export default function Cone({
  position,
  rotation,
  positions,
  normals,
  isSmooth,
}) {
  // Create mesh using the geometry and material
  const mesh = useRef();
  // Create material
  const mat = new MeshPhongMaterial({
    side: DoubleSide,
    wireframe: true,
  });

  const geo = getGeometry(positions, normals, isSmooth);

  return (
    <>
      {positions && normals && (
        <mesh
          ref={mesh}
          rotation={rotation}
          position={position}
          material={mat}
          geometry={geo}
        />
      )}
    </>
  );
};
