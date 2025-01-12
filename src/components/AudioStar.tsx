import { useEffect } from "react";
import { Vector3, AudioListener, Audio, AudioLoader } from "three";

import { BaseStar } from "./BaseStar";
import { AudioStarConfig } from "../types";
import { useThree } from "@react-three/fiber";

interface AudioStarProps {
  position: Vector3;
  config: AudioStarConfig;
}

const GlobalAudio: React.FC<{ url: string }> = ({ url }) => {
  const { camera } = useThree();

  useEffect(() => {
    const listener = new AudioListener();
    camera.add(listener);

    const sound = new Audio(listener);
    const audioLoader = new AudioLoader();

    audioLoader.load(url, (buffer) => {
      sound.setBuffer(buffer);
      sound.setLoop(true);
      sound.setVolume(0.5);
      sound.play();
    });

    return () => {
      sound.stop();
      sound.disconnect();
      camera.remove(listener);
    };
  }, [camera, url]);

  return null;
};

export const AudioStar = ({
  position,
  config: { url, id },
}: AudioStarProps) => {
  const finalUrl = `static-files/${url}`;
  return (
    <BaseStar id={id} position={position} accent={"#0000ff"}>
      <GlobalAudio url={finalUrl} />
    </BaseStar>
  );
};
