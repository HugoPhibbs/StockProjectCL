/**
 * Class representing a User for this application.
 * Has very basic functionality as that is all what is needed from this version of the application
 */
export class User {

    /**
     * string for the name of a user
     * @private
     */
    private _name: string;

    /**
     * Constructor for a User object
     *
     * @param name string for the name of new user
     */
    constructor(name: string) {

        this._name = name;
    }

    /**
     * Getter for the name of this user
     *
     * @returns string as described
     */
    get name(): string {
        return this._name;
    }
}