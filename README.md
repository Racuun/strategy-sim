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


## Positions
### openPosition
Implement `openPosition()` funcion:
```typescript
function testFunction(openPosition:()=>any) {
  openPosition()
}

Simulator.provideLogic(({openPosition}) => testFunction(openPosition))
```
Not checking current balance and using `openPosition()` may lead to this error:
```bash
[2022-12-01T01:02:30.169] [ERROR] simulator - [2979]: trying to openPosition without money //ERROR
```
`openPosition()` can also return index of the opened position
```typescript
function testFunction(openPosition:()=>number) {
  console.log(openPosition());
}

Simulator.provideLogic(({openPosition}) => testFunction(openPosition))
```

### Close
Implementing `closePosition()` function:
```typescript
function testFunction(closePosition:(...index: number[])=>any) {

  // this will close position with index '0'
  closePosition(0)
}

Simulator.provideLogic(({closePosition}) => testFunction(closePosition))
```
You can only close position if it wasn't already closed:
```bash
[2022-12-01T01:08:55.511] [ERROR] simulator - [1]: Trying to close position that was already closed //ERROR
```

#### Multiple indicies

You can not pass any indicies. This will lead to closing first open position in your account:
```typescript
function testFunction(closePosition:()=>any) {

  // the first open position will be closed
  closePosition()
}

Simulator.provideLogic(({closePosition}) => testFunction(closePosition))
```

We also provide an option for closing multiple positions at once:
```typescript
function testFunction(closePosition:(...index: number[])=>any) {

  // this will close position 0 and position 1
  closePosition(0, 1)
}

Simulator.provideLogic(({closePosition}) => testFunction(closePosition))
```


Passing the wrong index may return an error:
```bash
[2022-12-01T01:24:11.865] [ERROR] simulator - [0]: Trying to close position that doesn't exist! //ERROR
```
## Logic
### Providing logic
Every single alghorim you want to use is called `logic`. `Logic` should be a function, that would be able to run on each tick. As to date, there is no time limit - your `logic` can work as long as you want (It's recommended that functions' summary run time fits in the chosen interval).

Providing the logic:
```typescript
function test() {
  console.log("This works on each tick!")
}

Simulator.provideLogic(() => test())
```
### Complex logic
If you need, simulator can provide sertain data. You can use it like that:
```typescript
function test(Balance:number, Close:number, openPosition:()=>any) {
  if (Balance - Close > 0)
    openPosition()
}

Simulator.provideLogic(({Balance, Close, openPosition}) => test(Balance, Close, openPosition))
```
Function `test()` will recieve current account balance, current tick's close price, and it can use `openPosition()` function. The data will be passed on each tick.

You can obtain this basic informations:
- Open price
- Close price
- Current account balance

Also you can use functions:
- `closePosition(...index: number[])`
- `openPosition()`

### Multiple functions
You can privde multiple functions for one simulation:
```typescript
Simulator.provideLogic(({Balance, Close}) => test1(Balance, Close), () => test2())
```
They will all work on the same data and make operations on the same account. That gives you an option to test your whole strategy at once.
#### Alghoritms will not run simultaneously. You need to provide `logic` in the correct orrder.

## Data coverage
All our data can be found on the internet for freel.

Sources:
- https://www.dukascopy.com/
- https://yahoo.finances.com/

#### All data provided is not meant to indicate the actual value at any given point in time
