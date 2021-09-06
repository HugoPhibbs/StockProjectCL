import { UILogic } from "../uiLogic/UILogic";
import { PassThrough } from 'stream';

var pr = require('prompt-sync')();

/**
 * Class that provides general methods for creating a ui for a cmd line application. 
 * Intended to be a utility class, hence why all methods are static
 * 
 */
export abstract class UIMenu {
    
    /**
     * Method to print a welcome message that is printed at the start of each screen. 
     * 
     * @param message string for a message to be displayed
     */
    public static welcome(message : string): void {
        UIMenu.print('- - - - - - - - - - - - - - - -');
        UIMenu.print(message);
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
        prompt = this.stylePrompt(prompt);
        let input : string = pr(prompt);
        // TODO have a way to exit entering a screen, eg enter BACK to back out of this
        while (!checkIsValidFunction(input)) {
            this.print(requirements);
            input = pr(prompt);
        }
        return input;
    }

    /**
     * Handles asking a user a yes or no question
     * 
     * @param prompt string for a prompt to ask a user to answer the question
     * @returns boolean according to the answer of the question. Yes corresponds to True, and No corresponds to False 
     */
    public static inputYesOrNo(prompt : string) : boolean {
        prompt = prompt.concat(" (Y/N) ");
        let input : string = pr(prompt);
        let options : string[] = ["Y", "N"];
        let requirements: string = "Please enter either Y or N (case sensitive)";
        while (!options.includes(input)) {
            this.print(requirements);
            input = pr(prompt);
        }
        return this.handleYesOrNo(input);
    }

    /**
     * Handles answer to a yes or no question asked to a user
     * 
     * @param input string for the answer received from a user
     * @returns boolean, true if input us "Y" and false if input is "N". Otherwise throws exception
     */
    private static handleYesOrNo(input : string) : boolean {
        switch (input) {
            case "Y":
                return true;
            case "N":
                return false;
            default:
                throw Error(`IA exception ${input} is an invalid response!`);
        }
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
     * @param message string for a message to ask a user to select an option. Basically describing what this interaction entails
     * @param options string[][] nested array for the options that a user can select
     * @returns number corresponding to the option that a user has selected
     */
    public static inputOption(message: string, options : string[][]) : number {
        let requirements : string = this.optionNumRequirements(options.length);
        let prompt : string = "Enter an option number";
        this.print(message);
        this.printOptions(options)
        let optionNumIsValidFuncHandle : (num : number) => boolean = this.optionNumIsValidFuncHandle(options);
        return this.inputNumAndCheck(prompt, requirements, optionNumIsValidFuncHandle);
    }

    /**
     * Asks a user to input a number based on a prompt. If the number entered isn't valid, then user is notified, and is asked to enter a number until it is valid. 
     * <p>
     * Keeps requirements separate so a user can enter numbers that dont necessarily reflect a chosen option, for example, entering a share price of a stock
     * 
     * @param requirements string for a message to tell a user the requirements of an inputted number
     * @param checkIsValidFunction Function to check if the inputted number is valid
     * @returns number that is entered, will be valid
     */
    public static inputNumAndCheck(prompt : string, requirements : string, checkIsValidFunction : (num:number) => boolean) : number {
        prompt = this.stylePrompt(prompt);
        let input : number = pr(prompt);
        // Need to check number is actually a number
        while (!checkIsValidFunction(input)) {
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
    private static printOptions(options : string[][]) {
        let numOptions = options.length;
        // TODO, auto extract option messages before this!
        for (let i = 0; i < numOptions; i++){
            this.print(`${i+1}. ${options[i][0]}`);
        }
    }

    /**
     * Styles a prompt that is printed to a user. May seem unnecessary to put such a simple action into a function, but this insures
     * minimal refactoring if you wish to change the way that prompts look. 
     *
     * @param prompt prompt asking a user to input a number or string etc
     * @returns prompt styled as describe
     */
    private static stylePrompt(prompt: string) : string {
        let style : string = ": ";
        return prompt.concat(style);
    }

    /**
     * Prints a message to a user. Extrapolated to minimize refactoring if the printing out method changed
     * for example, using process.stdout.write(msg) instead of console.log(msg)
     * 
     * @param msg string or number message to be printed
     */
    public static print(msg : string | number) {
        console.log(msg);
    }
}