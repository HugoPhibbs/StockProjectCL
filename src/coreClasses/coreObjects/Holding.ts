import { AppEnvironment } from './AppEnvironment';
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

    constructor (appEvnironment: AppEnvironment, symbol : string, stockExchange : string, shares : number){

        this._appEnvironment = appEvnironment;
        this._symbol = symbol;
        this._stockExchange =stockExchange;
        this._shares = shares;
        // set the date of creation in this constructor
    }

    /**
     * 
     * @param date String for the date of the day that a user would like to see the daily open for
     * @returns 
     */
    public dailyOpen(date : string) : number {
        // Throw an error if date is in the future, or if it is current day (dont think api can handle this with my subscription!)
        let resp =  this.dailyOpenClose().then(
            
    }

    /**
     * Finds the object that describes the daily/open/close price of an holding
     * Waits for a response from a client then then returns
     * 
     * @returns 
     */
    public async dailyOpenClose(){
        let rest = this._appEnvironment.rest;
        let response = await rest.stocks.dailyOpenClose();
        return response;
    }


    public hasGained() : boolean{
        // Returns true or false if this holding has increased in value from yesterday
        return false;
    }

    public totalChange(percentage : boolean) : number{
        // Returns the change of a stock,
        // if percentage is true, then it returns the percentage change of a stock
        return 1;
    }
    
    private dailyChange() : number {
        // Returns the change of a stock in the past day
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