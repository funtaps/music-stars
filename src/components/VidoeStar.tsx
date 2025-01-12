import { useEffect, useState } from "react";
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
  config: { url, height, width },
}: ImageStarProps) => {
  const finalUrl = `static-files/${url}`;
  const texture = useVideoTexture(finalUrl, { muted: false, loop: true });
  const [isPlaying, setIsPlaying] = useState(false);
  useEffect(() => {
    if (isPlaying) {
      texture.image.play();
    } else {
      texture.image.pause();
    }
  }, [isPlaying, texture]);
  const divider = (width > height ? width : height) / 10;
  return (
    <BaseStar
      position={position}
      onToggle={() => setIsPlaying((state) => !state)}
      isOn={isPlaying}
      showChildOnHover={false}
      showChildOnOn={true}
      // childMargin={5}
      accent="#00ff00"
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
