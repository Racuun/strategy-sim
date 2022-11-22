import {default as _SPY_EOD} from '../data/spy_eod_93-16.11.2022.json'
import {default as _NASDAQ_EOD} from '../data/nasdaq_eod_71-22.11.2022.json'
import {default as _MSFT_EOD} from '../data/msft_eod_86-22.11.2022.json'
import {default as _SPY_M1} from '../data/spy.usd_1min_bid_22.11.2021-19.11.2022.json'
//import {default as _SPY_M5} from '../data/SPY.USUSD_Candlestick_5_M_BID_25.11.2019-22.11.2022.json'
//import {default as _SPY_M15} from '../data/SPY.USUSD_Candlestick_15_M_BID_25.11.2019-22.11.2022.json'

export enum Source{
    /** SPY - US500S&P index      
     *  USD    
     *  End of day data
     *  (1993-2022)  
     *  ~ 7k ticks */
    SPY_EOD = 1,
    /** NASDAQ - NASDAQ index    
     *  USD  
     *  End of day data
     *  (1971-2022) 
     * */
    NASDAQ_EOD = 2,
    /** MSFT - Microsoft    
     *  USD     
     *  End of day data
     *  (1986 - 2022)
     */
    MSFT_EOD = 3,
    /** SPY - US500S&P index       
     *  USD     
     *  1 minute candles
     *  (2021-2022)     
     *  ~400k ticks
     */
    SPY_M1 = 4,
    /** SPY- US500S&P index   
     *  USD     
     *  5 minutes candles
     *  (2019-2022)     
     *  ~300k ticks
    */
    SPY_M5 = 5,
    /** SPY - US500S&P index    
     *  USD     
     *  15 minutes candles
     *  (2019-2022)     
     *  ~100k ticks
     */
    SPY_M15 = 6,
}


const methods = {
    getData(type: Source) {
        switch(type) {
            case Source.SPY_EOD:
                return _SPY_EOD;
            case Source.NASDAQ_EOD:
                return _NASDAQ_EOD;
            case Source.MSFT_EOD:
                return _MSFT_EOD;
            case Source.SPY_M1:
                return _SPY_M1;
            // case Source.SPY_M5:
            //     return _SPY_M5;
            // case Source.SPY_M15:
            //     return _SPY_M15;
        }
    },
};


const Data = {
    ...methods,
    Source,
}

export default Data;