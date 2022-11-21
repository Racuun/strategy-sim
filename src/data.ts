import {default as _SPY} from '../data/spy_eod_93-22.json'

export enum Source{
    SPY_EOD_1993_2022 = 1,
}


const methods = {
    getData(type: Source) {
        switch(type) {
            case Source.SPY_EOD_1993_2022:
                return _SPY;
        }
    },
};


const Data = {
    ...methods,
    Source,
}

export default Data;