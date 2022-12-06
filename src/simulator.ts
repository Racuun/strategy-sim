import { Source } from "./data";
import { methods as Data } from "./data";
import position from "./position";
import Log4js from "log4js";

interface tickData {
  Open: number;
  Close: number;
  Volume: number;
  Balance: number;
  openPosition: () => any;
  closePosition: (...index: number[]) => any;
}

class Simulator {
  private log(str: string) {
    this.logger.debug("[" + this.currTick + "]: " + str);
  }
  private elog(str: string) {
    this.logger.error("[" + this.currTick + "]: " + str + " //ERROR");
    this.error = true;
  }
  private flog(str: string) {
    this.logger.fatal("[" + this.currTick + "]: " + str + " //FATAL");
    this.error = true;
  }

  logger: Log4js.Logger;

  public balance: number;
  private startingBalance: number;

  public positions: position[] = [];
  public positionsCount: number = 0;

  private data;
  private currTick: number = 0;
  private error: boolean = false;

  private constructor(startingBalance: number, data, outputName: string) {
    this.balance = this.startingBalance = startingBalance;
    this.data = data;
    // create logger for .log files creation
    Log4js.configure({
      appenders: { simulator: { type: "file", filename: "output/" + outputName + ".log" } },
      categories: { default: { appenders: ["simulator"], level: "error" } },
    });
    this.logger = Log4js.getLogger("simulator");
    this.logger.level = "debug";
  }
  /**
   * Simulator class builder. This finction is async so it require to be called with await to work properly.
   * You can set the starting ballance, test data and output file's name.
   *
   * @param source data source enumerator
   * @param startingBalance amount of currency you will have at the start of the simulation. Default is 10k
   * @param outputName name of the output file  with simulation's logs. Default is set to "simulation<<current date>>.log"
   * @returns returns a new instance of simulator
   */
  public static async build(source: Source, startingBalance?: number, outputName?: string): Promise<Simulator> {
    const data = await Data.getData(source);
    return new Simulator(
      startingBalance ? startingBalance : 10_000,
      data,
      outputName ? outputName : "simulation" + Date.now().toString()
    );
  }


  /**
   * 
   */
  private openPostion(): number {
    let price: number = (parseFloat(this.data[this.currTick].Open) + parseFloat(this.data[this.currTick].Close)) / 2;

    if (this.balance - price < 0) {
      this.elog("trying to buy without money");
      return;
    }

    let temp: position = new position(this.positionsCount, price);
    let idx = temp.index;

    this.positions.push(temp);
    this.positionsCount++;

    this.balance -= price;

    this.log("Position " + idx + " opened at price: " + price + ", currnet balance: " + this.balance);
    return idx;
  }

  /**
   * Close all specified positions.
   * Price will be set to an average of the current tick close and open.
   * 
   * @param index indexes of the positions you want to close. If not provided first open position will be closed.
   */
  private closePosition(...index: number[]) {
    // index was not provided
    if (index.length == 0) {
      // iteratig in all positions
      for (let i = 0; i < this.positions.length; i++) {
        // checking if the position is open
        if (!this.positions[i].isClosed) {
          let price = (parseFloat(this.data[this.currTick].Open) + parseFloat(this.data[this.currTick].Close)) / 2;

          this.positions[i].close(price);
          this.balance += price;

          this.log("Position " + i + " was closed at price: " + price + ", current balance: " + this.balance);

          return;
        }
      }

      this.log("No position found");
      return;
    }

    // handling all indexes
    for (let i=0; i< index.length; i++) {
      if (index[i] >= this.positions.length) {
        this.elog("Trying to close position that doesn't exist!");
        return;
      }

      let price = (parseFloat(this.data[this.currTick].Open) + parseFloat(this.data[this.currTick].Close)) / 2;

      if (this.positions[index[i]].isClosed) {
        this.elog("Trying to close position that was already closed");
        return;
      }

      this.positions[index[i]].close(price);

      this.balance += price;

      this.log("Position " + index[i] + " was closed at price: " + price + ", current balance: " + this.balance);
    }
  }



  private logic: ((args: tickData) => any)[] = [];
  /**
   * With this function you can implement your own strategy as function.
   * 
   * @param logic Your algorithms
   */
  public provideLogic(...logic: ((args: tickData) => any)[]) {
    for (let i = 0; i < logic.length; i++) this.logic.push(logic[i]);
  }




  private onTick(tick: number) {
    for (let j = 0; j < this.logic.length; j++) {
      this.logic[j]({
        Open: parseFloat(this.data[tick].Open),
        Close: parseFloat(this.data[tick].Close),
        Volume: parseFloat(this.data[tick].Volume),
        Balance: this.balance,
        openPosition: () => this.openPostion(),
        closePosition: (...index: number[]) => this.closePosition(...index),
      });
    }
  }
  private onFinish() {
    let fBalance = this.balance;
    for (let i = 0; i < this.positions.length; i++) {
      if (!this.positions[i].isClosed) fBalance += this.data[this.currTick].Close;
    }

    console.log(
      "Simulation finished!" +
        "\n -> balance: " +
        fBalance +
        "\n -> change%: " +
        ((fBalance / this.startingBalance) * 100 - 100) +
        "%" +
        "\n -> positions opened: " +
        this.positionsCount
    );
    this.logger.log(
      "\n" +
        "Simulation finished!" +
        "\n -> balance: " +
        fBalance +
        "\n -> change%: " +
        ((fBalance / this.startingBalance) * 100 - 100) +
        "%" +
        "\n -> positions opened: " +
        this.positionsCount
    );
  }
  /**
   * This function will start the simulation.
   * At the current stage it can be only called once.
   */
  public run() {
    if (this.data == undefined) {
      this.flog("Data undefined");
      return;
    }

    for (let i = 0; i < this.data.length; i++) {
      this.currTick = i;

      if (this.error) return;

      this.onTick(i);
    }

    this.onFinish();
  }
}

export default Simulator;
