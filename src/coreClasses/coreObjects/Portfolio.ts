import {Holding} from "./Holding";
import {StockLogic} from "../coreLogic/StockLogic";
import Measurable, {dollarValuesObj, performaceObj} from "./Measurable";

/*
Class to represent a collection of holdings
*/
export class Portfolio extends Measurable {

    /**
     * Array containing the holdings for this portfolio
     * @private
     */
    private _holdings: Holding[] = [];

    /**
     * String for the name of this portfolio
     * @private
     */
    private _name: string;

    /**
     * Constructor for an instance of a Portfolio
     *
     * @param name string for the name of a a new portfolio
     */
    constructor(name: string) {
        super();
        this._name = name;
    }

    /************ METHODS FOR CREATING A TABLE ENTRY OUT OF THIS PORTFOLIO ****************/

    /**
     * Returns an object describing a summary for this Portfolio. A high level overview of any details of this portfolio
     * eg the name, and also performance values.
     *
     * @param stockLogic StockLogic object for this application to interact with the Polygon.io API
     * @returns object { "Name": string, "Total return (%)": string; "Total return ($)": number; "Daily return (%)": string; "Daily return ($)": number } {
     * giving a summary of this portfolio
     */
    public summary(stockLogic: StockLogic): { "Name": string } & performaceObj {
        const descriptionObj = {"Name": this._name};
        return Object.assign(descriptionObj, super.performanceSummary(stockLogic));
    }

    /**
     * Returns an object describing the dollar values of this portfolio.
     * <p>
     * Returned object describes the initial value of this portfolio, along with the value on opening and closing from
     * the last trading day
     *
     * @param stockLogic StockLogic object created to query Polygon.io API
     * @returns {initialValue : number, prevOpenValue : number, prevCloseValue : number} object as described
     */
    protected dollarValues(stockLogic: StockLogic): dollarValuesObj {
        let dollarValues: dollarValuesObj = {initialValue: 0, prevOpenValue: 0, prevCloseValue: 0};
        for (let i = 0; i < this._holdings.length; i++) {
            let currHolding: Holding = this._holdings[i];
            let holdingValues: { initialValue: number, prevOpenValue: number, prevCloseValue: number } = currHolding.dollarValues(stockLogic);
            dollarValues.initialValue += holdingValues.initialValue;
            dollarValues.prevOpenValue += holdingValues.prevOpenValue;
            dollarValues.prevCloseValue += holdingValues.prevCloseValue;
        }
        return dollarValues;

    }

    /****************************** MANAGING HOLDINGS ****************************/
    /**
     * Returns an array of objects describing holdings for this portfolio
     *
     * @param stockLogic StockLogic object for this application, interacts with Polygon.io API
     * @returns object as described
     */
    public holdingsToTable(stockLogic: StockLogic): [{ Symbol: string; Shares: number } & performaceObj] {
        let table = [];
        for (let i = 0; i < this._holdings.length; i++) {
            table.push(this._holdings[i].summary(stockLogic));
        }
        // @ts-ignore
        return table;
    }

    /**
     * Handles adding a Holding object to this portfolio
     *
     * @param holding Holding object to be added
     */
    public addHolding(holding: Holding) {
        this._holdings.push(holding);
    }

    /**************************** OTHER GENERAL METHODS **************************/

    /**
     * Finds out if the another object is equal to this portfolio object
     * <p>
     * Checks if two portfolios are equal buy comparing their names. Dont really need to compare their size, as unique portfolio name is
     * enforced by PortfolioManager
     *
     * @param obj Object to be compared to this Portfolio to see if it is equal
     */
    public equals(obj: any): boolean {
        if (obj == null || typeof obj != typeof this) {
            return false;
        }
        obj = (obj as Portfolio);
        return (obj.name == this.name);
    }

    /**
     * Finds if this Portfolio is empty or not, that is, it does not contain any holdings!
     *
     * @returns boolean if this Portfolio is empty or not
     */
    public isEmpty(): boolean {
        return (this._holdings.length == 0);
    }

    /**
     * Getter method for the name of this Portfolio
     *
     * @returns string as described
     */
    get name(): string {
        return this._name;
    }

    /**
     * Getter method for the holdings contained by this portfolio
     *
     * @returns Holding[] array as described
     */
    get holdings(): Holding[] {
        return this._holdings;
    }

    /**
     * Setter method for the name of this portfolio
     *
     * @param name
     */
    set name(name: string) {
        this._name = name;
    }
}
