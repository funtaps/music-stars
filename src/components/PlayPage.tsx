import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import type { Sound } from "../types";
import { Star } from "./Star";
import { Stars } from "@react-three/drei";

interface PlayPageProps {
  sounds: Sound[];
  playingStates: Record<string, boolean>;
  playSound: (id: string) => void;
  stopSound: (id: string) => void;
  isLoading: (id: string) => boolean;
}

export function PlayPage({
  sounds,
  playingStates,
  playSound,
  stopSound,
  isLoading,
}: PlayPageProps) {
  const toggleSound = (id: string) => {
    const sound = sounds.find((sound) => sound.id === id);
    if (!sound) {
      return;
    }

    if (playingStates[id]) {
      stopSound(id);
    } else {
      playSound(id);
    }
  };

  return (
    <div className="w-full h-screen">
      <Canvas camera={{ position: [20, 20, 20], fov: 75 }}>
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

        <mesh position={[0, 0, 0]} scale={1}>
          <sphereGeometry args={[0.1, 32, 32]} />
          <meshStandardMaterial
            color={"#ffffff"}
            emissive={"#ffffff"}
            emissiveIntensity={1}
          />
        </mesh>
        {sounds.map((sound) => (
          <Star
            key={sound.id}
            sound={sound}
            position={sound.position}
            isPlaying={playingStates[sound.id]}
            isLoading={isLoading(sound.id)}
            onToggle={() => toggleSound(sound.id)}
          />
        ))}
      </Canvas>
    </div>
  );
}
