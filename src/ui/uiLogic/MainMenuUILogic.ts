import { AppEnvironment } from '../../coreClasses/coreObjects/AppEnvironment';
import { MainMenuUI } from '../uiFacade/MainMenuUI';
import { UILogic } from './UILogic';
import { UIMenu } from '../uiFacade/UIMenu';

/**
 * Handles logic relating to the MainMenuUI
 */
export class MainMenuUILogic extends UILogic{
    
    /**
     * MainMenuUI object that this class controls
     */
    private _mainMenuUI : MainMenuUI;

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
        this._mainMenuUI = new MainMenuUI(this);
        this._appEnvironment = appEnvironment;
    }

    /**
     * Handles the starting of the main menu
     */
    public start() : void {
        this._mainMenuUI.welcome();
        let prompt : string = "Welcome to the main menu!, Select an option to continue";
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
                // Create a new ui for viewing portfolios belonging to a user
            case "SEARCH_SYMBOLS":
                // Do something
                // Create ui to search symbols
            case "ADD_PORTFOLIO":
                // Do something
                // Create ui to add a portfolio
            case "CLOSE_APP":
                // Do something
                // Ask the user if they would like to close, before closing
            default:
                throw new Error(`IA Exception - BUG!!,  ${chosenCommand} not a valid command!`);
        }
    }
}