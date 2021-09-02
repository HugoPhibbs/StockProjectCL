import { LoadApp } from '../../coreClasses/coreLogic/LoadApp';
import {LoadAppUI} from '../uiFacade/LoadAppUI';
import { PassThrough } from 'stream';
import { UILogic } from './UILogic';

export class LoadAppUILogic extends UILogic {

    private  _loadAppUI : LoadAppUI;
    private _loadApp : LoadApp;

    constructor(loadApp : LoadApp) {
        super();
        this._loadAppUI = new LoadAppUI(this);
        this._loadApp = loadApp;
    }

    /**
     * Handles what should be displayed to a user on the start of the application
     */
    public start() {
        let workingDirectory : string = this.enterWorkingDirectory();
        let loadCommand : string = this.enterLoadOption();
        let userName : string = this.enterName();
        this._loadApp.handleLoadCommand(loadCommand, userName);
    }

    public enterWorkingDirectory() : string {
        let prompt : string = "Please enter a working directory for this application";
        // TODO change bellow to be more useful!
        let requirements : string = "Working directory invalid, please enter a correct directory!"
        let workingDirectory = LoadAppUI.inputStrAndCheck(prompt, requirements, LoadApp.directoryIsValid);
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
        let optionNum : number = LoadAppUI.enterOption(prompt, loadOptions);
        let optionCommand : string = super.handleOptionChoice(loadOptions, optionNum);
        return optionCommand;
    }

    public enterName() : string {
        let prompt : string = "Please enter a name for this save: ";
        let userName : string = LoadAppUI.inputStrAndCheck(prompt, LoadApp.nameRequirements, LoadApp.nameIsValid);
        return userName;
    }
}