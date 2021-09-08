import {AppEnvironment} from '../coreObjects/AppEnvironment';
import {LoadAppUI} from '../../ui/uiLogic/LoadAppUI';
import {User} from '../coreObjects/User';
import {MainMenuUI} from '../../ui/uiLogic/MainMenuUI';
import assert = require('assert');

const ess = require('esserializer');
const fs = require('fs');

/**
 * Class to manage the loading of the application
 */
export class LoadApp {

    /**
     * App Environment object for this application.
     * Either created or loaded from a file by this class
     *
     * @private
     */
    private _appEnvironment!: AppEnvironment;

    /**
     * Options that a user can choose when starting the app
     * @private
     */
    private _loadOptions: string[][] = [
        ["Create a save", "CREATE"],
        ["Load a save", "LOAD"]
    ];

    /**
     * String for the working directory that this application is saved to
     * @private
     */
    private _workingDirectory: string | undefined;

    /**
     * Constructor
     */
    constructor() {
    }

    /**
     * Starts the application
     */
    public start(): void {
        let loadAppUILogic: LoadAppUI = new LoadAppUI(this);
        loadAppUILogic.start();
        this.createMainMenu();
    }

    /**
     * Creates the main menu for this app
     */
    public createMainMenu(): void {
        assert(this._appEnvironment != undefined);
        let mainMenuUILogic: MainMenuUI = new MainMenuUI(this._appEnvironment);
        mainMenuUILogic.start()
    }

    /**
     * Loads a save from a file
     *
     * @param directory string for the directory that a file is saved at
     * @private
     * @returns boolean if a save file was loaded or not
     */
    private loadSave(directory: string): boolean {
        return false;
    }

    /**
     * Handles creating a save file for the application. This is when a user wants to start a fresh
     * version of the application, without any progress
     *
     * @param userName string for the name of a user for application progress to be saved under
     * @returns boolean if a save was created
     */
    public createSave(userName: string): boolean {
        let user = new User(userName);
        this._appEnvironment = new AppEnvironment(this, user);
        let serializedJSON = ess.serialize(this._appEnvironment, User);
        let sessionDirectory: string = this.sessionDirectory(userName)
        fs.writeFileSync(sessionDirectory, serializedJSON, 'utf-8')
        return true;
    }

    /**
     * Finds the directory that an app session will be saved at
     *
     * @param userName string for the name of the user loading the application
     * @returns string as described
     * @private
     */
    private sessionDirectory(userName: string): string {
        return `${this._workingDirectory}\\app_saves\\${userName}_save.json`;
    }

    /**
     * Checks if an inputted directory is valid
     *
     * @param directory string for a directory to be checked if it is valid or not
     * @returns boolean if inputted directory is valid or not
     */
    public static directoryIsValid(directory: string): boolean {
        // Returns if a directory is valid or not
        // TODO implement!
        return true;
    }

    /**
     * Handles command a user has chosen with regards to starting the application. 
     * Whether application should load an old save or create a new one
     * 
     * @param loadCommand string for the command corresponding to a load option
     * @param userName string for the name of a user starting the application
     */
    public handleLoadCommand(loadCommand : string, userName: string) {
        if (loadCommand === "CREATE"){
            this.createSave(userName);
        } else if (loadCommand === "LOAD") {
            this.loadSave(userName);
        } else {
            throw new Error(`IA exception, load command "${loadCommand}" not valid!`);
        }
    }

    /**
     * Getter method for the options that a user can choose when loading the application
     *
     * @returns nested array containing the description of options, along with their corresponding commands
     */
    get loadOptions(): string[][] {
        return this._loadOptions;
    }

    /**
     * Setter method for the working directory of this class
     *
     * @param workingDirectory string for teh working directory of this class and app
     */
    set workingDirectory(workingDirectory: string) {
        this._workingDirectory = workingDirectory;
    }

}