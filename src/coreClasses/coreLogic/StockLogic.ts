import { AnyTxtRecord } from "dns";

/**
 * Class to do any logic to do with the polygon.io api\
 */
export class StockLogic {

    /**
     * Rest client belonging to the polygon.io API
     */
    private _rest;

    /**
     * Reference client belonging to the polygon.io API
     */
    private _ref;

    /**
     * instance of deasync to allow for easy asynchronous programming. 
     * <p>
     * Wanted to avoid callback hell, so this allows me to write asynchronous code synchronously. Obviously this
     * makes performance a lot worse, but this is only small scale, and the performance sacrifice is well worth it in exchange for ease of development
     */
    private _deAsync;

    /**
     * Constructor. 
     * 
     * Initializes variables for interacting with the api
     */
    constructor() {
        let api_key : string = process.env.POLYGON_API_KEY;
        this._rest = require("@polygon.io/client-js").restClient(api_key);
        this._ref = require("@polygon.io/client-js").referenceClient(api_key);
        this._deAsync = require("deasync");
    }

    /**
     * Finds out if a ticker exists for the polygon api
     * 
     * @param symbol string for the symbol of a ticker to be checked if it exists
     * @returns boolean if a ticker with inputted symbol exists
     */
    public tickerExists(symbol : string) : boolean{
        let done : boolean = false;
        let data : {results : object[]};
        let query : any;
        this._ref.tickers(query = {ticker : symbol}).then(
            (res: { results: object[]; }) => {
            data = res;
            done = true;
        });
        this._deAsync.loopWhile(() => {return !done});
        let result : boolean = data.results != undefined
        return result;
    }


    /**
     * Finds the last closing price for a symbol
     * 
     * @param _symbol string for the symbol to be looked up
     * @returns number of the closing price of inputted stock symbol. Null if a ticker does not exist for inputted symbol
     */
    public previousClose(_symbol : string) : number{
        // Finds the last closing price for a symbol
        if (!this.tickerExists(_symbol)){
            return null // yes this gives x2 performance times. Cant find way to to it in one request
        }
        let done : boolean = false;
        let data: any;
        let symbol: string;
        this._rest.stocks.previousClose(symbol = _symbol).then(
            (res: any) => {
            data = res;
            done = true; 
        });
        this._deAsync.loopWhile(()=>{return !done});
        if (data.queryCount = 0){
            return null;
        }
        else {
            let result : number = data.results[0].close;
            return result;
        }
    }

    public totalReturn(symbol : string, buyPrice : number) : number{
        // finds the total return for a symbol
        return 1;
    }
}


