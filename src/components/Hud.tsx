import {
  Hud as DreiHud,
  Html,
  PerspectiveCamera,
  Text,
} from "@react-three/drei";
import DroidSans from "../../DroidSans.ttf";
import { useThree } from "@react-three/fiber";
import { useSelector } from "@xstate/store/react";
import { worldStore } from "../worldConfig";
import { useState } from "react";
import { StarOff, HelpCircle } from "lucide-react";
const cameraFov = 75;
const cameraZ = 10;

const TopLeftHud: React.FC<{ position: [number, number, number] }> = ({
  position,
}) => {
  return (
    <group position={position}>
      <Html>
        <HelpButton />
        <ToggleAllOffButton />
      </Html>
    </group>
  );
};

const HelpButton: React.FC = () => {
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  return (
    <>
      <button
        className="text-white transition-opacity opacity-60 hover:opacity-100 [&_svg]:size-12"
        onClick={() => {
          setIsHelpOpen((prev) => !prev);
        }}
      >
        <HelpCircle />
      </button>
      {isHelpOpen && (
        <div
          className="max-w-full p-4 text-white rounded-lg bg-slate-900 w-max"
          style={{ maxWidth: "90vw" }}
        >
          {/* <h1 className="text-2xl">Help</h1> */}
          <p className="text-lg">
            Вы можете вертеть пространство во все стороны,
            <br />
            приближать и отдалять с помощью колёсика мыши (или пальцами на
            телефоне).
            <br />
            Можно включать несколько звёзд сразу, можно отключить их все, можно
            только часть.
            <br />
            Enjoy!
          </p>
        </div>
      )}
    </>
  );
};

const ToggleAllOffButton: React.FC = () => {
  const someOn = useSelector(worldStore, (state) =>
    Object.values(state.context.starStates).some((isOn) => isOn)
  );
  return someOn ? (
    <button
      className="text-white transition-opacity opacity-40 hover:opacity-100 [&_svg]:size-12"
      onClick={() => {
        if (someOn) {
          worldStore.send({ type: "turnAllOff" });
        }
      }}
    >
      <StarOff />
    </button>
  ) : null;
};

export const Hud: React.FC = () => {
  const { size } = useThree();

  const aspect = size.width / size.height;
  const edgeY = Math.tan((cameraFov * Math.PI) / 360) * cameraZ;

  const edgeX = edgeY * aspect;
  return (
    <DreiHud>
      <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={75} />
      <TopLeftHud position={[-edgeX + 0.1, edgeY - 0.1, 0]} />
      {/* To preload the font */}
      <Text font={DroidSans}> </Text>
    </DreiHud>
  );
};
