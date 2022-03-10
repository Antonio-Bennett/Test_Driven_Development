// You are provided a string containing a list of positive integers separated by a space (" ").
// Take each value and calculate the sum of its digits, which we call it's "weight". Then return
// the list in ascending order by weight, as a string joined by a space.

// For example 99 will have "weight" 18, 100 will have "weight"
// 1 so in the output 100 will come before 99.

//Example:
// "56 65 74 100 99 68 86 180 90" ordered by numbers weights becomes:
// "100 180 90 56 65 74 68 86 99"
// When two numbers have the same "weight", let's consider them to be strings and not
// numbers:
// 100 is before 180 because its "weight" (1) is less than the one of 180 (9)
// and 180 is before 90 since, having the same "weight" (9) it comes before as a string.
// All numbers in the list are positive integers and the list can be empty.

export const weightedSort = (input = '') => {
    //If input is invalid type
    if (typeof input != 'string')
        return `Invalid Input Type. Expected: "string", Received: "${typeof input}"`;

    if (input.length < 1) return input;

    return '';
};

if (import.meta.vitest) {
    const { it, expect } = import.meta.vitest;
    it('returns invalid input types', () => {
        //Numbers
        expect(weightedSort(1)).toBe(
            'Invalid Input Type. Expected: "string", Received: "number"',
        );
        expect(weightedSort(1.65)).toBe(
            'Invalid Input Type. Expected: "string", Received: "number"',
        );
        expect(weightedSort(NaN)).toBe(
            'Invalid Input Type. Expected: "string", Received: "number"',
        );
        //Boolean
        expect(weightedSort(true)).toBe(
            'Invalid Input Type. Expected: "string", Received: "boolean"',
        );
        //Undefined - This test returns '' because we give a default value of '' when input argument is undefined
        expect(weightedSort(undefined)).toBe('');
        //Arrays/Objects <- Arrays are objects
        expect(weightedSort({ test: 'test' })).toBe(
            'Invalid Input Type. Expected: "string", Received: "object"',
        );
        expect(weightedSort([1, 2, 3])).toBe(
            'Invalid Input Type. Expected: "string", Received: "object"',
        );
        expect(weightedSort(() => {})).toBe(
            'Invalid Input Type. Expected: "string", Received: "function"',
        );
    });
    it('returns known invalid string', () => {
        //Check empty strings and lists with non numbers in them
        expect(weightedSort()).toBe('');
        expect(weightedSort('')).toBe('');
        expect(weightedSort('t')).toBe('"t" is not a number');
        expect(weightedSort('8 16 124 x 7 91')).toBe('"x" is not a number');
        expect(weightedSort('8,16,124,12,7,91')).toBe(
            '"8,16,124,12,7,91" is not a number',
        );
        expect(weightedSort('8, 16, 124, 12, 7, 91')).toBe(
            '"8," is not a number',
        );
    });
    it('sorts list by weight', () => {
        //Check variety of lists
        expect(weightedSort('56 65 74 100 99 68 86 180 90')).toBe(
            '100 180 90 56 65 74 68 86 99',
        );
        expect(weightedSort('1 17 9 4 20')).toBe('1 20 4 9 17');
        expect(weightedSort('1')).toBe('1');
        expect(weightedSort('8 26')).toBe('26 8');
    });
}
