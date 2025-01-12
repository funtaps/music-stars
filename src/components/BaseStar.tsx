import { useRef, useState } from "react";
import { IcosahedronGeometry, Vector3, Mesh } from "three";
import { useSpring, animated } from "@react-spring/three";

import { BufferGeometry, Float32BufferAttribute } from "three";
// import { useFrame } from "@react-three/fiber";
import { Billboard } from "@react-three/drei";

const AnimatedMaterial = animated("meshStandardMaterial");

interface StarProps {
  position: Vector3;
  onToggle: () => void;
  isOn: boolean;
  showChildOnHover: boolean;
  showChildOnOn: boolean;
  children: React.ReactNode;
  accent?: string;
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

// react props with children
export const BaseStar: React.FC<StarProps> = ({
  position,
  onToggle,
  isOn,
  children,
  showChildOnHover,
  showChildOnOn,
  accent,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const ref = useRef<Mesh | null>(null);
  // const textRef = useRef<Mesh>(null);
  const scale = isOn ? 1.2 : 1;

  const star3dShape = create3DStarShape();

  /*useFrame(() => {
    if (!ref.current) {
      return;
    }
    if (isOn) {
      ref.current.rotation.x += 0.01;
      ref.current.rotation.y += 0.01;
      ref.current.rotation.z += 0.01;
    }
    if (!childRef.current) {
      return;
    }
    childRef.current.lookAt(camera.position);
    // Adjust the text position to always be above the star from the camera's perspective
    const starPosition = ref.current.position;
    const direction = new Vector3();
    direction.subVectors(camera.position, starPosition).normalize();
    childRef.current.position.set(
      starPosition.x - direction.x * 1.5,
      starPosition.y - direction.y * 1.5 + childMargin,
      starPosition.z - direction.z * 1.5
    );

    childRef.current.geometry.center();
  });
  */

  const springs = useSpring({
    color: isHovered ? "#ffffff" : isOn ? "#fde047" : "#4232fd",
  });

  return (
    <group
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
      scale={scale}
    >
      <mesh geometry={star3dShape} ref={ref}>
        <AnimatedMaterial
          color={accent || "#ffffff"}
          emissive={springs.color}
          emissiveIntensity={isHovered ? 1 : isOn ? 0.5 : 0.1}
          transparent
        />
      </mesh>
      <Billboard>
        {((isHovered && showChildOnHover) || (isOn && showChildOnOn)) &&
          children}
      </Billboard>
      {isOn && <pointLight color="#fde047" intensity={2} distance={5} />}
    </group>
  );
};
