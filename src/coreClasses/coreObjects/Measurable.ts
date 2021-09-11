import {StockLogic} from "../coreLogic/StockLogic";

/**
 * Class that can be measured for it's performance.
 *
 * Intended to be used as a rough frame work to create a design pattern that is easy to implement. Reduces efforts
 * in creating a new implementation pattern
 *
 */
export default abstract class Measurable {

    /**
     * Method to return any necessary dollar values for this object.
     * For example, may want to return the initial dollar value of a Holding/Portfolio.
     *
     * @param stockLogic
     * @returns object describing the dollar values of this Measurable object
     * @protected
     */
    protected abstract dollarValues(stockLogic: StockLogic): dollarValuesObj;

    /**
     * Method to create a summary for this object. Intended to be used to both return meta data on a Measureable,
     * for example it's name, date bought etc, along with it's current performance courtesy of performanceSummary(StockLogic)
     *
     * @param stockLogic StockLogic object for this application that interacts with the Polygon.io API
     */
    public abstract summary(stockLogic);

    /**
     * Returns an object giving a performance summary of a Holding. Provides the total and daily return expressed both in dollar and percentage amounts
     *
     * @returns performaceObj object detailing the performance of a Holding
     */
    protected performanceSummary(stockLogic: StockLogic): performaceObj {
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

/**
 * General object that can be used to describe the performance of a Measurable object
 */
export type performaceObj = {
    "Total return (%)": string;
    "Total return ($)": number;
    "Daily return (%)": string;
    "Daily return ($)": number
}

/*
* General object that can be used to store key dollar values of a Measurable object
 */
export type dollarValuesObj = {
    initialValue: number,
    prevOpenValue: number,
    prevCloseValue: number
}

