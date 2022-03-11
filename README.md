# INFO

This repository uses [vitest](https://vitest.dev/) as the testing library

The src folder contains the `main.ts` file and the `test` directory which exports each test

vitest supports in-source testing which means that the test can be placed in the same area as the code
which helps to keep your tests and code coupled which draws inspiration from [Rust](https://www.rust-lang.org/)
You can however decouple your test and functions if you please

The `index.ts` file in `src/tests/` exports each function so that you can import all your required functions from one place
In `src/main.ts` we use this to import all functions so we can dynamically use them to populate the DOM

# Running

To run `git clone` or download the repo and `cd` into `Test_Driven_Development/`

Then run `pnpm install`
