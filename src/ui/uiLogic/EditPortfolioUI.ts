import { AppEnvironment } from '../../coreClasses/coreObjects/AppEnvironment';
import { UIMenu } from '../uiFacade/UIMenu';
import { PortfolioManager } from '../../coreClasses/coreObjects/PorfolioManager';
import { Portfolio } from '../../coreClasses/coreObjects/Portfolio';
import { UILogic } from './UILogic';
import { assert } from 'console';
import { MainMenuUI } from './MainMenuUI';
import { CheckInput } from '../../coreClasses/coreLogic/CheckInput';
import { ViewPortfoliosUI } from './ViewPortfoliosUI';
import { NewHoldingUI } from './NewHoldingUI';

/**
 * Class to handle cmd line ui interface to edit a Portfolio\
 */
export class EditPortfolioUI extends UILogic {

    /**
     * string[][] nested array containing descriptions that of the options that a user can
     * choose for this screen, and their corresponding commands
     */
    private  _options : string[][] = [
        ["Change portfolio name", "CHANGE_NAME"], 
        ["Add a holding", "ADD_HOLDING"],
        ["Remove a holding", "REMOVE_HOLDING"], 
        ["Delete portfolio", "DELETE_PORTFOLIO"], 
        ["Return to view portfolios", "VIEW_PORTFOLIOS"]
    ];

    /**
     * AppEnvironment object for this application
     */
    private _appEnvironment : AppEnvironment;

   /**
    * PortFolioManager object for this application 
    */ 
    private _portfolioManager : PortfolioManager;

    /**
     * Portfolio object that is currently being edited by this class
     */
    private _portfolio: Portfolio;

    /**
     * Constructor
     * 
     * @param appEnvironment AppEnvironment object for this application
     * @param portfolio Portfolio object that is currently being edited
     */
    constructor(appEnvironment : AppEnvironment, portfolio : Portfolio){ 
        super();
        this._appEnvironment = appEnvironment;
        this._portfolio = portfolio;
        this._portfolioManager = appEnvironment.portfolioManager;
    }

    /**
     * Starts this cmd line ui menu
     */
    public start() : void{
        UIMenu.welcome(`Editing a portfolio ${this._portfolio.name}`);
        this.interact();
    }

    /**
     * Interacts with a user=
     */
    protected interact(): void {
        let message : string = "Please select an option..."
        let chosenOption : number = UIMenu.inputOption(message, this._options);
        let chosenCommand : string = super.handleOptionChoice(this._options, chosenOption);
        this.handleCommand(chosenCommand); 
    }


    private displayHoldings() {
        // handles displaying holdings to a user
    }

    /**
     * Handles command that corresponding to the option that a user has chosen
     * 
     * @param command string for the chosen command as described
     */
    private handleCommand(command : string) : void {
        switch (command) {
            case "CHANGE_NAME":
                this.changeName();
                this.success();
                this.interact();
                break;
            case "ADD_HOLDING":
                this.addHolding();
            case "REMOVE_HOLDING":
                //
                break;
            case "DELETE_PORTFOLIO":
                this.confirmDeletion();
                break;
            case "VIEW_PORTFOLIOS":
                this.returnToViewPortfolios();
                break;
            default:
                super.unknownCommand(command);
        }
    }

    /**
     * Handles confirming the selection fo deleting of a portfolio
     */
    private confirmDeletion() : void {
        let msg : string = "Are you sure you wish to delete this portfolio?";
        let wantsToDelete : boolean = UIMenu.inputYesOrNo(msg);
        if (wantsToDelete) {
            this.handleDeletion();
            this.returnToViewPortfolios();
        }
        else {
            this.deletionAborted();
        }
    }

    /**
     * Handles when the deletion of a portfolio is aborted by the user
     */
    private deletionAborted() : void {
        let abortMsg : string = "Portfolio deletion aborted!";
        UIMenu.print(abortMsg);
    }

    /**
     * Handles changing the name of a portfolio
     */
    private changeName() : void  {
        let message : string = "Please enter a new name for this portfolio";
        let requirements : string  = PortfolioManager.portfolioNameRequirements;
        let checkIsValidFunction : (portfolioName : string) => boolean = (portfolioName : string) => {
            return PortfolioManager.newPortfolioNameIsValid(portfolioName, this._portfolio, this._portfolioManager);
        }
        let newName : string = UIMenu.inputStrAndCheck(message, requirements, checkIsValidFunction);
        assert(PortfolioManager.changePortfolioName(newName, this._portfolio, this._portfolioManager) == true);
    }

    private addHolding() : void {
        let newHoldingUI : NewHoldingUI = new NewHoldingUI(this._appEnvironment, this._portfolio);
        newHoldingUI.start();
    }

    /**
     * Handles printing a success message indicating a successful edit of a portfolio
     */
    public success() : void {
        let message : string = "Portfolio successfully edited!";
        UIMenu.print(message);
    }

    /**
     * Handles deleting the current portfolio
     */
    private handleDeletion() : void {
        // Need to return to the main menu after this!
        let wasDeleted : boolean = this._portfolioManager.removePortfolio(this._portfolio.name);
        if (wasDeleted) {
            let successMsg : string = "Portfolio successfully deleted :("
            UIMenu.print(successMsg);
        } else {
            let failureMsg : string = "IS Exception, Portfolio not deleted!";
            super.illegalStateException(failureMsg);
        }
    }

    /**
     * Handles returning to the view portfolios menu once a user is done editing a Portfolio
     */
    private returnToViewPortfolios() : void {
        //Handles returning to the main menu
        assert(this._appEnvironment != undefined);
        UIMenu.print("Returning to viewing portfolios!...");
        let viewPortfolioUI : ViewPortfoliosUI = new ViewPortfoliosUI(this._appEnvironment);
        viewPortfolioUI.start();
    }
}