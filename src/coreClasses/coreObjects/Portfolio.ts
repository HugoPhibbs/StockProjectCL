import {Holding} from "./Holding";

/*
Class to represent a collection of holdings
*/
export class Portfolio {

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
        this._name = name;
    }

    /**
     * Handles adding a Holding object to this portfolio
     *
     * @param holding Holding object to be added
     */
    public addHolding(holding: Holding) {
        this._holdings.push(holding);
    }

    public todict() {
        // Returns an dictionairy representation of this portfolio
    }

    /**
     * Returns an array of objects describing holdings for this portfolio
     *
     * @returns object as described
     */
    public holdingsToTable(): [{ Symbol: string; Shares: number } & { "Total return (%)": number; "Total return ($)": string; "Daily return (%)": string; "Daily return ($)": number }] {
        let table = [];
        for (let i = 0; i < this._holdings.length; i++) {
            table.push(this._holdings[i].toDict())
        }
        // @ts-ignore
        return table;
    }

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
        } else {
            obj = (obj as Portfolio);
            return (obj.name == this.name);
        }
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
