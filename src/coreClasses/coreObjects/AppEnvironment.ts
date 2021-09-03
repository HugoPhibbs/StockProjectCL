
import { User } from "./User";
import { PortfolioManager } from './PorfolioManager';

export class AppEnvironment {

    // private _rest;
    private _user : User;

    private _portfolioManager : PortfolioManager

    constructor(rest: any, user : User){
        // IRestClient doesn't work!
        //this._rest = rest;
        this._user = user;
        this._portfolioManager = new PortfolioManager();
    }

    //get rest(){
        //return this._rest;
    //}

    get user() : User{
        return this._user;
    }

    get portfolioManager() : PortfolioManager{
        return this._portfolioManager;
    }

}