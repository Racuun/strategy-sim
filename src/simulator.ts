import {Source} from "./data/index";
import Data from "./data/index"

class position {
    index: number;

    openPrice: number;
    closePrice?: number = undefined;
    percentage?: number = undefined;

    closed: boolean = false;

    constructor(_index:number, price:number) {
        this.index = _index;
        this.openPrice = price;
    }

    close(price:number) {
        this.closePrice = price;
        this.percentage = (this.closePrice/this.openPrice * 100)
        this.closed = true;
    }

}

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

    public positions: position[] = [];
    public positionsCount: number = 0;

    public data;
    private currTick: number =0;
    private error: boolean = false;

    constructor(startingBalance: number, source: Source) {
        this.balance = startingBalance;
        this.data = Data.getData(source);
    }

    buy() : number {
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

    sell(index: number) {
        let price = (parseFloat(this.data[this.currTick].Open) + parseFloat(this.data[this.currTick].Close))/2;

        if (!this.positions[index].closed) {
            this.elog("Trying to close position that was already closed", 2)
            return;
        }

        this.positions[index].close(price);

        this.balance += price;
    }

    

    tick: ((args:tickData) => any)[] = [];

    private onTick(tick: number) {
        for (let j=0; j<this.tick.length; j++) {

            this.tick[j]({
                Open:parseFloat(this.data[tick].Open), 
                Close:parseFloat(this.data[tick].Close), 
                Volume:parseFloat(this.data[tick].Volume), 
                Balance: this.balance,
                Buy: ()=>this.buy(),
                Sell: (index: number)=>this.sell(index)
            })

        }
    }

    run() {
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
    }

}

export default Simulator;