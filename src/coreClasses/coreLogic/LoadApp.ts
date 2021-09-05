import { AppEnvironment } from '../coreObjects/AppEnvironment';
import { LoadAppUI } from '../../ui/uiLogic/LoadAppUI';
import { User } from '../coreObjects/User';
import { MainMenuUI } from '../../ui/uiLogic/MainMenuUI';
import { assert } from 'console';
const ps = require("prompt-sync");
const ess = require('esserializer');
var fs = require('fs');

const pr = ps();

export class LoadApp {

    private _appEnvironment!: AppEnvironment;

    private _loadOptions : string[][] = [
        ["Create a save", "CREATE"],
        ["Load a save", "LOAD"]
    ];

    private _workingDirectory : string | undefined;

    static checkIsValidFunction: any;

    constructor(){
    }

    public start() : void {
        let loadAppUILogic : LoadAppUI = new LoadAppUI(this);
        loadAppUILogic.start();
        this.createMainMenu();
    }

    public createMainMenu() : void{
        assert(this._appEnvironment != undefined);
        let mainMenuUILogic : MainMenuUI = new MainMenuUI(this._appEnvironment);
        mainMenuUILogic.start()
    }

    private loadSave(directory : string) : boolean {
        return false;
    }

    /**
     * Handles creating a save file for the application. This is when a user wants to start a fresh
     * version of the application, without any progress
     * 
     * @param userName string for the name of a user for application progress to be saved under
     * @returns boolean if a save was created
     */
    public createSave(userName : string) : boolean  {
        let user = new User(userName);
        this._appEnvironment = new AppEnvironment(this, user);
        let serializedJSON = ess.serialize(this._appEnvironment, User);
        let sessionDirectory : string = this.sessionDirectory(userName)
        fs.writeFileSync(sessionDirectory, serializedJSON, 'utf-8')
        return true;
    }

    private sessionDirectory(userName : string ) {
        return `${this._workingDirectory}\\app_saves\\${userName}_save.json`;
    }

    /**
     * Checks if an inputted directory is valid
     * 
     * @param directory string for a directory to be checked if it is valid or not
     * @returns boolean if inputted directory is valid or not
     */
    public static directoryIsValid(directory : string) : boolean {
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
        }
        else if (loadCommand === "LOAD") {
            this.loadSave(userName);
        }
        else {
            throw new Error(`IA exception, load command "${loadCommand}" not valid!`);
        }
    }



    get loadOptions() : string[][] {
        return this._loadOptions;
    }

    set workingDirectory(workingDirectory : string) {
        this._workingDirectory = workingDirectory;
    }

}