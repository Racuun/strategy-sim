import StrategySim from "../src/index";

async function main(): Promise<void> {
  const Simulator = await StrategySim.Simulator.build(10000, StrategySim.Source.MSFT_EOD);

  let i = 0;
  function testFunction(Close: number, Balance: number, Buy: () => any, Sell: (index: number) => any) {
    if (Balance - Close > 1000) Buy();
    else {
      Sell(i);
      i++;
    }
  }

  Simulator.provideLogic(({ Close, Balance, Buy, Sell }) => testFunction(Close, Balance, Buy, Sell));

  Simulator.run();
}

main().catch(console.error);
