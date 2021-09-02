/*
Class to represent a watch list of a user
*/
class WatchList {

    private _symbols : string[];
    private _name : string;

    constructor(name : string){
        this._name = name;
    }

    get name() : string {
        return this._name;
    }

    get symbols() : string[]{
        return this.symbols;
    }
}

