import {Holding} from "../coreObjects/Holding";

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
     * Returns an object giving a performance summary of a stock. Provides the total and daily return expressed both in dollar and percentage amounts
     *
     * @param holding Holding object for a summary to be calculated for
     * @returns  { "Total return (%)": number; "Total return ($)": string; "Daily return (%)": string; "Daily return ($)": number } object detailing the performance of a Holding
     */
    public holdingPerformanceSummary(holding: Holding): { "Total return (%)": string; "Total return ($)": number; "Daily return (%)": string; "Daily return ($)": number } {
        // Returns an object describing the stock performance of a stock
        const previousDayData: { close: number, open: number } = this.previousDayData(holding.symbol);
        return {
            "Total return (%)": this.totalPercReturn(previousDayData, holding),
            "Total return ($)": this.totalDollarReturn(previousDayData, holding),
            "Daily return ($)": this.dailyDollarReturn(previousDayData, holding),
            "Daily return (%)": this.dailyPercReturn(previousDayData, holding)
        };
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
     * Finds the actual daily return for a Holding object. From the last day of trading, as I don't have
     * full version of polygon the best I can do is the previous day data
     *
     * @param previousDayData object with values detailing the previous day's performance for a ticker
     * @param holding Holding object to be calculated the actual daily return for
     * @returns number signed difference in price between the closing and opening stock price
     */
    public dailyDollarReturn(previousDayData: { close: number, open: number }, holding: Holding): number {
        return holding.shares * (previousDayData.close - previousDayData.open);
    }

    /**
     * Finds the daily return of a Holding object expressed as a percentage between the opening price of the stock
     * and its closing price
     *
     * @param previousDayData object with values detailing the previous day's performance for a ticker
     * @param holding Holding object for the daily percentage return to be calculated for]
     * @returns string for the daily percentage return of a Holding
     */
    public dailyPercReturn(previousDayData: { close: number, open: number }, holding: Holding): string {
        return StockLogic.calcPercentage((previousDayData.close - previousDayData.open), previousDayData.open);
    }

    /**
     * Finds the total return of a holding expresses in a dollar amount
     * @param previousDayData object with values detailing the previous day's performance for a ticker
     * @param holding Holding object to find the actual return for
     * @returns number expressing the v
     */
    public totalDollarReturn(previousDayData: { close: number, open: number }, holding: Holding): number {
        return holding.shares * (previousDayData.close - holding.buyPrice);
    }

    /**
     * Calculates the percentage gain of a Holding
     * @param previousDayData object with values detailing the previous day's performance for a ticker
     * @param holding Holding object for the percentage gain to be calculated for
     * @returns string expressing the percentage gain of a Holding
     */
    public totalPercReturn(previousDayData: { close: number, open: number }, holding: Holding): string {
        let previousClose = previousDayData.close;
        return StockLogic.calcPercentage((previousClose - holding.buyPrice), holding.buyPrice);
    }

    /**
     * Calculates a percentage given a numerator and denominator
     *
     * @param numerator number expressing the top of the fraction
     * @param denominator number expressing the bottom of the fraction
     * @returns string expressing the percentage proportion between numerator and the denominator.
     */
    private static calcPercentage(numerator: number, denominator: number): string {
        return `${(numerator / denominator) * 100}%`
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


