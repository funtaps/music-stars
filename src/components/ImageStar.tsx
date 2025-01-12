import { Suspense, useState } from "react";
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
  const finalUrl = `static-files/${url}`;
  const divider = (width > height ? width : height) / 10;
  return (
    <>
      <BaseStar
        position={position}
        onToggle={() => setIsPlaying((state) => !state)}
        isOn={isPlaying}
        showChildOnHover={false}
        showChildOnOn={true}
        accent={"#ff0000"}
      >
        <Center position={[0, height / divider / 2 + 1.5, 0]}>
          <Suspense fallback={null}>
            <Image url={finalUrl} scale={[width / divider, height / divider]} />
          </Suspense>
        </Center>
      </BaseStar>
    </>
  );
};
