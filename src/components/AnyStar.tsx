import { Vector3 } from "three";
import { StarConfig } from "../types";
import { ImageStar } from "./ImageStar";
import { TextStar } from "./TextStar";
import { VideoStar } from "./VidoeStar";
import { AudioStar } from "./AudioStar";

type AnyStarProps = {
  position: Vector3;
  config: StarConfig;
};

export const AnyStar: React.FC<AnyStarProps> = ({ position, config }) => {
  switch (config.type) {
    case "text":
      return <TextStar config={config} position={position} />;
    case "image":
      return <ImageStar config={config} position={position} />;
    case "video":
      return <VideoStar config={config} position={position} />;
    case "audio":
      return <AudioStar config={config} position={position} />;
    default:
      return null;
  }
};
