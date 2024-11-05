import { Vector3 } from "three";

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
