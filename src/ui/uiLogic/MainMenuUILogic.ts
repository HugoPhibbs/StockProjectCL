import { AppEnvironment } from '../../coreClasses/coreObjects/AppEnvironment';
import { UILogic } from './UILogic';
import { UIMenu } from '../uiFacade/UIMenu';
import { NewPortfolioUILogic } from './NewPortfollioUILogic';

/**
 * Handles logic relating to the UI of the main menu for this application
 */
export class MainMenuUILogic extends UILogic{
    

    /**
     * Options that a user can choose on the main menu. 
     * <p>
     * Options are stored with a brief description, a command to execute this option
     */
    private _options = [
        ["View Portfolios", "VIEW_PORTFOLIOS"], 
        ["Search Symbols", "SEARCH_SYMBOLS"],
        ["Add Portfolio", "ADD_PORTFOLIO"], 
        ["Close app" , "CLOSE_APP"]
    ]

    /** 
     * AppEnvironment object for this instance of the application
     */
    private _appEnvironment : AppEnvironment; 

    /**
     * Constructor for a MainMenuUILogic class. 
     * <p>
     * Creates a new MainMenuUI object for this class
     * 
     * @param appEnvironment AppEnvironment object for this instance of the application 
     */
    constructor(appEnvironment : AppEnvironment) {
        super();
        this._appEnvironment = appEnvironment;
    }

    /**
     * Handles the starting of the main menu
     */
    public start() : void {
        UIMenu.welcome("Welcome to the main menu!");
        let prompt : string = "Select an option to continue";
        let chosenOption : number = UIMenu.enterOption(prompt, this._options);
        let chosenCommand: string = super.handleOptionChoice(this._options, chosenOption);
        this.handleChosenCommand(chosenCommand);
    }

    /**
     * Handles command choice that a user has chosen on the main menu
     * 
     * @param chosenCommand string for the chosen command of a user
     */
    private handleChosenCommand(chosenCommand : string) {
        switch (chosenCommand){ 
            case "VIEW_PORTFOLIOS":
                // Do something
                break;
            case "SEARCH_SYMBOLS":
                // Do something
                // Create ui to search symbols
                break;
            case "ADD_PORTFOLIO":
                let newPortfolioUILogic : NewPortfolioUILogic = new NewPortfolioUILogic(this._appEnvironment);
                newPortfolioUILogic.start();
                // Do something
                // Create ui to add a portfolio
                break;
            case "CLOSE_APP":
                // Do something
                // Ask the user if they would like to close, before closing
                break;
            default:
                super.unknownCommand(chosenCommand)
        }
    }
}