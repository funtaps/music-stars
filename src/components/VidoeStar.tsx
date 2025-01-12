import { Vector3 } from "three";

import { Center, useVideoTexture } from "@react-three/drei";

import { BaseStar } from "./BaseStar";
import { VideoStarConfig } from "../types";

interface ImageStarProps {
  position: Vector3;
  config: VideoStarConfig;
}

export const VideoStar = ({
  position,
  config: { url, height, width, id },
}: ImageStarProps) => {
  const finalUrl = `static-files/${url}`;
  const texture = useVideoTexture(finalUrl, {
    muted: false,
    loop: true,
    start: false,
  });
  const divider = (width > height ? width : height) / 10;
  return (
    <BaseStar
      id={id}
      position={position}
      accent="#00ff00"
      onToggle={(wasOn) => {
        if (wasOn) {
          texture.image.pause();
        } else {
          texture.image.play();
        }
      }}
    >
      <Center position={[0, height / divider / 2 + 1.5, 0]}>
        <mesh>
          <boxGeometry args={[width / divider, height / divider, 1]} />
          <meshBasicMaterial map={texture} toneMapped={false} />
        </mesh>
      </Center>
    </BaseStar>
  );
};
