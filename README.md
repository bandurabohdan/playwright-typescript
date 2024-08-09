# playwright-typescript

## Overview

This repository contains automation scripts for web testing using Playwright with TypeScript. The tests are designed to ensure that web applications function correctly and provide a good user experience.

## Features

- Web application testing using Playwright.
- TypeScript-based test scripts.
- Continuous integration with GitHub Actions for automated testing.


## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/bandurabohdan/playwright-typescript.git
    ```

2. Navigate into the project directory:

    ```bash
    cd playwright-typescript
    ```

3. Install the dependencies:

    ```bash
    npm install
    ```

## Usage

### Running Tests

To run the tests, use the following command:

Run all tests in headless mode
```bash
npm run test
```
Open ui mode for running tests
```bash
npm run test:ui
```
Run all tests with opened browser
```bash
npm run test:headed
```
Run all tests using only chrome browser
```bash
npm run test:chromium
```
Run all tests using only firefox browser
```bash
npm run test:firefox
```
Run all tests using only webkit browser
```bash
npm run test:webkit
```
Generate report after test run
```bash
npm run build:report"


## GitHub Actions

This project is set up with GitHub Actions for continuous integration. You can find the configuration in the `.github/workflows` directory.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a Pull Request.

## Contact

For any questions or issues, please contact:

- **Email**: bandurabogdan@gmail.com
- **GitHub**: [bandurabohdan](https://github.com/bandurabohdan)
