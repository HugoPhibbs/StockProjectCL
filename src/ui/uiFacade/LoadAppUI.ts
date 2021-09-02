import {LoadAppUILogic} from '../uiLogic/LoadAppUILogic';
import { UIMenu } from './UIMenu';
import { UILogic } from '../uiLogic/UILogic';

export class LoadAppUI extends UIMenu{


    constructor(logic: UILogic){
        super(logic);
    }

    /**
     * Prints welcoming message for this Application
     */
    public welcome() : void{
        let welcomeMessage : string = "Hello and Welcome to StockProjectCL!";
        UIMenu.print(welcomeMessage);
    }
    
}