import {CheckInput} from '../coreLogic/CheckInput';
import {Portfolio} from './Portfolio';
import {assert} from 'console';
import {StockLogic} from "../coreLogic/StockLogic";
import {performaceObj} from "./Measurable";

/**
 * Class to manage a collection of Portfolios for a user
 */
export class PortfolioManager {

    /**
     * Portfolio objects contained in this manager
     */
    private _portfolios: Portfolio[] = [];

    /**
     * Attempts to create a new portfolio, and then adds it to this manager
     * 
     * @param newPortfolioName string for the name of a portfolio to be created and added
     * @returns boolean if a portfolio was added and created. Will be added as per canAddPortfolio(string)
     */
    public newPortfolio(newPortfolioName : string) : boolean {
        if (this.canAddPortfolio(newPortfolioName)) {
            let portFolio = new Portfolio(newPortfolioName);
            return this.addPortfolio(portFolio);
        }
        else {
            return false;
        }
    }

    /**
     * Finds out if a new portfolio with inputted name can be added.
     * <p>
     * Name as to be valid as per CheckInput.nameIsValid(string) and not clash with any other portfolio name's already added to this manager
     * 
     * @param newPortfolioName string for the name of a portfolio to be added
     * @returns boolean if a portfolio with name newPortfolio can be added
     */
    public canAddPortfolio(newPortfolioName : string) : boolean {
        return (!this.includes(newPortfolioName) && CheckInput.nameIsValid(newPortfolioName));
    }

    /**
     * Finds out if a inputted Portfolio exists in this manager
     * 
     * @param portfolio Portfolio object to be checked if it is contained in this manager
     * @returns boolean as described
     */
    public includesPortfolio(portfolio : Portfolio) : boolean {
        return (this.includes(portfolio.name));
    }

    /**
     * Finds if a Portfolio is contained in this manager with a name portfolioName
     * 
     * @param portfolioName string for a portfolio to be looked for
     * @returns boolean if a portfolio with name portfolioName exists in this manager
     */
    public includes(portfolioName : string) : boolean {
        return (this.findPortfolio(portfolioName) != null);
    }

    /**
     * Adds a Portfolio object to this manager, assumes that the Portfolio 
     * can be added
     * 
     * @param portfolio Portfolio object to be added
     * @returns boolean if the inputted portfolio was added
     */
    private addPortfolio(portfolio : Portfolio) : boolean {
        assert(this.canAddPortfolio(portfolio.name));
        this._portfolios.push(portfolio);
        return true;
    }

    /**
     * Handles removing a Portfolio object from this manager
     * 
     * @param portfolioName string for the name of the portfolio to be removed
     * @returns boolean if the portfolio was removed. false if the portfolio isn't contained in this manager
     */
    public removePortfolio(portfolioName : string) :boolean {
        if (this.includes(portfolioName)){
            let portfolio = this.findPortfolio(portfolioName);
            let index = this._portfolios.indexOf(portfolio)
            this._portfolios.splice(index, 1);
            return true;
        }
        else {
            return false;
        }
    }

    /**
     * Finds if an inputted new portfolio name is valid
     *
     * @param newName string for the new name of a portfolio
     * @param portfolio Portfolio object to be checked if the new name is valid
     * @returns boolean if the new name is valid
     */
    public portfolioNameChangeIsValid(newName: string, portfolio: Portfolio): boolean {
        if (!CheckInput.nameIsValid(newName)) {
            return false;
        } else if (portfolio.name == newName) {
            return true;
        }
        return !this.includes(newName);
    }

    /**
     * Returns a tabular representation of the portfolios contained in this Application
     *
     * @returns { "Name": string, "Total return (%)": string; "Total return ($)": number; "Daily return (%)": string; "Daily return ($)": number }[]
     * array giving a brief summary of all of the portfolios belonging to this Manager
     */
    public portfoliosToTable(): [{ "Name": string } & performaceObj] {
        let table = [];
        let stockLogic = new StockLogic();
        for (let i = 0; i < this._portfolios.length; i++) {
            table.push(this._portfolios[i].summary(stockLogic))
        }
        // @ts-ignore
        return table;
    }

    /**
     * Handles changing the name of a portfolio. Check if the name is valid before making the change
     *
     * note: made static so it can be passed around as a handle easily. Couldn't get the way I wanted with a non static function
     * 
     * @param newName string for the new name of a portfolio
     * @param portfolio Portfolio object to have it's name changed
     * @returns boolean if the name change was completed
     */
    public changePortfolioName(newName: string, portfolio: Portfolio): boolean {
        if (this.portfolioNameChangeIsValid(newName, portfolio)) {
            portfolio.name = newName;
            return true;
        }
        return false;
    }

    /**
     * Returns a string describing the requirements for a valid portfolio name
     *
     * @returns string as described
     */
    static get portfolioNameRequirements(): string {
        return `A) Portfolio ${CheckInput.nameRequirements}\nand B) must not clash with any other portfolios already existing`;
    }

    /**
     * Attempts to find a Portfolio with inputted name in this manager
     *
     * @param portfolioName string for the name of the Portfolio object being looked for
     * @returns Portfolio object if it was found, otherwise null
     */
    public findPortfolio(portfolioName: string): Portfolio {
        for (let i = 0; i < this._portfolios.length; i++) {
            let currPortfolio = this._portfolios[i];
            if (currPortfolio.name == portfolioName) {
                return currPortfolio;
            }
        }
        return null;
    }

    /**
     * Finds out if this PortfolioManager is empty or not
     *
     * @returns boolean value if this object is empty or not
     */
    public isEmpty(): boolean {
        return (this._portfolios.length == 0);
    }

    /**
     * Clears the list of portfolios for this deck manager
     */
    public removeAll(): void {
        this._portfolios = [];
    }

    /**
     * Getter method for the portfolios of this class
     */
    get portfolios() : Portfolio[]{
        return this._portfolios
    }
}