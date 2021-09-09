import {UIMenu} from '../uiFacade/UIMenu';
import {StockLogic} from '../../coreClasses/coreLogic/StockLogic';
import {Holding} from '../../coreClasses/coreObjects/Holding';
import {UILogic} from './UILogic';
import {AppEnvironment} from '../../coreClasses/coreObjects/AppEnvironment';
import {Portfolio} from '../../coreClasses/coreObjects/Portfolio';
import {EditPortfolioUI} from './EditPortfolioUI';

/**
 * Class to manage the UI to create a new Holding for this Application
 */
export class NewHoldingUI extends UILogic {

    /**
     * Portfolio object that this holding will be added to
     */
    private readonly _portfolio: Portfolio;

    /**
     * AppEnvironment object for this application
     */
    private readonly _appEnvironment: AppEnvironment;

    /**
     * Constructor
     */
    constructor(appEnvironment : AppEnvironment, portfolio : Portfolio) {
        super();
        this._appEnvironment = appEnvironment;
        this._portfolio = portfolio;
    }
    
    /**
     * Starts this ui to create a new holding
     */
    public start(): void {
        UIMenu.welcome("Adding a holding")
        this.interact();
    }

    /**
     * Starts an interaction with a user
     */
    protected interact(): void {
        this.createHolding();
        this.handleReturn();
    }

    /**
     * Handles creating a holding from what is entered by a user
     */
    private createHolding() {
        let symbol: string = this.enterSymbol();
        let shares: number = NewHoldingUI.enterShares();
        let buyPrice: number = NewHoldingUI.enterBuyPrice();
        let holding: Holding = new Holding(symbol, shares, buyPrice);
        this._portfolio.addHolding(holding);
    }

    /**
     * Handles asking a user if they would like to returning to editing the portfolio that the newly created holding(s) belong to
     */
    private handleReturn() : void {
        let message : string = "Would you like to add another holding?";
        let wantsToStay : boolean = UIMenu.inputYesOrNo(message);

        if (wantsToStay){
            this.start();
        }
        else {
            this.returnToEditPortfolio();
        }
    }

    /**
     * Handles creating a new ui to edit the same portfolio that the newly create holding(s) belong to
     */
    private returnToEditPortfolio() : void {
        let editPortfolioUI : EditPortfolioUI = new EditPortfolioUI(this._appEnvironment, this._portfolio);
        editPortfolioUI.start();
    }
    
    /**
     * Handles asking a user to enter the symbol for this stock holding
     *  
     * @returns string for the symbol of this stock holding
     */
    private enterSymbol() : string  {
        let message : string = "Enter the symbol for this holding";
        let requirements : string = StockLogic.validSymbolRequirements();
        let checkIsValidFunction : (symbol : string) => boolean = (symbol : string) => {
            return new StockLogic().tickerExists(symbol);
        }
        return UIMenu.inputStrAndCheck(message, requirements, checkIsValidFunction);
    }

    /**
     * Asks user to enter the number of shares for this holding
     *
     * @returns number for the number of shares entered for this new holding
     */
    private static enterShares(): number {
        let message: string = "Enter the number of shares bought for this holding";
        let requirements: string = Holding.validSharesRequirements();
        return UIMenu.inputNumAndCheck(message, requirements, Holding.sharesIsValid);
    }

    /**
     * Handles asking a user to enter the share buy price for a holding
     *
     * @returns number for the buy price entered
     */
    private static enterBuyPrice(): number {
        let message: string = "Enter the share buy price for this holding";
        let requirements: string = Holding.validBuyPriceRequirements();
        return UIMenu.inputNumAndCheck(message, requirements, Holding.buyPriceIsValid);
    }

}