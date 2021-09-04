import { accessSync } from 'fs';
import { AppEnvironment } from '../../coreClasses/coreObjects/AppEnvironment';
import { Portfolio } from '../../coreClasses/coreObjects/Portfolio';
import { assert } from 'console';
import { MainMenuUILogic } from './MainMenuUILogic';
import { UILogic } from './UILogic';
import { UIMenu } from '../uiFacade/UIMenu';
import { PortfolioManager } from '../../coreClasses/coreObjects/PorfolioManager';
import { EditPortfolioUILogic } from './EditPortfolioUILogic';
import { CheckInput } from '../../coreClasses/coreLogic/CheckInput';
export class ViewPortfoliosUILogic extends UILogic{

    private _options : string[][] = [
        ["Edit a portfolio", "EDIT_PORTFOLIO"], 
        ["Return to main menu", "RETURN_TO_MAIN"]
    ];

    private _appEnvironment : AppEnvironment;

    private _portfolios : Portfolio[];

    private _portfolioManager : PortfolioManager;

    constructor(appEnvironment : AppEnvironment) {
        super();
        this._appEnvironment = appEnvironment;
        this._portfolioManager = appEnvironment.portfolioManager;
        this._portfolios = this._portfolioManager.portfolios;
    }

    /**
     * Starts this menu.
     */
    public start(): void {
        UIMenu.welcome("Viewing your portfolios");
        this.displayPortfolios();
        this.interact();
        // TODO need to add more?
    }
    
    /**
     * Handles Interacting with a user
     */ 
    protected interact(): void {
        let message : string = "Please select an option relating to these portfolios!";
        let chosenOption : number = UIMenu.inputOption(message, this._options);
        let chosenCommand : string = super.handleOptionChoice(this._options, chosenOption);
        this.handleCommand(chosenCommand);
    }

    private displayPortfolios() : void {
        // Display the portfolios belonging to a user in tabular format
        // TODO implement!
        UIMenu.print("PLACEHOLDER! this is where the portfolios should be!")
    }

    /**
     * Handles option command for interacting with this menu
     * 
     * @param command string command corresponding to the option that a user has chosen
     */
    private handleCommand(command : string) : void  {
        switch (command) {
            case "EDIT_PORTFOLIO":
                this.choosePortfolio();
                break;
            case "RETURN_TO_MAIN":
                this.returnToMainMenu();
                break;
            default:
                super.unknownCommand(command);
        }
    }

    /**
     * Handles asking a user which portfolio they would like to select and then edit
     */
    private choosePortfolio() : void {
        // TODO handle case where there are no portfolios to edit!
        let message : string = "Please enter the name of the portfolio that you wish to edit!";
        let requirements : string = "Portfolio name must belong to a portfolio shown above! (case sensitive)";
        let chosenPortfolio : string = UIMenu.inputStrAndCheck(message, requirements, this.portfolioNameIsValid);
        // TODO need to get a chosenPortfolio object from PortfolioManager!
    }

    /**
     * Checks if the inputted portfolio name is valid. Extrapolated into a function just to keep things less cluttered.
     * PortfolioManager.includes(name) crashes with empty input, hence CheckInputNameIsValid accounts for this
     *   
     * @param portfolioName string the name of the portfolio to be checked
     * @returns boolean if the inputted portfolio name is valid
     */
    private portfolioNameIsValid(portfolioName : string) : boolean {
        return (portfolioName != undefined) && this._portfolioManager.includes(portfolioName);
    }

    /**
     * Handles when a user wants to edit a chosen Portfolio that was displayed
     * 
     * @param portfolio Portfolio object to be edited
     */
    private editPortfolio(portfolio : Portfolio) : void {
        assert(this._appEnvironment != undefined);
        let editPortfolioUILogic : EditPortfolioUILogic = new EditPortfolioUILogic(this._appEnvironment, portfolio);
        editPortfolioUILogic.start();
    }

    /**
     * Handles returning to the main menu
     */
    private returnToMainMenu() : void {
        assert(this._appEnvironment != undefined);
        let mainMenuUILogic : MainMenuUILogic = new MainMenuUILogic(this._appEnvironment);
        mainMenuUILogic.start();
    }
}