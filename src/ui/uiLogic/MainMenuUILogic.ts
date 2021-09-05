import { AppEnvironment } from '../../coreClasses/coreObjects/AppEnvironment';
import { UILogic } from './UILogic';
import { UIMenu } from '../uiFacade/UIMenu';
import { NewPortfolioUI } from './NewPortfollioUILogic';
import { ViewPortfoliosUI } from './ViewPortfoliosUILogic';
import { assert } from 'console';

/**
 * Handles logic relating to the UI of the main menu for this application
 */
export class MainMenuUI extends UILogic{

    /**
     * Options that a user can choose on the main menu. 
     * <p>
     * Options are stored with a brief description, a command to execute this option
     */
    private _options = [
        ["View Portfolios", "VIEW_PORTFOLIOS"], 
        ["Search Symbols", "SEARCH_SYMBOLS"],
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
        this.interact();
    }

    /**
     * Interacts with a user
     */
    protected interact(): void {
        let message : string = "Select an option to continue";
        let chosenOption : number = UIMenu.inputOption(message, this._options);
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
                this.viewPortfolios();
                break;
            case "SEARCH_SYMBOLS":
                // Do something
                // Create ui to search symbols
                break;
            case "CLOSE_APP":
                // Do something
                // Ask the user if they would like to close, before closing
                break;
            default:
                super.unknownCommand(chosenCommand)
        }
    }

    /** 
     * Handles creating a new interface to view portfolios
     */
    private viewPortfolios() : void {
        assert(this._appEnvironment != undefined);
        let viewPortfoliosUILogic : ViewPortfoliosUI = new ViewPortfoliosUI(this._appEnvironment);
        viewPortfoliosUILogic.start();
    }
}