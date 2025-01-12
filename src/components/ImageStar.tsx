import { useState } from "react";
import { Vector3 } from "three";

import { Center, Image } from "@react-three/drei";

import { BaseStar } from "./BaseStar";
import { ImageStarConfig } from "../types";

interface ImageStarProps {
  position: Vector3;
  config: ImageStarConfig;
}

export const ImageStar = ({
  position,
  config: { url, width, height },
}: ImageStarProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const finalUrl = `/assets/${url}`;
  const divider = (width > height ? width : height) / 10;
  return (
    <>
      <Image url={finalUrl} scale={[0, 0]} position={[0, 0, 0]} />
      <BaseStar
        position={position}
        onToggle={() => setIsPlaying((state) => !state)}
        isOn={isPlaying}
        showChildOnHover={false}
        showChildOnOn={true}
        // childMargin={6.5}
        accent={"#ff0000"}
      >
        <Center position={[0, height / divider / 2 + 1.5, 0]}>
          <Image url={finalUrl} scale={[width / divider, height / divider]} />
        </Center>
      </BaseStar>
    </>
  );
};
