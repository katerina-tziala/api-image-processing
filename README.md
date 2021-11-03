# :rocket: Image Processing API

An API for image processing (resize, rotate, flip, flop and convert the image format) that can be used in two different ways:

1. As a **_simple placeholder API_** for rapid prototyping that allows you to place images into your frontend with the stylization you prefer via URL parameters.
2. As a **_library_** to serve properly processed and scaled versions of your images to the frontend to reduce page load size.

## Prerequisites

Node version >= 12.13.0

## Technologies

Here’s a high level list of the technologies used for this app:

- **For development:** [Node.js v16.13.0](https://nodejs.org/en/), [TypeScript](https://www.typescriptlang.org/) and [Sharp](https://www.npmjs.com/package/sharp)

- **For Testing:** [Jasmine](https://www.npmjs.com/package/jasmine)

- **For Code Styling:** [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/)

## Running the App

1. Fork and clone this repository.

2. To install the dependencies of the app, run in the project directory `npm install` or `npm i`

3. To execute the app:

   - in production mode, run in the project directory: `npm run start`

   - in development mode, run in the project directory: `npm run dev`

## Code Quality and Testing

The commands to check the code quality and test the api must be run in the project directory.

### Code Quality

The preferred settings (coding style) of the app can be fount in the .prettierrc and .eslintrc files.

To check the code consistensy to the chosen coding style run `npm run prettier-check`.

To apply the chosen coding style run `npm run prettier`.

To lint the app run `npm run lint`.

### Testing

To test the app run in the project directory `npm run test`.

## API Usage

The server is running at http://localhost:3000.  
When accessing this endpoint, the server responds with status 200 and a message that the server is up and running providing the timestamp that the server started.

The API is running at http://localhost:3000/api.  
When accessing this endpoint, the server responds with status 200 and a message that the API is listening.

The images endpoint can be accessed at http://localhost:3000/api/images.

**_Query Params_**

| key    | description                                                         |
| ------ | ------------------------------------------------------------------- |
| name   | **required** The name of the requested image.                       |
| format | **required** The format of the requested image.                     |
| width  | **optional** The width of the requested image.                      |
| height | **optional** The height of the requested image.                     |
| flip   | **optional** If requested the image should be flipped horizontally. |
| flop   | **optional** If requested the image should be flipped vertically.   |
| rotate | **optional** The rotation angle of the requested image.             |




**_Possible Errors_**

| Error Code                | description                                         |
| ------------------------- | --------------------------------------------------- |
| 400 Bad Request           | Required query params were not specified or invalid |
| 404 Not Found             | Image was not found                                 |
| 500 Internal Server Error | The image could not be processed                    |

### NOTES

1. The available images are:

   encenadaport, fjord, icelandwaterfall, palmtunnel, santamonica

2. The allowed formats are:

   gif, heif, jpeg, jpg, png, svg, tiff, webp

3. Image dimensions:

   - If width and height are not defined the requested image is served in it's original size.

   - If one of the width and height are specified then the respective dimension is set automatically for an optimal result in the processed image

   - For each one of the dimensions, when specified must take values in the range 20 - 3000

### EXAMPLES

**Example 1**  
http://localhost:3000/api/images?name=santamonica&format=png&width=300&flop=true&rotate=45

Will return a scaled, flipped horizontally and rotated by 45degrees png of the original image.

**Example 2**  
http://localhost:3000/api/images?name=fjord&format=png&width=300&flip=true

Will return a scaled and vertically flipped png of the original image.

## Future Improvements

1. Create a front-end for uploading more images to the full-size directory.
2. Create a front-end that displays a thumbnail directory.
3. Create a front-end that allows for the selection of how to process a selected image.

## ATTRIBUTIONS

All images were provided by [Udacity](https://www.udacity.com/) no rights claimed.
