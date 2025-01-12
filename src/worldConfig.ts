import { Vector3 } from "three";
import { chatHistory } from "./chatHistory";
import { StarConfig } from "./types";

const WORLD_RADIUS = 40;

// const randomPosition = () =>
//   new Vector3(
//     Math.random() * 2 * WORLD_RADIUS - WORLD_RADIUS,
//     Math.random() * 2 * WORLD_RADIUS - WORLD_RADIUS,
//     Math.random() * 2 * WORLD_RADIUS - WORLD_RADIUS
//   );

const randomPositionInSphere = () => {
  const theta = Math.random() * Math.PI;
  const phi = Math.random() * 2 * Math.PI;
  const radius = Math.cbrt(Math.random()) * WORLD_RADIUS;
  return new Vector3(
    radius * Math.sin(theta) * Math.cos(phi),
    radius * Math.sin(theta) * Math.sin(phi),
    radius * Math.cos(theta)
  );
};

export const getWorldConfig = (): StarConfig[] => {
  return chatHistory
    .map((message): StarConfig | null => {
      if (message.type !== "message") {
        return null;
      }
      const position = randomPositionInSphere();
      const text = message.text_entities.map((entity) => entity.text).join("");
      if ("photo" in message) {
        return {
          id: message.id,
          text,
          position,
          url: message.photo,
          height: message.height,
          width: message.width,
          type: "image",
        };
      }
      if ("file" in message && message.mime_type === "video/mp4") {
        return {
          id: message.id,
          text,
          position,
          url: message.file,
          height: message.height,
          width: message.width,
          type: "video",
        };
      }
      if ("file" in message && message.mime_type === "audio/ogg") {
        return {
          id: message.id,
          text,
          position,
          url: message.file,
          type: "audio",
        };
      }
      if ("file" in message && message.media_type === "sticker") {
        return {
          id: message.id,
          text,
          position,
          url: message.file,
          height: message.height,
          width: message.width,
          type: "image",
        };
      }
      if ("file" in message) {
        return null;
      }
      return {
        id: message.id,
        text,
        position,
        type: "text",
      };
    })
    .filter((config): config is StarConfig => config !== null);
  // .filter((config) => config.type === "audio");
  // .filter(
  //   (config) => !config.text.match(/[^a-zA-Z0-9А-Яа-яёЁ ,.()«»"!?:/\n—-]/g)
  // );
};
