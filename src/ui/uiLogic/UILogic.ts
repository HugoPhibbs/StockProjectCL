/**
 * Abstract class to handle controlling of the cmd line ui. 
 * <p>
 * Implementations are not intended to do any direct printing onto the command line, only take handle input and requests from a user directly related to the command line
 */
export abstract class UILogic {

    /**
     * Method to start a cmd line ui for a particular menu. 
     * <p>
     * Intended to be the method that other classes use when calling an instance of this class to create their interface for a user
     */
    public abstract start() : void;
    
    /** 
     * Method to start an interaction with a user
     */
    protected abstract interact() : void;

    /**
     * Handles numbered option that a user has selecting. 
     * Returns command that corresponding to the option that has been chosen. 
     * <br>
     * A approach with having a command associated with an option, ensures that the ordering of options is unimportant.
     * 
     * @param options string[][] nested array containing the message of a particular option, along with the command that corresponds to this option
     * @param chosenOption number for the option that a user has chosen. 
     * @returns string for the command that a user has chosen
     */
    protected handleOptionChoice(options : string[][], chosenOption : number) : string {
        return options[chosenOption-1][1];
    }

    /**
     * Handles an unknown command within the application
     * <p>
     * Likely to be only called when there is a bug in the application
     * 
     * @param command string for an unknown command that was called
     */
    public unknownCommand(command : string) : void {
        throw new Error(`IA Exception, ${command} is an unknown command!`);
    }

    /**
     * Handles throwing an illegal state exception
     * 
     * @param msg Error message to be displayed
     */
    public illegalStateException(msg : string) : void {
        throw new Error(`IS exception, message:  ${msg}`);
    }
}