import { Holding } from "./Holding";
import { PortfolioManager } from "./PorfolioManager";
import { PassThrough } from 'stream';
import { CheckInput } from "../coreLogic/CheckInput";

/*
Class to represent a collection of holdings
*/
export class Portfolio {

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

    public equals(obj : any) : boolean{
        if (typeof obj != typeof this){ 
            return false;
        }
        else {
            obj = (obj as Portfolio);
            return (obj.name == this.name);
        }
    }

    get name() : string {
        return this._name;
    }

    get holdings() : Holding[] {
        return this._holdings;
    }
    
    set name(name : string) {
        this._name = name;
    }
}
