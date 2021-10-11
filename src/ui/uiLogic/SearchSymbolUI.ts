import {StockLogic} from "../../coreClasses/coreLogic/StockLogic";
import {UIMenu} from "../uiFacade/UIMenu";

export class SearchSymbolUI {

    constructor() {
    }

    private enterSymbol() : string {
        let prompt = "Please enter a symbol that you would like to search up";
        let symbolIsValid = (symbol : string) => {
            return new StockLogic().tickerExists(symbol);
        }
        let requirements = StockLogic.validSymbolRequirements();
        return UIMenu.inputStrAndCheck(prompt, requirements, symbolIsValid);
    }

    private results(tickerDetails : {lastClosing : number, dailyGain : number, yearlyGain : number, yearHigh : number}) {
        /*
        Last closing
        Daily gain
        Yearly gain
        1 Year high
         */
    }
}