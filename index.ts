import position from './src/position'
import Data from './src/data'
import Simulator from './src/simulator'


const StrategySim = {
    ...Data,
    position: position,
    Simulator: Simulator,
}

export default StrategySim;