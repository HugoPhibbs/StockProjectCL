import {CheckInput} from "../src/coreClasses/coreLogic/CheckInput";

const checkNameIsValidTest = () => {
    test('Test with a name that should pass', () => {
        expect(CheckInput.nameIsValid("Hugo")).toBeTruthy();
    })

    test('Test with a name that contains numbers', () => {
        expect(CheckInput.nameIsValid("hugo152")).toBeTruthy();
    })

    test('Test with a name exactly 20 chars long', () => {
        expect(CheckInput.nameIsValid("abcdabcdabcdabcdabcd")).toBeTruthy();
    })

    test('Test with a name that is too long', () => {
        expect(CheckInput.nameIsValid("The quick brown fox jumps over the lazy rabbit")).toBeFalsy();
    })

    test('Test with a name that is too short', () => {
        expect(CheckInput.nameIsValid('')).toBeFalsy();
    })

    test('Test with a name that is undefined', () => {
        expect(CheckInput.nameIsValid(undefined)).toBeFalsy();
    })

    test('Test with null input', () => {
        expect(CheckInput.nameIsValid(null)).toBeFalsy();
    })

    test('Test with a name containing special characters', () => {
        expect(CheckInput.nameIsValid("Hugo&&")).toBeFalsy();
    })
}

const runTests = () => {
    checkNameIsValidTest();
}

runTests();