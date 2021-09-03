import { AppEnvironment } from '../coreObjects/AppEnvironment';
import { LoadAppUILogic } from '../../ui/uiLogic/LoadAppUILogic';
import { User } from '../coreObjects/User';
import { MainMenuUILogic } from '../../ui/uiLogic/MainMenuUILogic';
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
        let loadAppUILogic : LoadAppUILogic = new LoadAppUILogic(this);
        loadAppUILogic.start();
        this.createMainMenu();
    }

    public createMainMenu() : void{
        assert(this._appEnvironment != null);
        let mainMenuUILogic : MainMenuUILogic = new MainMenuUILogic(this._appEnvironment);
        mainMenuUILogic.start()
    }

    private loadSave(directory : string) : boolean {
        return false;
    }

    public createSave(userName : string) : boolean  {
        let user = new User(userName);
        this._appEnvironment = new AppEnvironment(this, user);
        let serializedJSON = ess.serialize(this._appEnvironment);
        let sessionDirectory : string = this.sessionDirectory(userName)
        fs.writeFileSync(sessionDirectory, serializedJSON, 'utf-8')
        return true;
    }

    private sessionDirectory(userName : string ) {
        return `${this._workingDirectory}/${userName}.json`;
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
     * Checks if an inputted name is valid
     * 
     * @param nameToCheck string for the name to be checked
     * @returns boolean if inputted name is valid
     */
    public static nameIsValid(nameToCheck : string) : boolean {
        // Returns if a name is valid
        if (nameToCheck.length == 0 || nameToCheck.length > 10){
            return false;
        }
        else if (/^[a-zA-Z0-9]*$/.test(nameToCheck) == false) {
            return false;
        }
        else {
            return true;
        }
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

    static get nameRequirements() : string {
        return "Name must have length between 1 and 10 (inclusive)\nAnd may only contain letters and numbers";
    }

    get loadOptions() : string[][] {
        return this._loadOptions;
    }

    set workingDirectory(workingDirectory : string) {
        this._workingDirectory = workingDirectory;
    }

}