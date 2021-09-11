import {StockLogic} from "../coreLogic/StockLogic";
import Measurable, {dollarValuesObj, performaceObj} from "./Measurable";

/**
 * Class to represent a Holding for this application
 * <p>
 * Represents an investment made by a User into a particular stock
 */
export class Holding extends Measurable {

    /**
     * String for the symbol of this holding
     * @private
     */
    private readonly _symbol: string;

    /**
     * Number for the number of shares contained in this holding
     * @private
     */
    private _shares: number;

    /**
     * Number for the initial price per share for this Holding
     * @private
     */
    private readonly _buyPrice: number // buy price per share

    /**
     * Constructor for a new Holding object
     *
     * @param symbol string for the symbol of a Holding
     * @param shares number for the number of shares that this Holding has
     * @param buyPrice number for the share price that this Holding was bought at initially
     */
    constructor(symbol: string, shares: number, buyPrice: number) {
        super();
        this._symbol = symbol;
        this._buyPrice = buyPrice;
        this.shares = shares; // Uses setter method
    }

    /**
     * Handles returning a dictionary that can be used to represent this holding in a tabular format
     */
    public summary(stockLogic: StockLogic): { Symbol: string; Shares: number; "Buy Price": number } & performaceObj {
        const descriptionObj: { "Symbol": string, "Shares": number, "Buy Price": number } = {
            "Symbol": this._symbol,
            "Shares": this._shares,
            "Buy Price": this._buyPrice
        }
        return Object.assign(descriptionObj, super.performanceSummary(stockLogic));
    }

    /**
     * Returns an object describing this Holding in terms of dollar values.
     * Used by Portfolio to calculate performance figures for itself.
     * <p>
     * Finds the initial value of this holding and it's values for opening and closing from the previous
     * day of trading
     *
     * @param stockLogic StockLogic object for this interaction
     * @returns { prevCloseValue: number; initialValue: number; prevOpenValue: number } object as described
     */
    public dollarValues(stockLogic: StockLogic): dollarValuesObj {
        let previousDayData = stockLogic.previousDayData(this._symbol);
        return {
            initialValue: this.initialValue(),
            prevOpenValue: this.dollarValue(previousDayData.open),
            prevCloseValue: this.dollarValue(previousDayData.close)
        };
    }

    /**
     * Returns the initial value of this Holding, based on the buy price per share
     *
     * @returns number as described
     * @private
     */
    private initialValue(): number {
        return this.dollarValue(this.buyPrice)
    }

    /**
     * Returns the value of this Holding based on a inputted stock price per share for this Holding
     *
     * @param sharePrice number for the share price for the stock of this Holding
     * @returns number for the current value of a holding as described
     * @private
     */
    private dollarValue(sharePrice: number): number {
        return this.shares * sharePrice;
    }

    /**
     * Getter method for the symbol of this Holding
     *
     * @returns string as described
     */
    get symbol(): string {
        return this._symbol;
    }

    /**
     * Getter method for the number of shares contained by this Holding
     *
     * @returns number as described
     */
    get shares(): number {
        return this._shares;
    }

    /**
     * Getter method for the buy price per share for this Holding
     *
     * @returns number as described
     */
    get buyPrice(): number {
        return this._buyPrice;
    }

    /**
     * Setter method for the shares of this Holding object
     *
     * @param shares number to be set as the number of shares for this Holding
     */
    set shares(shares: number) {
        if (Holding.sharesIsValid(shares)) {
            this._shares = shares;
        }
    }

    /**
     * Finds out if an inputted shares object is a valid number of shares or not
     * <p>
     * Put into it's own little function to minimise any needed refactoring
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
    public static buyPriceIsValid(buyPrice: number): boolean {
        return (buyPrice >= 0);
    }

    /**
     * Returns the requirements for the valid buy price of this Holding
     *
     * @string as described
     */
    public static validBuyPriceRequirements(): string {
        return "Buy price must be a non negative number";
    }
}