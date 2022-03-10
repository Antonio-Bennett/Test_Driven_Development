//Create a function that will take in a random string and mask the last 4 numbers using asterisk (*)

// Example:
// “F3f213h82r3” should be “F3f21*h**r*”

export const mask = (input = '') => {
    //If input is invalid type
    if (typeof input != 'string')
        return `Invalid Input Type. Expected: "string", Received: "${typeof input}"`;

    // If the length of the string is less than 4 we know it can't be masked
    if (input.length < 4) return input;

    //This will keep track of the numbers of digits masked to see if it had enough digits
    let numsMasked = 0;

    //We convert input to an array of chars so we can modify the value in place
    const maskedString = [...input];

    //Starting from the end of the string look for 4 numbers and change to asterisk
    for (let i = input.length; i >= 0 && numsMasked < 4; i--) {
        if (!isNaN(parseInt(maskedString[i], 10))) {
            numsMasked++;
            maskedString[i] = '*';
        }
    }

    //If we did change 4 numbers then we can return valid mask
    return numsMasked === 4 ? maskedString.join('') : input;
};

if (import.meta.vitest) {
    const { it, expect } = import.meta.vitest;
    it('returns invalid input types', () => {
        //Numbers
        expect(mask(1)).toBe(
            'Invalid Input Type. Expected: "string", Received: "number"',
        );
        expect(mask(1.65)).toBe(
            'Invalid Input Type. Expected: "string", Received: "number"',
        );
        expect(mask(NaN)).toBe(
            'Invalid Input Type. Expected: "string", Received: "number"',
        );
        //Boolean
        expect(mask(true)).toBe(
            'Invalid Input Type. Expected: "string", Received: "boolean"',
        );
        //Undefined - This test returns '' because we give a default value of '' when input argument is undefined
        expect(mask(undefined)).toBe('');
        //Arrays/Objects <- Arrays are objects
        expect(mask({ test: 'test' })).toBe(
            'Invalid Input Type. Expected: "string", Received: "object"',
        );
        expect(mask([1, 2, 3])).toBe(
            'Invalid Input Type. Expected: "string", Received: "object"',
        );
        expect(mask(() => {})).toBe(
            'Invalid Input Type. Expected: "string", Received: "function"',
        );
    });

    it('returns known invalid string', () => {
        //Check empty strings and strings less than 4 chars in length
        expect(mask()).toBe('');
        expect(mask('')).toBe('');
        expect(mask('123')).toBe('123');
        expect(mask('***')).toBe('***');
    });

    it('masks string', () => {
        //Check strings with variety of numbers in different places
        expect(mask('str1')).toBe('str1');
        expect(mask('1234')).toBe('****');
        expect(mask('test1234')).toBe('test****');
        expect(mask('1234test')).toBe('****test');
        expect(mask('t1e2s3t4')).toBe('t*e*s*t*');
        expect(mask('F3f2138h82r3')).toBe('F3f213*h**r*');
    });
}
