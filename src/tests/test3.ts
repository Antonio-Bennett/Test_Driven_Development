// Create a function that takes a Roman numeral as its argument and returns its value as a
// numeric decimal integer. You need to validate the form of the Roman numeral.
// Modern Roman numerals are written by expressing each decimal digit of the number to be
// encoded separately, starting with the leftmost digit and skipping any 0s. So 1990 is rendered
// "MCMXC" (1000 = M, 900 = CM, 90 = XC) and 2008 is rendered "MMVIII" (2000 = MM, 8 =
// VIII). The Roman numeral for 1666, "MDCLXVI", uses each letter in descending order.

const romanToDecimal = (input = '') => {
    return input;
};

if (import.meta.vitest) {
    const { it, expect } = import.meta.vitest;
    it('returns invalid input types', () => {
        //Numbers
        expect(romanToDecimal(1)).toBe(
            'Invalid Input Type. Expected: "string", Received: "number"',
        );
        expect(romanToDecimal(1.65)).toBe(
            'Invalid Input Type. Expected: "string", Received: "number"',
        );
        expect(romanToDecimal(NaN)).toBe(
            'Invalid Input Type. Expected: "string", Received: "number"',
        );
        //Boolean
        expect(romanToDecimal(true)).toBe(
            'Invalid Input Type. Expected: "string", Received: "boolean"',
        );
        //Undefined - This test returns '' because we give a default value of '' when input argument is undefined
        expect(romanToDecimal(undefined)).toBe('');
        //Arrays/Objects <- Arrays are objects
        expect(romanToDecimal({ test: 'test' })).toBe(
            'Invalid Input Type. Expected: "string", Received: "object"',
        );
        expect(romanToDecimal([1, 2, 3])).toBe(
            'Invalid Input Type. Expected: "string", Received: "object"',
        );
        expect(romanToDecimal(() => {})).toBe(
            'Invalid Input Type. Expected: "string", Received: "function"',
        );
    });
    it('returns known invalid string', () => {
        //Check empty strings and lists with non numbers in them
        expect(romanToDecimal()).toBe('');
        expect(romanToDecimal('')).toBe('');
        expect(romanToDecimal('t')).toBe('"T" is not a roman numeral');
        expect(romanToDecimal('MMVIIIK')).toBe('"K" is not a roman numeral');
        expect(romanToDecimal('MMV8II')).toBe('"8" is not a roman numeral');
        expect(romanToDecimal('MX,II')).toBe('"," is not a roman numeral');
    });
    it('converts roman numeral to decimal', () => {
        //Check variety of lists
        expect(romanToDecimal('MCMXC')).toBe(1990);
        expect(romanToDecimal('XL')).toBe(45);
        expect(romanToDecimal('Xi')).toBe(11);
        expect(romanToDecimal('MMXXII')).toBe(2022);
        expect(romanToDecimal('__VI')).toBe(6000);
        expect(romanToDecimal('____XXXV')).toBe(35000);
        expect(romanToDecimal('___XXVVII')).toBe(25007);
    });
}
