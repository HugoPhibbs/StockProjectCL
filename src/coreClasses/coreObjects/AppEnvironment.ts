import {User} from "./User";
import {PortfolioManager} from './PorfolioManager';

/**
 * Class that contains any objects necessary to run this application
 * <p>
 * Is the most important class in the hierarchy of this application
 */
export class AppEnvironment {

    /**
     * User object for this application
     * @private
     */
    private readonly _user: User;

    /**
     * PortfolioManager object for this application\
     * @private
     */
    private readonly _portfolioManager: PortfolioManager

    /**
     * Constructor for an AppEnvironment object
     *
     * @param user User object created for this application
     */
    constructor(user: User) {
        this._user = user;
        this._portfolioManager = new PortfolioManager();
    }

    /**
     * Getter method for the User of this application
     */
    get user(): User {
        return this._user;
    }

    /**
     * Getter method for the portfolioManager object for this application
     */
    get portfolioManager(): PortfolioManager {
        return this._portfolioManager;
    }

}