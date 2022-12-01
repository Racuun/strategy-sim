import fetch from 'node-fetch'

export enum Source{
    /** SPY - US500S&P index      
     *  USD    
     *  End of day data
     *  (1993-2022)  
     *  ~ 7k ticks */
    SPY_EOD = 'spy/eod/c.json',
    /** NASDAQ - NASDAQ index    
     *  USD  
     *  End of day data
     *  (1971-2022) 
     * */
    NASDAQ_EOD = 'nasdaq/eod/c.json',
    /** MSFT - Microsoft    
     *  USD     
     *  End of day data
     *  (1986 - 2022)
     */
    MSFT_EOD = 'msft/eod/c.json',
    /** SPY - US500S&P index       
     *  USD     
     *  1 minute candles
     *  (2021-2022)     
     *  ~400k ticks
     */
    SPY_M1 = 'spy/1m/c.json',
    /** SPY- US500S&P index   
     *  USD     
     *  5 minutes candles
     *  (2019-2022)     
     *  ~300k ticks
    */
    SPY_M5 = 'spy/5m/c.json',
    /** SPY - US500S&P index    
     *  USD     
     *  15 minutes candles
     *  (2019-2022)     
     *  ~100k ticks
     */
    SPY_M15 = 'spy/15m/c.json',
}


async function request(type: Source) {
    const response = await fetch('https://racuun.github.io/strategy-sim-database/data/'+ type);
    const data = await response.json()
    return data;
}


export const methods = {
    async getData(type: Source) {
        return await request(type);
    },
};


const Data = {
    Source,
}

export default Data;