import { CheckInput } from '../../coreClasses/coreLogic/CheckInput';
import { UILogic } from './UILogic';
import { Portfolio } from '../../coreClasses/coreObjects/Portfolio';
import { AppEnvironment } from '../../coreClasses/coreObjects/AppEnvironment';
import { UIMenu } from '../uiFacade/UIMenu';
import { PortfolioManager } from '../../coreClasses/coreObjects/PorfolioManager';
import { PassThrough } from 'stream';
import { MainMenuUI } from './MainMenuUILogic';
import { ViewPortfoliosUI } from './ViewPortfoliosUILogic';

/**
 * Class to handle ui logic of creating a new portfolio
 */
export class NewPortfolioUI extends UILogic {

    /**
     * AppEnvironment object for this instance of the application
     */
    private _appEnvironment : AppEnvironment;
    /**
     * PortfolioManager object for this instance of the application
     */
    private _portfolioManager : PortfolioManager;

    /**
     * Constructor
     * 
     * @param appEnvironment AppEnvironment object for this instance of the application
     */
    constructor(appEnvironment : AppEnvironment){
        super();
        this._appEnvironment = appEnvironment;
        this._portfolioManager = appEnvironment.portfolioManager;
    }

    /**
     * Handles asking a user to enter in their name
     * 
     * @returns string for the name that was entered by a user 
     */
    private enterName() : string{
        // Asks user to enter a name
        let prompt : string = "Enter a name for a new portfolio"
        let requirements : string = `Portfolio ${CheckInput.nameRequirements}, and must not clash with any pre-existing portfolio!`;
        let canAddPortfolio = (name : string) : boolean => {return this._portfolioManager.canAddPortfolio(name)}
        let portfolioName : string = UIMenu.inputStrAndCheck(prompt, requirements, canAddPortfolio);
        return portfolioName;
    }

    /** 
     * Handles starting an interaction with a user
     */
    public start(): void {
        UIMenu.welcome("Creating a new Portfolio")
        this.interact();
    }

    /**
     * Interacts with a user. Including asking for the name of a new portfolio, and then handling if
     * they would like to return to the main menu or not
     */
    public interact() {
        this.newPortfolio();
        let wantsToStay : boolean = this.askToReturn();
        this.handleReturnResponse(wantsToStay);
    }

    /**
     * Handles asking a user if they would like to return to the main menu or stay and create another portfolio
     * 
     * @returns boolean for whether a user would like to create another portfolio or not. True for creating, False for leaving
     */
    private askToReturn() : boolean {
        let message : string = "Would you like to stay and create another Portfolio?";
        let response : boolean = UIMenu.inputYesOrNo(message);
        return response;
    }

    /**
     * Handles the response of a user if they would like to stay on and create another portfolio or not
     * 
     * @param wantsToStay boolean for what a user would like to do as described
     */
    private handleReturnResponse(wantsToStay : boolean) {
        if (wantsToStay) {
            this.interact();
        }
        else {
            this.returnToViewPortfolios();
        }
    }

    /**
     * Handles returning to viewing portfolios
     */
    private returnToViewPortfolios() : void { 
        let viewPortfoliosUI : ViewPortfoliosUI = new ViewPortfoliosUI(this._appEnvironment);
        viewPortfoliosUI.start()
    }

    /**
     * Handles creating a new portfolio
     */
    private newPortfolio() {
        let portfolioName : string = this.enterName();
        this.addPortfolio(portfolioName);
        this.success();
    }

    /**
     * Handles passing on adding a new portfolio to the apps portfolioManager
     * 
     * @param portfolioName string for the name of a new portfolio to be added
     * @returns boolean if the portfolio was successfully created
     */
    public addPortfolio(portfolioName : string) : boolean {
        return (this._portfolioManager.newPortfolio(portfolioName));
    }

    /**
     * Handles the success of creating a new portfolio
     */
    private success() {
        let successMessage : string = "Portfolio successfully created!";
        UIMenu.print(successMessage);
    }
}