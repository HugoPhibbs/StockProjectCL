import {PortfolioManager} from '../src/coreClasses/coreObjects/PorfolioManager';
import {Portfolio} from '../src/coreClasses/coreObjects/Portfolio';

let testPortfolioManager: PortfolioManager = new PortfolioManager();


beforeEach(() => {
    testPortfolioManager.newPortfolio("testPortfolioOne");
    testPortfolioManager.newPortfolio("testPortfolioTwo");
    testPortfolioManager.newPortfolio("testPortfolioThree");

})

afterEach(() => {
    testPortfolioManager.removeAll();
})

const newPortfolioTest = () => {

    test("Testing with a portfolio that has a valid name and doesn't clash with anything else", () => {
        let result: boolean = testPortfolioManager.newPortfolio("testPortfolioFour");
        expect(result).toBeTruthy();
        expect(testPortfolioManager.includes("testPortfolioFour"));
    })

    test("Testing with a new name that clashes with with a portfolio's name that is already added", () => {
        let result: boolean = testPortfolioManager.newPortfolio("testPortfolioOne");
        expect(result).toBeFalsy();
    })
}

const includesTest = () => {

    test("Testing with a portfolio that has been added already", () => {
        let result: boolean = testPortfolioManager.includes("testPortfolioOne");
        expect(result).toBeTruthy();
    });

    test("Testing with a portfolio name that has not been added", () => {
        let result: boolean = testPortfolioManager.includes("testPortfolioZero")
        expect(result).toBeFalsy();
    })
}

const canAddPortfolioTest = () => {
    test("Testing with a portfolio that should be able to be added", () => {
        const result: boolean = testPortfolioManager.canAddPortfolio("testPortfolioFour");
        expect(result).toBeTruthy();
    })

    test("Testing with a portfolio that clashes with a portfolio already added", () => {
        const result: boolean = testPortfolioManager.canAddPortfolio("testPortfolioOne");
        expect(result).toBeFalsy();
    })

    test("Portfolio with an invalid name", () => {
        const result: boolean = testPortfolioManager.canAddPortfolio("testPortfolio%");
        expect(result).toBeFalsy();
    })
}

const findPortfolioTest = () => {
    test("Portfolio that exists in the portfolio manager", () => {
        let portfolio: Portfolio = testPortfolioManager.findPortfolio("testPortfolioOne");
        expect(portfolio.name).toBe("testPortfolioOne");
    })

    test("Portfolio that does not exist in the portfolio manager", () => {
        let portfolio: Portfolio = testPortfolioManager.findPortfolio("testPortfolio");
        expect(portfolio).toBeNull();
    })
}

const changePortfolioNameTest = () => {

    test("Changing name of portfolio to one that is valid", () => {
        let portfolio: Portfolio = testPortfolioManager.findPortfolio("testPortfolioOne");
        let result: boolean = testPortfolioManager.changePortfolioName("testPortfolioSix", portfolio);
        expect(result).toBeTruthy();
        expect(portfolio.name).toBe("testPortfolioSix")
    });

    test("Changing name of portfolio to one that clashes with another portfolio", () => {
        let portfolio: Portfolio = testPortfolioManager.findPortfolio("testPortfolioOne");
        let result: boolean = testPortfolioManager.changePortfolioName("testPortfolioTwo", portfolio);
        expect(result).toBeFalsy();
        expect(portfolio.name).toBe("testPortfolioOne");
    });
};

const portfolioNameChangeIsValidTest = () => {

    test("Testing with a portfolio name that has already been added", () => {
        let portfolio: Portfolio = testPortfolioManager.findPortfolio("testPortfolioOne");
        let result: boolean = testPortfolioManager.portfolioNameChangeIsValid("testPortfolioOne", portfolio);
        expect(result).toBeTruthy();
    })

    test("Test with a name that is not valid targeting checkValidInput.nameIsValid(string)", () => {
        let portfolio: Portfolio = testPortfolioManager.findPortfolio("testPortfolioOne");
        let result: boolean = testPortfolioManager.portfolioNameChangeIsValid("blue&", portfolio);
        expect(result).toBeFalsy();
    })

    test("Test with a name that is the same as the portfolio that is inputted", () => {
        let portfolio: Portfolio = testPortfolioManager.findPortfolio("testPortfolioOne");
        let result: boolean = testPortfolioManager.portfolioNameChangeIsValid("testPortfolioOne", portfolio);
        expect(result).toBeTruthy();
    })

    test("Test with a name that clashes with a portfolio that has already been added", () => {
        let portfolio: Portfolio = testPortfolioManager.findPortfolio("testPortfolioOne");
        let result: boolean = testPortfolioManager.portfolioNameChangeIsValid("testPortfolioTwo", portfolio);
        expect(result).toBeFalsy();
    })
}

const removePortfolioTest = () => {

    test("Check with a portfolio that has been added", () => {
        const result: boolean = testPortfolioManager.removePortfolio("testPortfolioOne");
        expect(result).toBeTruthy();
        expect(testPortfolioManager.includes("testPortfolioOne")).toBeFalsy();
    })

    test("Test with a portfolio that has not been added", () => {
        const result: boolean = testPortfolioManager.removePortfolio("testPortfolioSix");
        expect(!testPortfolioManager.includes("testPortfolioSix")).toBeFalsy();
        expect(result).toBeFalsy();
    })
}

const runTests = () => {
    includesTest();
    findPortfolioTest();
    canAddPortfolioTest();
    changePortfolioNameTest();
    portfolioNameChangeIsValidTest();
    newPortfolioTest();
}

runTests();
