import { Holding } from '../../coreClasses/coreObjects/Holding';
class EditHoldingUI {

    private _holding : Holding;

    constructor(holding : Holding){
        this._holding = holding;
    }

    changeName(name: string){
        // Handles UI with changing name of holding
    }

    deleteHolding() {
        // Handles deleting a holding from it's current portfolio
    }
}