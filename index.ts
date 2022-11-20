import Data from './src/data/index'
import Simulator from './src/simulator'



const simulator = new Simulator(10_000, Data.Source.SPY_EOD_1993_2022);

simulator.tick.push(
    ({Close, Buy}) => test(Close, Buy)
)

function test2(t:()=>any) {
    t();
}

function test(Close:number, buy: ()=>any) {
    if (Close > 400)
        buy()
}

simulator.run();