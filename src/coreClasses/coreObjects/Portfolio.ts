import {Holding} from "./Holding";

/*
Class to represent a collection of holdings
*/
export class Portfolio {

    private _holdings: Holding[] = [];
    private _name: string;

    constructor(name: string) {
        this._name = name;
    }

    public addHolding(holding: Holding) {
        this._holdings.push(holding);
    }

    public totalValue(): number {
        // Returns the total value of a portfolio
        return -2;
    }

    public dailyChange(percentage: boolean): number {
        // Returns the daily change of a portfolio
        return 1;
    }

    public totalChange(percentage: boolean): number {
        // Returns the total change in portfolio
        return 1
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

    public equals(obj: any): boolean {
        if (obj == null || typeof obj != typeof this) {
            return false;
        } else {
            obj = (obj as Portfolio);
            return (obj.name == this.name);
        }
    }

    get name(): string {
        return this._name;
    }

    get holdings(): Holding[] {
        return this._holdings;
    }

    set name(name: string) {
        this._name = name;
    }
}
