/// <reference types="vitest" />

// Configure Vitest (https://vitest.dev/config)

import { defineConfig } from 'vite';

export default defineConfig({
    //This is needed so in production the bundler does dead code elimination of in source tests
    define: { 'import.meta.vitest': false },
    //This tells vitest to check for in source tests
    test: {
        includeSource: ['src/**/*.{js,ts}'],
    },
});
