import {StockLogic} from "../coreLogic/StockLogic";

export abstract class Measurable {


    public abstract dollarValues(stockLogic: StockLogic);

    public abstract summary(stockLogic);

    /**
     * Returns an object giving a performance summary of a Holding. Provides the total and daily return expressed both in dollar and percentage amounts
     *
     * @returns  { "Total return (%)": number; "Total return ($)": string; "Daily return (%)": string; "Daily return ($)": number } object detailing the performance of a Holding
     */
    protected performanceSummary(stockLogic: StockLogic): { "Total return (%)": string; "Total return ($)": number; "Daily return (%)": string; "Daily return ($)": number } {
        let dollarValues: { prevCloseValue: number; initialValue: number; prevOpenValue: number } = this.dollarValues(stockLogic);
        let totalReturn: { dollarReturn: number, percReturn: string } = StockLogic.calcReturn(dollarValues.initialValue, dollarValues.prevCloseValue);
        let dailyReturn: { dollarReturn: number, percReturn: string } = StockLogic.calcReturn(dollarValues.prevOpenValue, dollarValues.prevCloseValue);
        return {
            "Total return ($)": totalReturn.dollarReturn,
            "Total return (%)": totalReturn.percReturn,
            "Daily return ($)": dailyReturn.dollarReturn,
            "Daily return (%)": dailyReturn.percReturn
        }
    }

}