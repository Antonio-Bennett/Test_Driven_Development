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

//Stricter parsing of number due to the default behaviour of parseInt returning the first parsed
//value in a single comma or space seperated string.
//Example: parseInt('1,2,3') returns 1. In our case space separated string would be fine since we go over
//each num in string but comma separated strings are invalid
const filterInt = (value: string) => {
    if (/^[-+]?(\d+|Infinity)$/.test(value)) {
        return Number(value);
    } else {
        return NaN;
    }
};

const sumOfDigits = (num: number) => {
    let sum = 0;
    while (num) {
        sum += num % 10;
        num = Math.floor(num / 10);
    }
    return sum;
};

export const weightedSort = (input = '') => {
    //If input is invalid type
    if (typeof input != 'string')
        return `Invalid Input Type. Expected: "string", Received: "${typeof input}"`;

    //Empty string
    if (input.length < 1) return input;

    //Here we do a try catch because instead of going through each num once to check if they are numbers
    //then going through the list to map each num again and then sorting, we can check and map in one pass
    //and then sort improving the effeciency
    let weightedSum: [string, number][];
    try {
        weightedSum = input.split(' ').map((num) => {
            const parsed = filterInt(num);
            if (isNaN(parsed)) throw new Error(`"${num}" is not a number`);
            //We return a "tuple" really we are just going to use destructuring assignment later for sorting
            //We return the string version  of num and it's sum so that if the sum is equal we compare the string for sorting
            return [num, sumOfDigits(parsed)];
        });
    } catch (error) {
        //Return error message we threw
        return error.message;
    }

    //This checks if the string value of tuple is equal if so compare them as strings and return otherwise
    //do regular sorting of numbers the map over sorted array to exclude the sumOfDigits then join by space and return
    return weightedSum
        .sort((a, b) => {
            const [aString, aSum] = a;
            const [bString, bSum] = b;

            if (aSum === bSum)
                return aString < bString ? Number(-1) : Number(1);

            return aSum - bSum;
        })
        .map(([num, _]) => num)
        .join(' ');
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
        expect(weightedSort('1 17 9 4 20')).toBe('1 20 4 17 9');
        expect(weightedSort('1')).toBe('1');
        expect(weightedSort('8 26')).toBe('26 8');
    });
}
