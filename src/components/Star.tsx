import { useRef, useState } from "react";
import { IcosahedronGeometry, Vector3, Mesh } from "three";
import type { Sound } from "../types";

import { Text3D } from "@react-three/drei";

import { BufferGeometry, Float32BufferAttribute } from "three";
import { useFrame, useThree } from "@react-three/fiber";

interface StarProps {
  sound: Sound;
  position: Vector3;
  onToggle: (id: string) => void;
  isLoading: boolean;
  isPlaying: boolean;
}

const create3DStarShape = (radius = 0.5, pyramidHeight = 0.5) => {
  // Create an Icosahedron geometry
  const icosahedron = new IcosahedronGeometry(radius, 0);
  const vertices = [];
  const indices = [];

  // Iterate over each face of the icosahedron
  const positionAttribute = icosahedron.attributes.position;
  for (let i = 0; i < positionAttribute.count; i += 3) {
    // Get the vertices of the triangle face
    const vA = new Vector3().fromBufferAttribute(positionAttribute, i);
    const vB = new Vector3().fromBufferAttribute(positionAttribute, i + 1);
    const vC = new Vector3().fromBufferAttribute(positionAttribute, i + 2);

    // Calculate the centroid of the face
    const centroid = new Vector3().addVectors(vA, vB).add(vC).divideScalar(3);

    // Calculate the new vertex position by moving outwards from the centroid
    const pyramidVertex = centroid
      .clone()
      .normalize()
      .multiplyScalar(radius + pyramidHeight);

    // Add the original vertices
    const baseIndex = vertices.length / 3;
    vertices.push(vA.x, vA.y, vA.z);
    vertices.push(vB.x, vB.y, vB.z);
    vertices.push(vC.x, vC.y, vC.z);

    // Add the new pyramid vertex
    vertices.push(pyramidVertex.x, pyramidVertex.y, pyramidVertex.z);

    // Create indices for the three new faces of the pyramid
    const apexIndex = baseIndex + 3;
    indices.push(baseIndex, baseIndex + 1, apexIndex);
    indices.push(baseIndex + 1, baseIndex + 2, apexIndex);
    indices.push(baseIndex + 2, baseIndex, apexIndex);
  }

  // Create the geometry and set attributes
  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new Float32BufferAttribute(vertices, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();

  return geometry;
};

export const Star = ({
  sound,
  position,
  onToggle,
  isLoading,
  isPlaying,
}: StarProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const { camera } = useThree();
  const ref = useRef<Mesh | null>(null);
  const textRef = useRef<Mesh>(null);
  const scale = isPlaying ? 1.2 : 1;

  const star3dShape = create3DStarShape();
  useFrame(() => {
    if (!ref.current) {
      return;
    }
    if (isPlaying) {
      ref.current.rotation.x += 0.01;
      ref.current.rotation.y += 0.01;
      ref.current.rotation.z += 0.01;
    }
    if (!isHovered || !textRef.current) {
      return;
    }
    textRef.current.lookAt(camera.position);
    // Adjust the text position to always be above the star from the camera's perspective
    const starPosition = ref.current.position;
    const direction = new Vector3();
    direction.subVectors(camera.position, starPosition).normalize();
    textRef.current.position.set(
      starPosition.x - direction.x * 1.5,
      starPosition.y - direction.y * 1.5 + 1.5,
      starPosition.z - direction.z * 1.5
    );

    textRef.current.geometry.center();
  });

  return (
    <group
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        onToggle(sound.id);
      }}
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
      scale={scale}
    >
      <mesh geometry={star3dShape} ref={ref}>
        <meshStandardMaterial
          color={"#ffffff"}
          emissive={isHovered ? "#ffffff" : isPlaying ? "#fde047" : "#4232fd"}
          emissiveIntensity={isHovered ? 1 : isPlaying ? 0.5 : 0.1}
          transparent
          opacity={isLoading ? 0.2 : 0.9}
        />
      </mesh>
      {isHovered && (
        <Text3D
          font={"https://drei.pmnd.rs/fonts/helvetiker_regular.typeface.json"}
          ref={textRef}
        >
          {sound.name}
        </Text3D>
      )}
      {isPlaying && <pointLight color="#fde047" intensity={2} distance={5} />}
    </group>
  );
};
