//Create a function that will take in a random string and mask the last 4 numbers using asterkisk (*)

export const mask = (input: string) => {
    return '*';
};

if (import.meta.vitest) {
    const { it, expect } = import.meta.vitest;
    it('mask', () => {
        expect(mask('test')).toBe('test');
    });
}
