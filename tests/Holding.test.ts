import {Holding} from "../src/coreClasses/coreObjects/Holding";

let testHolding: Holding = new Holding("AAPL", 90, 90);

const setSharesTest = () => {
    test("Testing with share amount that is valid", () => {
        testHolding.shares = 9;
        expect(testHolding.shares).toBe(9);
    })

    test("Testing with a share amount that is not valid", () => {
        let sharesBefore: number = testHolding.shares
        testHolding.shares = -1;
        expect(testHolding.shares).toBe(sharesBefore);
    })
}

setSharesTest();