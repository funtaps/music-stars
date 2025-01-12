import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import type { StarConfig } from "../types";
import { Stars } from "@react-three/drei";
import { Text } from "@react-three/drei";
import { AnyStar } from "./AnyStar";
import { Suspense } from "react";

interface WorldPageProps {
  config: StarConfig[];
}

const Spinner = () => (
  <div className="flex items-center justify-center w-full h-screen">
    <div className="w-32 h-32 border-b-2 border-white rounded-full animate-spin"></div>
  </div>
);

export function WorldPage({ config }: WorldPageProps) {
  return (
    <div className="w-full h-screen">
      <Suspense fallback={<Spinner />}>
        <Canvas camera={{ position: [40, 40, 40], fov: 75 }}>
          <Stars
            radius={100}
            depth={50}
            count={5000}
            factor={4}
            saturation={0}
            fade
            speed={1}
          />
          <OrbitControls enablePan={false} />
          <ambientLight intensity={0.2} />

          {/* <mesh position={[0, 0, 0]} scale={1}>
            <sphereGeometry args={[0.1, 32, 32]} />
            <meshStandardMaterial
              color={"#ffffff"}
              emissive={"#ffffff"}
              emissiveIntensity={1}
            />
          </mesh> */}
          {config.map((star) => (
            <AnyStar key={star.id} config={star} position={star.position} />
          ))}
          <Text font={"/DroidSans.ttf"}> </Text>
        </Canvas>
      </Suspense>
    </div>
  );
}
