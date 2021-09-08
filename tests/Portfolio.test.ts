import {Portfolio} from "../src/coreClasses/coreObjects/Portfolio";

const equalsTest = () => {

    test("Test with an object that is not a portfolio", () => {
        let portfolio: Portfolio = new Portfolio("testPortfolioOne");
        const result: boolean = portfolio.equals("aString");
        expect(result).toBeFalsy();
    })

    test("Test with a made up object", () => {
        let dummyObj: object = {
            dummyAttr: "Guten Tag"
        }
        let portfolio1: Portfolio = new Portfolio("testPortfolioOne");
        const result: boolean = portfolio1.equals(dummyObj);
        expect(result).toBeFalsy();
    })

    test("Test with a portfolio that has the same name as another", () => {
        let portfolio1: Portfolio = new Portfolio("testPortfolioOne");
        let portfolio2: Portfolio = new Portfolio("testPortfolioOne");
        const result: boolean = portfolio1.equals(portfolio2);
        expect(result).toBeTruthy();
    })

    test("Test with two portfolios with different names", () => {
        let portfolio1: Portfolio = new Portfolio("testPortfolioOne");
        let portfolio2: Portfolio = new Portfolio("testPortfolioTwo");
        const result: boolean = portfolio1.equals(portfolio2);
        expect(result).toBeFalsy();
    })

    test("Test with comparing a portfolio to null", () => {
        let portfolio1: Portfolio = new Portfolio("testPortfolioOne");
        const result: boolean = portfolio1.equals(null)
        expect(result).toBeFalsy();
    })
}

const runTests = () => {
    equalsTest();
}

runTests()