export class UILogic {

    constructor() {
    }

    public startInteraction() : void {

    }

    public endInteraction() : void  {

    }

    /**
     * Handles numbered option that a user has selecting. 
     * Returns command that corresponding to the option that has been chosen. 
     * <br>
     * A approach with having a command associated with an option, ensures that the ordering of options is unimportant.
     * 
     * @param options string[][] nested array containing the message of a particular option, along with the command that corresponds to this option
     * @param chosenOption 
     * @returns 
     */
    protected handleOptionChoice(options : string[][], chosenOption : number) : string {
        return options[chosenOption][1];
    }
}