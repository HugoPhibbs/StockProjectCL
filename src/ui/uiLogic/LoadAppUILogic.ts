import { LoadApp } from '../../coreClasses/coreLogic/LoadApp';
import { PassThrough } from 'stream';
import { UILogic } from './UILogic';
import { CheckInput } from '../../coreClasses/coreLogic/CheckInput';
import { UIMenu } from '../uiFacade/UIMenu';

/**
 * Class to control UI to load the application
 */
export class LoadAppUILogic extends UILogic {

    /**
     * LoadApp object that is used to load this application
     */
    private _loadApp : LoadApp;

    /**
     * Constructor for LoadAppULogic class
     * <p>
     * Creates a new LoadAppUI object for this class
     * 
     * @param loadApp LoadApp object that is used to load this application
     */
    constructor(loadApp : LoadApp) {
        super();
        this._loadApp = loadApp;
    }

    /**
     * Handles what should be displayed to a user on the start of the application
     */
    public start() {
        let workingDirectory : string = this.enterWorkingDirectory();
        this._loadApp.workingDirectory = workingDirectory;
        let loadCommand : string = this.enterLoadOption();
        let userName : string = this.enterName();
        this._loadApp.handleLoadCommand(loadCommand, userName);
    }

    /**
     * Handles asking a user to enter a working directory to save application progress to
     * 
     * @returns string for the chosen working directory that was chosen
     */
    public enterWorkingDirectory() : string {
        let prompt : string = "Please enter a working directory for this application: ";
        // TODO change bellow to be more useful!
        let requirements : string = "Working directory invalid, please enter a correct directory!"
        let workingDirectory = UIMenu.inputStrAndCheck(prompt, requirements, LoadApp.directoryIsValid);
        return workingDirectory;
    }

    /**
     * Handles displaying load options to a user, and passing commands back to LoadApp
     * 
     * @returns string for command to load the application
     */
    public enterLoadOption() : string {
        let prompt : string = "Please enter a load option for this application!: ";
        let loadOptions : string[][] = this._loadApp.loadOptions;
        let optionNum : number = UIMenu.enterOption(prompt, loadOptions);
        let optionCommand : string = super.handleOptionChoice(loadOptions, optionNum);
        return optionCommand;
    }

    /**
     * Handles asking a user to enter their name, in order to save application progress
     * 
     * @returns string for the name that a user has chosen
     */
    public enterName() : string {
        let prompt : string = "Please enter a name for this save: ";
        let userName : string = UIMenu.inputStrAndCheck(prompt, CheckInput.nameRequirements, CheckInput.nameIsValid);
        return userName;
    }
}