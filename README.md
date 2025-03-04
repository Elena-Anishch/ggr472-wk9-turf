# GGR472 Week 9: Introduction to GIS analysis with Turf.js
 
This repository contains resources to help students learn about using the Turf.js library to perform geospatial analysis on 1) existing data stored in a GeoJSON and 2) user input data (such as clicked locations on the map)


## Repository Contents

- `index.html`: HTML file to render the map and buttons for analysis
- `style.css`: CSS file for positioning the map interface and HTML elements
- `script-1-existingdata.js`: JavaScript file containing code for basic geometric functions such as calculating areas, distances, and returning bounding boxes. Functions are performed on existing data stored as GeoJSON files.
- `script-2-inputdata.js`: JavaScript file containing code for recording user input (e.g., point data based on XY coordinates of map click events)


## Objectives

This code is provided to help with learning the following concepts:

1. **Introduction to GIS analysis in a web map**
   - Perform basic geometric operations on existing and user input data
   

## Exercise

To work through the exercise:

1. Clone this repository to your local machine
2. Open `index.html` in a web browser to view the map

Part 1: Existing data
1. Update the public access token in `script-1-existingdata.js`
2. Read through the prepare data section and make sure you understand how to fetch GeoJSON data from a URL. You may like to update the links to your own point and polygon GeoJSON files here
3. Explore the methods on https://turfjs.org/
4. The method to measure an area of a polygon when the area button is clicked has been provided for you. See if you can use this and the Turf documentation as a starting point to write your own methods to:
    - Measure the distance between two select points
    - Create a bounding box around points

Part 2: User input data
1. Update `index.html` by first commenting out previous buttons and JS source and second uncommenting the buffer button and link to `script-2-inputdata.js`
2. Update the public access token in `script-2-inputdata.js`
3. Read through the code for creating empty variable to store user input
4. Notice how map click events are used to create and add new points to the empty variable. Open the map and check this works as expected.
5. See if you can add your own code to run a turf.buffer function and add the output to an empty feature class when the buffer button is clicked


### Answers will be uploaded to this repository after class
