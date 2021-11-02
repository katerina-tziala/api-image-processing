# Image Processing API

An API for image processing that can be used in two different ways:

1. As a **_simple placeholder API_** for rapid prototyping that allows you to place images into your frontend with the stylization you prefer via URL parameters.
2. As a **_library_** to serve properly processed and scaled versions of your images to the frontend to reduce page load size.

## Prerequisites

Node version >= 12.13.0

## Technologies

Here’s a high level list of the technologies used for this app:

- **For development:** [Node.js v16.13.0](https://nodejs.org/en/), [TypeScript](https://www.typescriptlang.org/) and [sharp](https://www.npmjs.com/package/sharp)

- **For Testing:** [jasmine](https://www.npmjs.com/package/jasmine)

- **For Code Styling:** [eslint](https://eslint.org/) and [prettier](https://prettier.io/)

## Running the App

1. Fork and clone this repository.

2. To install the dependencies of the app, run in the project directory `npm install` or `npm i`
3. To execute the app:

   - in production mode, run in the project directory: `npm run start`

   - in development mode, run in the project directory: `npm run dev`

## Code Quality and Testing

The preferred settings (coding style) of the app can be fount in the .prettierrc and .eslintrc files.

To check the code consistensy to the chosen coding style run in the project directory `npm run prettier-check`.

To apply the chosen coding style run in the project directory `npm run prettier`.

To lint the app run in the project directory `npm run lint`.

To test the app run in the project directory `npm run test`.

## Future Improvements

1. Create a front-end for uploading more images to the full-size directory.
2. Create a front-end that displays a thumbnail directory.
3. Create a front-end that allows for the selection of how to process a selected image.
