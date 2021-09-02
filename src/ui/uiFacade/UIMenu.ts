import { UILogic } from "../uiLogic/UILogic";

var pr = require('prompt-sync');

export abstract class UIMenu {

    private _logic : UILogic;

    constructor(logic: UILogic) {
        this._logic = logic;
    }
    
    public welcome(message : string): void {
        // Prints welcoming options to a user
        // Should be first message user sees on this menu
    }

    /**
     * Asks a user to input a string based on a prompt. If the string entered isn't valid, then user is notified, and is asked to enter a string until it is valid
     * 
     * @param prompt string prompt to ask a user to enter a string
     * @param requirements string for a message to tell a user the requirements of an inputted string
     * @param checkIsValidFunction Function to check if the inputted string is valid
     * @returns string that is entered, will be valid
     */
    public static inputStrAndCheck(prompt : string, requirements : string, checkIsValidFunction : (str : string) => boolean) : string {
        let input : string = pr(prompt);
        // TODO have a way to exit entering a screen, eg enter BACK to back out of this
        while (checkIsValidFunction(input)) {
            this.print(requirements);
            input = pr(prompt);
        }
        return input;
    }

    
    /**
     * Prints options that a user can select that are based on their numbering
     * 
     * @param numOptions number of options that a user can select. Must be an integer, and 
     * @param options string[][] nested array for the options that a user can select. 
     */
     public static printOptions(requirements : string, options : string[][]) {
        let numOptions = options.length;
        // TODO, auto extract option messages before this!
        this.print(requirements);
        for (let i = 0; i < numOptions; i++){
            this.print(`${i}.${options[i][0]}`);
        }
    }

    /**
     * Asks a user to input a number based on a prompt. If the number entered isn't valid, then user is notified, and is asked to enter a number until it is valid. 
     * <p>
     * Keeps requirements seperate so a user can enter numbers that dont necessarily reflect a chosen option, for example, entering a share price of a stock
     * 
     * @param requirements string for a message to tell a user the requirements of an inputted number
     * @param checkIsValidFunction Function to check if the inputted number is valid
     * @returns number that is entered, will be valid
     */
    private static inputNumAndCheck(requirements : string, checkIsValidFunction : (num:number) => boolean) : number {
        let prompt = "Option number: ";
        let input : number = pr(prompt);
        // Need to check number is actually a number
        while (!checkIsValidFunction(input)) {
            this.print(requirements);
            input = pr(prompt);
        }
        return input;
    }

    /**
     * Returns a string for the requirements of an entered option number
     * 
     * @param numOptions number for the number of options that a user can select
     * @returns string for the requirements of an entered option number
     */
    private static optionNumRequirements(numOptions : number) : string  {
        return `Please select an option by entering a number between 1 and ${numOptions} (inclusive)`;
    }

    /**
     * Checks an entered option number is valid. 
     * 
     * @param optionNum number for the option that a user has selected
     * @param options string[][] nested array for the options that a user can select
     * @returns boolean value if inputted optionNum is valid.
     */
    private static optionNumIsValid(optionNum : number, options : string[][]) : boolean{
        return (optionNum > 0 && optionNum <= options.length);
    }

    /**
     * Returns a function handle to check if an option num is valid
     * <p>
     * returned function has single parameter for optionNum, so it can be used to check for valid input in UIMenu
     * 
     * @param options string[][] nested array for the options that a user can choose from
     */
    public static optionNumIsValidFuncHandle(options : string[][]) : (num:number) => boolean {
        return (num : number) => {return this.optionNumIsValid(num, options)};
    }

    /**
     * Handles process of getting an input from a user to enter an option
     * 
     * @param prompt string for a prompt message to ask a user to select an option
     * @param options string[][] nested array for the options that a user can select
     * @returns number corresponding to the option that a user has selected
     */
    public static enterOption(prompt: string, options : string[][]) : number {
        let requirements : string = this.optionNumRequirements(options.length);
        this.print(prompt);
        this.printOptions(requirements, options)
        let optionNumIsValidFuncHandle : (num : number) => boolean = this.optionNumIsValidFuncHandle(options);
        return this.inputNumAndCheck(requirements, optionNumIsValidFuncHandle);
    }
    

    /**
     * Prints a message to a user
     * 
     * @param msg string or number message to be printed
     */
    public static print(msg : string | number) {
        console.log(msg);
    }
}