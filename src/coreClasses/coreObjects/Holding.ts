/*
Class to represent a holding of a stock
*/

import {StockLogic} from "../coreLogic/StockLogic";

export class Holding {

    private _symbol: string;
    private _shares: number;
    private _buyPrice: number // buy price per share
    // Purchase date of a stock, should be a time object like java
    private _purchaseDate;

    constructor(symbol: string, shares: number, buyPrice: number) {
        this._symbol = symbol;
        this._shares = shares;
        this._buyPrice = buyPrice;

        // set the date of creation in this constructor
    }

    /**
     * Handles returning a dictionary that can be used to represent this holding in a tabular format
     */
    public toDict(): { Symbol: string; Shares: number; "Buy Price": number } & { "Total return (%)": string; "Total return ($)": number; "Daily return (%)": string; "Daily return ($)": number } {
        const descriptionObj: { "Symbol": string, "Shares": number, "Buy Price": number } = {
            "Symbol": this._symbol,
            "Shares": this._shares,
            "Buy Price": this._buyPrice
        }
        return Object.assign(descriptionObj, new StockLogic().holdingPerformanceSummary(this));
    }

    /**
     * Assigns this holding to the properties in objStr
     *
     * @param obj
     */
    public assign(obj: { symbol: string, shares: number, buyPrice: number }) {
        this._symbol = obj.symbol;
        this._shares = obj.shares;
        this._buyPrice = obj.buyPrice;
    }

    private dailyReturn(): number {
        // Finds the daily return for this holding
        // in percentage
        return 1;
    }

    private totalReturn(): number {
        // Finds the total return for this holding in percentage
        return 1
    }

    private previousClose() : number {
        // returns the trading price at the previous close for this stock
        // Since i am only using the free version of this API, the latest piece of data that i can get for a stock is the previous close
        return 1;
    }

    private setInitialValue(value: number) {
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

    get symbol(): string {
        return this._symbol;
    }

    get shares(): number {
        return this._shares;
    }

    get initialInvestment(): number {
        return this._shares * this._buyPrice;
    }

    get buyPrice(): number {
        return this._buyPrice;
    }

    set symbol(symbol: string) {
        this._symbol = symbol;
    }

    set shares(shares: number) {
        if (Holding.sharesIsValid(shares)) {
            this._shares = shares;
        }
    }

    /**
     * Finds out if an inputted shares object is a valid number of shares or not
     * 
     * @param shares number that is to be checked if it is a valid quantity of shares
     * @returns boolean as described
     */
    public static sharesIsValid(shares : number) : boolean {
        return (shares > 0)
    }


    /**
     * Returns the requirements for a valid quantity of shares expressed as a string
     * 
     * @returns string as described
     */
    public static validSharesRequirements() : string {
        return "Shares must be a positive, non negative number";
    }

    /**
     * Checks if an inputted buyPrice is valid
     * 
     * @param buyPrice number to be checked if it is a valid buyPrice
     * @returns boolean as described
     */
    public static buyPriceIsValid(buyPrice : number) : boolean {
        return (buyPrice >= 0);
    }

    public static validBuyPriceRequirements() : string {
        return "Buy price must be a non negative number";
    }
}