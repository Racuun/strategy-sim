import position from "./position";
import Data from "./data";
import Simulator from "./simulator";

const StrategySim = {
  ...Data,
  position: position,
  Simulator: Simulator,
};

export default StrategySim;
