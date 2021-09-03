export class CheckInput {

    /**
     * Checks if an inputted name is valid
     * 
     * @param nameToCheck string for the name to be checked
     * @returns boolean if inputted name is valid
     */
    public static nameIsValid(nameToCheck : string) : boolean {
        if (nameToCheck.length == 0 || nameToCheck.length > 10){
            return false;
        }
        else if (/^[a-zA-Z0-9]*$/.test(nameToCheck) == false) {
            return false;
        }
        else {
            return true;
        }
    }   

    static get nameRequirements() : string {
        return "Name must have length between 1 and 10 (inclusive)\nAnd may only contain letters and numbers";
    }
}