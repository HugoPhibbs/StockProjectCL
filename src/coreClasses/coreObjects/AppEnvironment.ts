
import { User } from "./User";

export class AppEnvironment {

    private _rest;
    private _user : User;

    constructor(rest: any, user : User){
        // IRestClient doesn't work!
        this._rest = rest;
        this._user = user;
    }

    get rest(){
        return this._rest;
    }

    get user() {
        return this._user;
    }

}