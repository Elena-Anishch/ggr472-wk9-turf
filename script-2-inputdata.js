/*--------------------------------------------------------------------
GGR472 WEEK 9: Introduction to Turf.js
ii) Working with user input data
--------------------------------------------------------------------*/

// Define access token
mapboxgl.accessToken = ''; //****ADD YOUR PUBLIC ACCESS TOKEN*****

// Initialize map
const map = new mapboxgl.Map({
    container: 'map', // container id in HTML
    style: 'mapbox://styles/mapbox/streets-v12',  // stylesheet location
    center: [-79.39, 43.65],  // starting point, longitude/latitude 43.652652, -79.393014
    zoom: 12 // starting zoom level
});

// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());


/*--------------------------------------------------------------------
STORE USER INPUT FEATURES AS GEOJSON (map clicks as points)
--------------------------------------------------------------------*/

// Create empty GeoJSON object to hold point features
let geojson = {
    'type': 'FeatureCollection',
    'features': []
};

// Set data source and style on map load
map.on('load', () => {
    // Add datasource using GeoJSON variable
    map.addSource('inputgeojson', {
        type: 'geojson',
        data: geojson
    });

    // Set style for when new points are added to the data source
    map.addLayer({
        'id': 'input-pnts',
        'type': 'circle',
        'source': 'inputgeojson',
        'paint': {
            'circle-radius': 5,
            'circle-color': 'blue'
        }
    });

});

// Add input features to data source based on mouse click and display in map
map.on('click', (e) => {
    
    // Store clicked point as geojson feature
    const clickedpoint = {
        'type': 'Feature',
        'geometry': {
            'type': 'Point',
            'coordinates': [e.lngLat.lng, e.lngLat.lat] // Access map coords of mouse click
        }
    };

    // Add clicked point to previously empty geojson FeatureCollection variable using push method
    geojson.features.push(clickedpoint);

    // Update the datasource to include clicked points
    map.getSource('inputgeojson').setData(geojson);

});


/*--------------------------------------------------------------------
STORE USER INPUT FEATURES AS GEOJSON (buffers of clicked points)
--------------------------------------------------------------------*/

/* YOUR TURN:
Using the code above and the Turf documentation (https://turfjs.org/), update the following code:
*/

document.getElementById('buffbutton').addEventListener('click', () => {


    //YOUR CODE HERE
    //  --> 1. Create variable for buffer and use turf.buffer function
    //  --> 2. Use addSource mapbox method with buffer geojson variable (buffresult) as data source
    //  --> 3. Use addLayer mapbox method to show buffers on map. Remember the type is "fill" for polygons
    //  --> 4. Option to disable buffbutton after use or experiment with updating data source/layer on each click


});


/* 
Answers will be uploaded to the GitHub repository after class
*/