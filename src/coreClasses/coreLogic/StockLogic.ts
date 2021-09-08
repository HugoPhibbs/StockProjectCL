import { AnyTxtRecord } from "dns";
import { Holding } from "../coreObjects/Holding";
import { PassThrough } from 'stream';

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
        this._rest = require("@polygon.io/client-js").restClient("s1pd4MlVenZGJWPP8p1mN3BUpO7TVYZq");
        this._ref = require("@polygon.io/client-js").referenceClient("s1pd4MlVenZGJWPP8p1mN3BUpO7TVYZq");
        this._deAsync = require("deasync");
    }

    /**
     * Finds out if a ticker exists for the polygon api
     * 
     * @param symbol string for the symbol of a ticker to be checked if it exists
     * @returns boolean if a ticker with inputted symbol exists
     */
    public tickerExists(symbol : string) : boolean{
        if (!this.symbolIsUpperCase(symbol) || symbol == ""){
            return false;
        }
        else {
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
    }

    /**
     * Checks if a symbol is upper case. Useful to have this function here as it stops any unnncessary and costly requests
     * to Api that will not return anything anyways
     * 
     * @param symbol string for symbol to be checked that if it is upper case or not
     * @returns boolean if a symbol is upper case or not
     */
    private symbolIsUpperCase(symbol : string) : boolean{
        return symbol == symbol.toUpperCase();
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

    /**
     * Finds the total return of a holding expresses in a dollar amount
     * 
     * @param holding Holding object to find the actual return for
     * @returns number expressing the v
     */
    public totalReturnActual(holding : Holding) : number {
        // Finds the total return from a holding of stock (actual gain)
        let buyPrice : number = holding.buyPrice;
        let symbol : string = holding.symbol;
        let shares : number = holding.shares;
        let totalReturn : number = shares *  this.totalGainActual(symbol, buyPrice);
        return totalReturn;
    }

    /**
     * Calculates the percentage gain of a Holding
     * 
     * @param holding Holding object for the percentage gain to be calculated for
     * @returns string expressing the percentage gain of a Holding
     */
    public totalReturnPerc(holding : Holding) : string {
        // Finds the total return from a holding of stock (in percentage)
        let buyPriceTotal = holding.buyPrice * holding.shares;
        return this.calcPercentage(buyPriceTotal, this.totalReturnActual(holding));
    }


    /**
     * Calculates a percentage given a numerator and denominator
     * 
     * @param numerator number expressing the top of the fraction
     * @param denominator number expressing the bottom of the fraction
     * @returns string expressing the percentage proportion between numerator and the denominator. 
     */
    private calcPercentage(numerator : number, denominator : number) : string{
        return `${(numerator / denominator) * 100}%`
    }
    
    /**
     * Finds the actual gain of a stock with inputted symbol
     * 
     * @param symbol strimg for the symbol of a stock
     * @param buyPrice price that a stock was bought at (per share)
     * @returns number expressing the total gain of a stock
     */
    private totalGainActual(symbol : string, buyPrice : number) : number{
        // finds the total return for a symbol
        let closingPrice : number = this.previousClose(symbol);
        let totalGain = closingPrice - buyPrice;
        return totalGain;
    }

    /**
     * Returns the requirements for a valid ticker symbol
     * 
     * @returns string describing valid ticker symbol name requirements
     */
    public static validSymbolRequirements() : string {
        return "Ticker symbol must match a stock that Polygon.io has data for, see online for details";
    }


    /**
     * Returns the total return of a symbol expressed as a symbol
     * 
     * @param symbol string for the symbol of a stock/ticker 
     * @param buyPrice number for the buyPrice (per share) of a stock
     * @returns string expressing the percentage return of a stock
     */
    private totalGainPerc(symbol : string, buyPrice : number) : string {
        return this.calcPercentage(buyPrice, this.totalGainActual(symbol, buyPrice))
    }
}


