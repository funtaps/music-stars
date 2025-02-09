import { Vector3 } from "three";
import { chatHistory } from "./chatHistory";
import { StarConfig } from "./types";
import { createStore } from "@xstate/store";

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
};

const stars = getWorldConfig();

export const worldStore = createStore({
  context: {
    stars,
    starStates: Object.fromEntries(stars.map((star) => [star.id, false])),
  },
  on: {
    toggleStar: {
      starStates: (context, event: { id: number }) => {
        const { id } = event;
        return {
          ...context.starStates,
          [id]: !context.starStates[id],
        };
      },
    },
    turnAllOff: {
      starStates: (context) => {
        return Object.fromEntries(
          Object.keys(context.starStates).map((id) => [id, false])
        );
      },
    },
  },
});
