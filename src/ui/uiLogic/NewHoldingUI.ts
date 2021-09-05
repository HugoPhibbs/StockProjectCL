import { PassThrough } from 'stream';
import { UIMenu } from '../uiFacade/UIMenu';
export class NewHoldingUI {

    constructor() {

    }

    private enterSymbol() : string  {
        // Asks user to enter a symbol for this holding, then returns this name, if valid
        let message : string = "Enter symbol for this holding";
        
        let symbol : string = UIMenu.inputStrAndCheck(message, )
        return ""
    }
    
    private enterShares() : number {
        // asks user to enter and then returns the shares for this holding
        // cant be negative
        return 1;
    }
    
    private enterBuyPrice() : number {
        // asks user to enter the buy price for one share when they bought this stock
        return 1;
    }

    private sharesAreValid(shares : number) : boolean {
        // 
        return false;
    }

    private dateIsValid(date : string) : boolean{
        // Checks if an inputted date is valid
        return false;
    }
}