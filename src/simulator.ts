import {Source} from "./data";
import {methods as Data} from "./data";
import position from './position';

interface tickData {
    Open: number, 
    Close: number, 
    Volume: number, 
    Balance: number,
    Buy: ()=>any,
    Sell: (index: number)=>any
}

class Simulator {

    private log(str: string) {
        console.log("["+ this.currTick + "]: " + str)
    }
    private elog(str: string, level:number) {
        console.log("["+ this.currTick + "]: ERROR: " + str+ " //ERROR L" + level)
        this.error = true;
    }



    public balance: number;
    private startingBalance: number;

    public positions: position[] = [];
    public positionsCount: number = 0;

    private data;
    private currTick: number =0;
    private error: boolean = false;

    private constructor(startingBalance: number, data) {
        this.balance = this.startingBalance = startingBalance;
        this.data = data;
    }
    public static async build(startingBalance: number, type:Source): Promise<Simulator> {
        const data = await Data.getData(type);
        return new Simulator(startingBalance, data);
    }

    private buy() : number {
        let price : number = (parseFloat(this.data[this.currTick].Open) + parseFloat(this.data[this.currTick].Close))/2;

        if (this.balance - price < 0) {
            this.elog("trying to buy without money", 2);
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

    private sell(index: number) {
        let price = (parseFloat(this.data[this.currTick].Open) + parseFloat(this.data[this.currTick].Close))/2;

        if (this.positions[index].isClosed) {
            this.elog("Trying to close position that was already closed", 2)
            return;
        }

        this.positions[index].close(price);

        this.balance += price;

        this.log("Position " + index + " was closed at price: " + price + ", current balance: " + this.balance)
    }

    

    private logic: ((args:tickData) => any)[] = [];
    public provideLogic(...logic: ((args:tickData) => any)[]) {
        for (let i=0; i<logic.length; i++)
            this.logic.push(logic[i]);
    }


    private onTick(tick: number) {
        for (let j=0; j<this.logic.length; j++) {

            this.logic[j]({
                Open:parseFloat(this.data[tick].Open), 
                Close:parseFloat(this.data[tick].Close), 
                Volume:parseFloat(this.data[tick].Volume), 
                Balance: this.balance,
                Buy: ()=>this.buy(),
                Sell: (index: number)=>this.sell(index)
            })

        }
    }
    private onFinish() {
        let fBalance = this.balance;
        for (let i=0; i<this.positions.length; i++) {
            if (!this.positions[i].isClosed)
                fBalance +=this.data[this.currTick].Close
        }

        console.log("Simulation finished!" +
         "\n -> balance: " + fBalance +
         "\n -> change%: " + (((fBalance/this.startingBalance)*100)-100) + "%" +
         "\n -> positions opened: " + this.positionsCount
         )
    }

    public async run() {
        

        if (this.data == undefined) {
            this.elog("Data undefined", 0);
            return;
        }

        for (let i=0; i<this.data.length; i++) {
            this.currTick=i;

            if (this.error)
                return;

            this.onTick(i);
        }

        this.onFinish();
    }

}

export default Simulator;