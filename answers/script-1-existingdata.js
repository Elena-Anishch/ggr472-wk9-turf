/*--------------------------------------------------------------------
GGR472 WEEK 9: Introduction to Turf.js
i) Working with existing data
--------------------------------------------------------------------*/

// Define access token
mapboxgl.accessToken = ''; //****ADD YOUR PUBLIC ACCESS TOKEN*****

// Initialize map
const map = new mapboxgl.Map({
    container: 'map', //container id in HTML
    style: 'mapbox://styles/mapbox/streets-v12',  //stylesheet location
    center: [-79.39, 43.65],  // starting point, longitude/latitude 43.652652, -79.393014
    zoom: 12 // starting zoom level
});

// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());


/*--------------------------------------------------------------------
PREPARE DATA: STORE GEOJSON FROM URL AS VARIABLE
--------------------------------------------------------------------*/
let musgeojson;
let provgeojson;

// Fetch GeoJSON from URL and store response
fetch('https://raw.githubusercontent.com/smith-lg/ggr472-wk9-turf/main/data/torontomusicvenues.geojson')
    .then(response => response.json())
    .then(response => {
        console.log(response); //Check response in console
        musgeojson = response; // Store geojson as variable using URL from fetch response
    });


// Fetch GeoJSON from URL and store response
fetch('https://raw.githubusercontent.com/smith-lg/ggr472-wk9-turf/main/data/can-provterr.geojson')
    .then(response => response.json())
    .then(response => {
        console.log(response); // Check response in console
        provgeojson = response; // Store geojson as variable using URL from fetch response
    });


/*--------------------------------------------------------------------
GIS ANALYSIS: USE TURF FUNCTIONS TO ANALYSE GEOJSON VARIABLES
--------------------------------------------------------------------*/

/*
The code below shows how to use the Turf area function (https://turfjs.org/docs/#area) to calculate 
1) the total area of the polygon data
2) the area of each individual polygon within the data
Results are logged in the console and can be viewed using the web developer tools from the browser
*/

//Measure area of polygon
//returns in square meters - must convert to other units 'by hand'
document.getElementById('areabutton').addEventListener('click', () => {
    let area = turf.area(provgeojson);
    console.log("Canada has an area (in square meters) of: " + area);

    // iterate through all provinces and report areas
    provgeojson.features.forEach((feature) => {
        console.log(feature.properties.PRENAME + " has an area (in square meters) of: " + turf.area(feature));
    });
});



/* YOUR TURN:
Using the code above and the Turf documentation (https://turfjs.org/):

1. Measure the distance between two points
//  --> a. Add an event listener based on click of 'distbutton' button
//  --> b. Use turf.distance method. To access points in feature collection, you may use <name-of-geojson-variable>.features[<int>]
           For example: musgeojson.features[0] where [0] represents the first point in the collection
//  --> c. Use console.log() to view output in Google Developer Console
*/

document.getElementById('distbutton').addEventListener('click', () => {
    
    let distance = turf.distance(musgeojson.features[0], musgeojson.features[1], 'kilometers');
    console.log("Distance between " + musgeojson.features[0].properties.name + 
        " and " + musgeojson.features[1].properties.name + " : " + distance + " km");

});

/*
2. Create a bounding box around points
//  --> a. Add event listener based on click of 'bboxbutton' button
//  --> b. Create a variable for your bounding box output e.g., let envresult and assign value using turf.envelope function on musgeojson points
            E.g., let envresult = turf.[function]([input])
            Explore functions such as envelope and bbox in the turf documentation
//  --> c. Refer to envresult as data source in addSource method
//  --> d. Call new datasource in addLayer method
           c. and d. should still be positioned inside the event handler
//      e. Option to disable bboxbutton after use or experiment with removing data source/layer on each click
*/


document.getElementById('bboxbutton').addEventListener('click', () => {

    let envresult = turf.envelope(musgeojson); // create an 'envelope' around points and store as variable

    // add the envelope polygon we just created to the map
    map.addSource('envelopeGeoJSON', {
        "type": "geojson",
        "data": envresult  // use envelope json variable as data source
    })

    map.addLayer({
        "id": "musEnvelope",
        "type": "fill",
        "source": "envelopeGeoJSON",
        "paint": {
            'fill-color': "red",
            'fill-opacity': 0.5,
            'fill-outline-color': "black"
        }
    });

    document.getElementById('bboxbutton').disabled = true; // disable button after click

});


/*--------------------------------------------------------------------
LOAD DATA TO MAP USING GEOJSON VARIABLE
--------------------------------------------------------------------*/

/* 
Uncomment the following code to view the points on the map
*/


// map.on('load', () => {

//     //Add datasource using GeoJSON variable
//     map.addSource('toronto-mus', {
//         type: 'geojson',
//         data: musgeojson
//     });

//     map.addLayer({
//         'id': 'toronto-mus-pnts',
//         'type': 'circle',
//         'source': 'toronto-mus',
//         'paint': {
//             'circle-radius': 5,
//             'circle-color': 'blue'
//         }
//     });

// });