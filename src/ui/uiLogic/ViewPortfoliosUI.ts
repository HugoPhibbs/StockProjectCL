import {AppEnvironment} from '../../coreClasses/coreObjects/AppEnvironment';
import {Portfolio} from '../../coreClasses/coreObjects/Portfolio';
import {assert} from 'console';
import {MainMenuUI} from './MainMenuUI';
import {UILogic} from './UILogic';
import {UIMenu} from '../uiFacade/UIMenu';
import {PortfolioManager} from '../../coreClasses/coreObjects/PorfolioManager';
import {EditPortfolioUI} from './EditPortfolioUI';
import {CheckInput} from '../../coreClasses/coreLogic/CheckInput';
import {NewPortfolioUI} from './NewPortfollioUI';

/**
 * Class to display the portfolios for this Application
 */
export class ViewPortfoliosUI extends UILogic {

    /**
     * nested array that describes the options that a user can select from
     * First entry in a nested array is the description of this particular option, The second is the command
     * corresponding to this option
     *
     * @private
     */
    private _options: string[][] = [
        ["Select/edit a portfolio", "EDIT_PORTFOLIO"],
        ["Add portfolio", "ADD_PORTFOLIO"],
        ["Return to main menu", "RETURN_TO_MAIN"]
    ];

    /**
     * AppEnvironment object for this application
     * @private
     */
    private readonly _appEnvironment: AppEnvironment;

    /**
     * Array containing the portfolios created by a user for this application
     * @private
     */
    private _portfolios: Portfolio[];

    /**
     * PortfolioManager object for this Application
     *
     * @private
     */
    private readonly _portfolioManager: PortfolioManager;

    /**
     * Constructor
     *
     * @param appEnvironment AppEnvironment object for this application
     */
    constructor(appEnvironment: AppEnvironment) {
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
    }

    /**
     * Handles Interacting with a user
     */
    protected interact(): void {
        let message : string = "Please select an option!";
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
            case "ADD_PORTFOLIO":
                this.addPortfolio();
                break;
            default:
                super.unknownCommand(command);
        }
    }

    /**
     * Handles asking a user which portfolio they would like to select and then edit
     */
    private choosePortfolio() : void {
        if (this.canChooseAPortfolio()) {
            let message: string = "Please enter the name of the portfolio that you wish to edit!";
            let requirements: string = "Portfolio name must match a portfolio that already exists!";
            let checkIsValidFunction: (portfolioName: string) => boolean = (portfolioName: string) => {
                return CheckInput.nameIsValid(portfolioName) &&
                    this._portfolioManager.includes(portfolioName);
            }
            let portfolioName: string = UIMenu.inputStrAndCheck(message, requirements, checkIsValidFunction);
            let chosenPortfolio: Portfolio = this._portfolioManager.findPortfolio(portfolioName);
            this.editPortfolio(chosenPortfolio);
        } else {
            let msg: string = "No portfolios to select!"
            UIMenu.print(msg);
            this.interact();
        }
    }

    /**
     * Finds out of if a user can choose a portfolio. Only false if there are no portfolios to select in the first place!
     * @returns boolean if a user can choose a portfolio
     */
    private canChooseAPortfolio() : boolean {
        return (this._portfolios.length > 0);
    }

    /**
     * Handles when a user wants to edit a chosen Portfolio that was displayed
     *
     * @param portfolio Portfolio object to be edited
     */
    private editPortfolio(portfolio : Portfolio) : void {
        assert(this._appEnvironment != undefined);
        let editPortfolioUILogic : EditPortfolioUI = new EditPortfolioUI(this._appEnvironment, portfolio);
        editPortfolioUILogic.start();
    }

    /**
     * Handles when a user would like to create a new portfolio.
     *
     * Creates a new interface
     */
    private addPortfolio() : void {
        let newPortfolioUILogic : NewPortfolioUI = new NewPortfolioUI(this._appEnvironment);
        newPortfolioUILogic.start();
    }

    /**
     * Handles returning to the main menu
     */
    private returnToMainMenu() : void {
        assert(this._appEnvironment != undefined);
        let mainMenuUILogic : MainMenuUI = new MainMenuUI(this._appEnvironment);
        mainMenuUILogic.start();
    }
}