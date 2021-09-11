/**
 * Class to do any logic to do with the polygon.io api\
 */
export class StockLogic {

    /**
     * Rest client belonging to the Polygon.io API
     */
    private _rest;

    /**
     * Reference client belonging to the Polygon.io API
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
        let api_key: string = process.env.POLYGON_API_KEY;
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
    public tickerExists(symbol: string): boolean {
        if (!StockLogic.symbolIsUpperCase(symbol) || symbol == "") {
            return false;
        } else {
            let done: boolean = false;
            let data: { results: object[] };
            let query: any;
            this._ref.tickers(query = {ticker: symbol}).then(
                (res: { results: object[]; }) => {
                    data = res;
                    done = true;
                });
            this._deAsync.loopWhile(() => {
                return !done
            });
            return data.results != undefined;
        }
    }

    /**
     * Finds an object describing the previous day's trading for a stock
     * <p>
     * WARNING: Does not check if a symbol exists before querying!. Please make sure that a symbol exists for a ticker in
     * Polygon.io before calling this function!
     *
     * @param _symbol string for the symbol to be looked up
     * @returns {close: number, open : number} object describing previous day's stock movement
     */
    public previousDayData(_symbol: string): { close: number, open: number } {
        // Finds the last closing price for a symbol
        let done: boolean = false;
        let data: any;
        let symbol: string;
        this._rest.stocks.previousClose(symbol = _symbol).then(
            (res: any) => {
                data = res;
                done = true;
            });
        this._deAsync.loopWhile(() => {
            return !done
        });
        let result: { close: number, open: number } = data.results[0];
        return {close: result.close, open: result.open}
    }

    /**
     * Checks if a symbol is upper case. Useful to have this function here as it stops any unnecessary and costly requests
     * to Api that will not return anything anyways
     *
     * @param symbol string for symbol to be checked that if it is upper case or not
     * @returns boolean if a symbol is upper case or not
     */
    private static symbolIsUpperCase(symbol: string): boolean {
        return symbol == symbol.toUpperCase();
    }

    /**
     * Calculates dollar and percentage return for a Holding or Portfolio
     *
     * @param initialValue number for the initial dollar value    value
     * @param currentValue number for the current dollar value
     * @returns {dollarReturn: number, percReturn: string } object describing the dollar and percentage return of a Holding/Portfolio
     */
    public static calcReturn(initialValue: number, currentValue: number): { dollarReturn: number, percReturn: string } {
        let dollarReturn: number = this.calcDollarReturn(initialValue, currentValue);
        let percReturn: string = this.calcPercReturn(initialValue, dollarReturn);
        return {
            dollarReturn: dollarReturn,
            percReturn: percReturn
        }
    }

    /**
     * Finds and returns the dollar return for a Holding or Portfolio
     *
     * @param initialValue number initial value of a Holding or Portfolio
     * @param currentValue number for the current dollar value of a Holding or Portfolio
     * @returns number for the dollar return of a Portfolio or Holding
     * @private
     */
    private static calcDollarReturn(initialValue: number, currentValue: number): number {
        return Number((currentValue - initialValue).toFixed(2));
    }

    /**
     * Finds and returns the percentage return for a Holding or a Portfolio
     *
     * @param initialValue number initial value of a Holding or Portfolio
     * @param dollarReturn number for the dollar return of a Holding or Portfolio
     * @returns string percentage rounded to 2 decimal places for the percentage return
     * @private
     */
    private static calcPercReturn(initialValue: number, dollarReturn: number): string {
        return this.calcPercentage(dollarReturn, initialValue);
    }

    /**
     * Calculates a percentage given a numerator and denominator
     * Handles division by zero by just returning zero, and rounds to 2 decimal places
     *
     * @param numerator number expressing the top of the fraction
     * @param denominator number expressing the bottom of the fraction
     * @returns string expressing the percentage proportion between numerator and the denominator.
     */
    public static calcPercentage(numerator: number, denominator: number): string {
        let percentage: number;
        if (denominator == 0) {
            percentage = 0
        } else {
            percentage = (numerator / denominator) * 100
        }
        return `${percentage.toFixed(2)}%`
    }

    /**
     * Returns the requirements for a valid ticker symbol
     *
     * @returns string describing valid ticker symbol name requirements
     */
    public static validSymbolRequirements(): string {
        return "Ticker symbol must match a stock that Polygon.io has data for, see online for details";
    }
}


