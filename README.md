# strategy-sim


## Functionality
Startegy Sim provide logic for simulating the market, based on the historical data.

You can:
- Get open, close prices per tick
- Open and close positions
- Provide your own logic, strategies and alghoritms
- Get logs for every operation made
- Backtest your strategy

## Work in progress
We are currently working on adding new features and functions to the simulator. If you would like to give us feedback or suggest any new functionality feel free to create issue or contact us!



## Usage

### Instalation

```bash
npm i strategy-sim
```

### Getting Started
```typescript
import StrategySim from 'strategy-sim'

const Simulator = await StrategySim.Simulator.build(StrategySim.Source.MSFT_EOD)

function testFunction(Close:number) {
  console.log(Close)
}

Simulator.provideLogic(({Close}) => testFunction(Close))

Simulator.run()
```

## Run()
The `Simulator.run()` function is used to start the simulation:
```typescript
const Simulator = await StrategySim.Simulator.build(StrategySim.Source.MSFT_EOD)

Simulator.run()
```
It starts the main loop and handles all the simulation processes.

### Multiple use
#### At the current stage of development this funtion can be used only once per `Simulator` instance
```typescript
const Simulator = await StrategySim.Simulator.build(StrategySim.Source.MSFT_EOD)

Simulator.run()

// this will not work correctly
Simulator.run()
```


## Buing and Selling
### Buy
Implement `buy()` funcion:
```typescript
function testFunction(buy:()=>any) {
  buy()
}

Simulator.provideLogic(({Buy}) => testFunction(Buy))
```
Not checking current balance and using `buy()` may lead to this error:
```bash
[2022-12-01T01:02:30.169] [ERROR] simulator - [2979]: trying to buy without money //ERROR
```
### Sell
Implementing `sell()` function:
```typescript
function testFunction(sell:(index:number)=>any) {
  sell(0)
}

Simulator.provideLogic(({Sell}) => testFunction(Sell))
```
You can only close position if it wasn't already closed:
```bash
[2022-12-01T01:08:55.511] [ERROR] simulator - [1]: Trying to close position that was already closed //ERROR
```
Passing the wrong index may return an error:
```bash
[2022-12-01T01:24:11.865] [ERROR] simulator - [0]: Trying to close position that doesn't exist! //ERROR
```

## Complex logic
If you need to optain more information from the current candle, you can do it like that:
```typescript
function testFunction(Balance:number, Close:number, buy:()=>any) {
  if (Balance - Close > 0)
    buy()
}

Simulator.provideLogic(({Balance, Close, Buy}) => testFunction(Balance, Close, Buy))
```
You can request this basic information:
- Open price
- Close price
- Current account balance

Also you can get functions:
- `Sell(index)`
- `Buy()`

## Multiply logics
You can privde multiple functions for one simulation:
```typescript
Simulator.provideLogic(({Balance, Close}) => test1(Balance, Close), () => test2())
```
They will all work on the same data and make operations on the same account. That gives you an option to test your whole strategy at once.


## Data coverage
All our data can be found on the internet for freel.

Sources:
- https://www.dukascopy.com/
- https://yahoo.finances.com/

#### All data provided is not meant to indicate the actual value at any given point in time
