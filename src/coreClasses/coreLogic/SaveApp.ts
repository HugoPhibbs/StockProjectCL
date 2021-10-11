import { AppEnvironment } from '../coreObjects/AppEnvironment';
const ess = require('esserializer');

class SaveApp {

    private _appEnvironment : AppEnvironment;
    // TODO fill up this array!
    private requiredClasses = [];
 
    constructor(appEnvironment : AppEnvironment) {
        this._appEnvironment = appEnvironment;
    }


    private saveSession() : boolean {
        // Returns boolean if session was successfully saved
        let userName = this._appEnvironment.user.name;
        return false;
    }
}