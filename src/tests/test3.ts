// Create a function that takes a Roman numeral as its argument and returns its value as a
// numeric decimal integer. You need to validate the form of the Roman numeral.
// Modern Roman numerals are written by expressing each decimal digit of the number to be
// encoded separately, starting with the leftmost digit and skipping any 0s. So 1990 is rendered
// "MCMXC" (1000 = M, 900 = CM, 90 = XC) and 2008 is rendered "MMVIII" (2000 = MM, 8 =
// VIII). The Roman numeral for 1666, "MDCLXVI", uses each letter in descending order.

//The rules to roman numerals can be read up here: https://www.unrv.com/culture/roman-numerals.php#3999
//It also defines the definition of some terms used such as Vinculum

//We will use an object to store the value of each roman numeral as it is basically a constant lookup time
const dict = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
};

const romanToDecimal = (input = '') => {
    //If input is invalid type
    if (typeof input != 'string')
        return `Invalid Input Type. Expected: "string", Received: "${typeof input}"`;

    //Empty string
    if (input.length < 1) return input;

    //Change input to be Uppercase so case of input is irrelavant
    input = input.toUpperCase();

    //Vinculum is a way of annotating roman numerals so that you can have numbers greater than 4000
    //without having more than 4 of one numeral in a row
    let numOfVinculum = 0;
    let sum = 0;

    //It is better to do i-1 when comparing 2 indexes so you don't accidentally access input[input.length] using i+1
    for (let i = 1; i <= input.length; i++) {
        //We check if a numeral is prefixed by a vinculum and count the amount
        if (input[i - 1] === '_') {
            numOfVinculum += 1;
        } else {
            //We have not detected a vinculum this means either there are none or we counted all
            //the prefixed ones so we have to check if we did count any vinculums
            if (numOfVinculum > 0) {
                //If we did have vinculums check if it is valid meaning that we can't have more vinculums than there are numerals
                if (numOfVinculum > Math.floor(input.length / 2))
                    return 'Number of "_" greater than number of numerals';

                // What this does is take a substring of all the numerals that are associated with a vinculum
                //And then calls the romanToDecimal function using that as input depending on the numOfVinculum this needs to be
                //calculated slightly different
                sum +=
                    numOfVinculum < 3
                        ? Number(
                              romanToDecimal(input.substring(i - 1, i + 1)),
                          ) * 1000
                        : Number(
                              romanToDecimal(
                                  input.substring(i - 1, i + numOfVinculum - 1),
                              ),
                          ) * 1000;

                //We need to then move i forward so that it doesn't recount the numerals associated with the vinculum
                //and then set the numOfVinculum back to 0 since we accounted for them
                i += numOfVinculum - 1;
                numOfVinculum = 0;
            } else if (!(input[i - 1] in dict))
                //This checks if the character in the numeral string is valid. We have to call this after numOfVinculum > 0
                //because _ would be counted as invalid
                return `"${input[i - 1]}" is not a roman numeral`;
            else {
                //This conditional block is called when no vinculum is detected and also by the recursive call above

                //This checks if we should subtract or add the value of the numeral
                //Example: XI is 11 but IX is 9 because I < X we subract X - I which is equivalent to -I + X
                sum +=
                    dict[input[i - 1] as keyof typeof dict] <
                    dict[input[i] as keyof typeof dict]
                        ? -dict[input[i - 1] as keyof typeof dict]
                        : dict[input[i - 1] as keyof typeof dict];
            }
        }
    }

    return sum;
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
        //Check empty strings, non Roman Numerals and if numOfVinculum is greater than numerals
        expect(romanToDecimal()).toBe('');
        expect(romanToDecimal('')).toBe('');
        expect(romanToDecimal('t')).toBe('"T" is not a roman numeral');
        expect(romanToDecimal('MMVIIIK')).toBe('"K" is not a roman numeral');
        expect(romanToDecimal('MMV8II')).toBe('"8" is not a roman numeral');
        expect(romanToDecimal('MX,II')).toBe('"," is not a roman numeral');
        expect(romanToDecimal('__M')).toBe(
            'Number of "_" greater than number of numerals',
        );
        expect(romanToDecimal('____Mxi')).toBe(
            'Number of "_" greater than number of numerals',
        );
    });
    it('converts roman numeral to decimal', () => {
        //Check variety of roman numerals
        expect(romanToDecimal('MCMXC')).toBe(1990);
        expect(romanToDecimal('XL')).toBe(40);
        expect(romanToDecimal('Xi')).toBe(11);
        expect(romanToDecimal('MMXXII')).toBe(2022);
        expect(romanToDecimal('__VI')).toBe(6000);
        expect(romanToDecimal('____XXXV')).toBe(35000);
        expect(romanToDecimal('___XXVVII')).toBe(25007);
        expect(romanToDecimal('___XXV___VII')).toBe(32000);
        expect(romanToDecimal('__XL')).toBe(40000);
    });
}
