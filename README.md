# Image Processing API

An API for image processing that can be used in two different ways:

1. As a ***simple placeholder API*** for rapid prototyping that allows you to place images into your frontend with the stylization you prefer via URL parameters.
2. As a ***library*** to serve properly processed and scaled versions of your images to the frontend to reduce page load size. 

## Prerequisites

Node version >= 12.13.0

## Running the App

1. Fork and clone this repository.

2. To install the dependencies of the app, run  in the project directory:

    ```
    npm install
    ```

    or

    ```
    npm i
    ```
    

3. To start the app, run  in the project directory:

    ```
    npm run start
    ``` 

4. Access the app locally at: http://localhost:3000/






## Code Quality
The preferred settings (coding style) of the app can be fount in the .prettierrc and .eslintrc files.

To check the code consistensy to the chosen coding style run ```npm run prettier-check```.

To apply the chosen coding style run ```npm run prettier```.
To lint the app run ```npm run lint```.


## Future Improvements 

1. Create a front-end for uploading more images to the full-size directory.
2. Create a front-end that displays a thumbnail directory.
3. Create a front-end that allows for the selection of how to process a selected image.
