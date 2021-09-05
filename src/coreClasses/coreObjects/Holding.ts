import { AppEnvironment } from './AppEnvironment';
import { restClient } from '@polygon.io/client-js';


/*
Class to represent a holding of a stock
*/

export class Holding  {

    private _symbol : string;
    private _stockExchange : string;
    private _shares : number;
    private _initialValue : number
    // Purchase date of a stock, should be a time object like java
    private _purchaseDate; 
    private _appEnvironment : AppEnvironment;
    private _rest : any;

    constructor (appEvnironment: AppEnvironment, symbol : string, stockExchange : string, shares : number){

        this._appEnvironment = appEvnironment;
        this._symbol = symbol;
        this._stockExchange =stockExchange;
        this._shares = shares;

        this._rest = restClient(process.env.POLYGON_API_KEY);

        // set the date of creation in this constructor
    }

    /**
     * Handles returning a dictionary that can be used to represent this holding in a tabular format
     */
    public toDict() :  {[value : string] : string|number}  {
        let dict : {[value : string] : string|number} = {
            "Symbol" : this._symbol, 
            "Shares" : this._shares, 
            "Daily return (%)" : this.dailyReturn(), 
            "Total return (%)" : this.totalReturn()
        };
        return dict;
    }

    private dailyReturn() : number  {
        // Finds the daily return for this holding
        // in percentage
        return 1;
    }

    private totalReturn() : number {
        // Finds the total return for this holding in percentage
        return 1
    }

    private previousClose() : number {
        // returns the trading price at the previous close for this stock
        // Since i am only using the free version of this API, the latest piece of data that i can get for a stock is the previous close
        let deAsync = require('deasync')
        return 1;
    }

    private setInitialValue(value : number){
        // Gets the value of this symbol on this date
        // Then sets this as the value of the stock currently
    }

    public initialValue(): number{
        // Gets the initial value of this holding
        return 1;
    }

    public currentValue() : number {
        // Get the value of this holding
        return 1;
    }

    get symbol() : string{
        return this._symbol;
    }

    get stockExchange() : string {
        return this._stockExchange;
    }

    get shares() : number{
        return this._shares;
    }

    set symbol(symbol : string){
        this._symbol = symbol;
    }

    set stockExchange(stockExchange : string){
        this._stockExchange = stockExchange;
    }

    set shares(shares : number){
        this._shares = shares;
    }
}