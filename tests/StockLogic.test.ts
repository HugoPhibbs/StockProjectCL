import {StockLogic} from '../src/coreClasses/coreLogic/StockLogic';

let testStockLogic: StockLogic = new StockLogic();

// Testing ticker exists
const tickerExistsTests = () => {

    test("Testing with a symbol that exists", () => {
        const result: boolean = testStockLogic.tickerExists("AAPL");
        expect(result).toBeTruthy();
    })

    test("Testing with an empty string", () => {
        const result: boolean = testStockLogic.tickerExists("");
        expect(result).toBeFalsy();
    })

    test("Testing with symbol that doesn't exist", () => {
        const result: boolean = testStockLogic.tickerExists("AAAA");
        expect(result).toBeFalsy();
    })

    test("Testing with a symbol that exists but is in lower case", () => {
        const result: boolean = testStockLogic.tickerExists("aapl");
        expect(result).toBeFalsy();
    })

    test("Testing with a ticker containing a suffix", () => {
        const result: boolean = testStockLogic.tickerExists("AAC.WS");
        expect(result).toBeTruthy();
    })

}

//tickerExistsTests();//
