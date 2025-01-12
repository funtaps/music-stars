import { Vector3 } from "three";

export type BaseStarConfig = {
  id: number;
  text: string;
  position: Vector3;
};

export type TextStarConfig = BaseStarConfig & {
  type: "text";
};

export type ImageStarConfig = BaseStarConfig & {
  type: "image";
  url: string;
  height: number;
  width: number;
};

export type VideoStarConfig = BaseStarConfig & {
  type: "video";
  url: string;
  height: number;
  width: number;
};

export type AudioStarConfig = BaseStarConfig & {
  type: "audio";
  url: string;
};

export type StarConfig =
  | TextStarConfig
  | ImageStarConfig
  | VideoStarConfig
  | AudioStarConfig;

export interface Sound {
  id: string;
  name: string;
  url: string;
  // isPlaying: boolean;
  position: Vector3;
}

export interface SoundData {
  id: string;
  name: string;
  url: string;
}
