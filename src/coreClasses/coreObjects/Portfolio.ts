import { Holding } from "./Holding";

/*
Class to represent a collection of holdings
*/
class Portfolio {

    private _holdings : Holding[];
    private _name : string;

    constructor(name : string){

        this._name = name;
    }

    public totalValue() : number{
        // Returns the total value of a portfolio
        return 1;
    }

    public dailyChange(percentage : boolean) : number {
        // Returns the daily change of a portfolio
        return 1;
    }

    public totalChange(percentage: boolean) : number{
        // Returns the total change in portfolio
        return 1
    }

    get name() : string {
        return this._name;
    }

    get holdings() : Holding[] {
        return this._holdings;
    }
}
