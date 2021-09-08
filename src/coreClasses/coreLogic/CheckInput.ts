export class CheckInput {

    /**
     * Checks if an inputted name is valid
     * 
     * @param nameToCheck string for the name to be checked
     * @returns boolean if inputted name is valid
     */
    public static nameIsValid(nameToCheck : string) : boolean {
        if (nameToCheck == undefined || nameToCheck.length == 0 || nameToCheck.length > 20) {
            return false;
        } else return /^[a-zA-Z0-9]*$/.test(nameToCheck) != false;
    }   

    /**
     * Getter method for valid name requirements
     */
    static get nameRequirements() : string {
        return "name must have length between 1 and 20 (inclusive) and may only contain letters and numbers";
    }
}