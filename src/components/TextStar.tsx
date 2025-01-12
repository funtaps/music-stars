import { useState } from "react";
import { Vector3 } from "three";

import DroidSans from "../../DroidSans.ttf";

import { Center, Text } from "@react-three/drei";

import { BaseStar } from "./BaseStar";
import { TextStarConfig } from "../types";

interface TextStarProps {
  position: Vector3;
  config: TextStarConfig;
}

const addNewLinesToLongText = (text: string) => {
  const maxLineLength = 40;
  const oldLines = text.split("\n");
  const lines = [];
  for (const line of oldLines) {
    if (line.length < maxLineLength) {
      lines.push(line);
      continue;
    }
    const words = line.split(" ");
    let currentLine = "";
    for (const word of words) {
      if (currentLine.length + word.length > maxLineLength) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine += (currentLine ? " " : "") + word;
      }
    }
    lines.push(currentLine);
  }
  return lines.join("\n");
};

export const TextStar = ({ position, config: { text } }: TextStarProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const finalText = addNewLinesToLongText(text);
  const lineCount = text.split("\n").length;
  return (
    <BaseStar
      position={position}
      onToggle={() => setIsPlaying((state) => !state)}
      isOn={isPlaying}
      showChildOnHover={false}
      showChildOnOn={true}
    >
      <Center position={[0, lineCount * 1 + 1.5, 0]}>
        <Text font={DroidSans}>{finalText}</Text>
      </Center>
    </BaseStar>
  );
};
