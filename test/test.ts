import StrategySim from '../index'

const Simulator = new StrategySim.Simulator(10000, StrategySim.Source.SPY_M1);

let i=0;
function testFunction(Close:number, Balance:number, Buy: ()=>any, Sell:(index:number)=>any) {
    if(Balance - Close > 1000)
        Buy()
    else {
        Sell(i)
        i++;
    }
}

Simulator.provideLogic(({Close, Balance, Buy, Sell}) => testFunction(Close, Balance, Buy, Sell))

Simulator.run()