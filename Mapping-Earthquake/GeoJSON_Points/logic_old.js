// Add console.log to check to see if our code is working.
console.log("working");

// Create the map object with a center and zoom level.
// let map = L.map('mapid').setView([40.7, -94.5], 4);

//  Add a marker to the map for Los Angeles, California.
// let marker = L.marker([34.0522, -118.2437]).addTo(map);

// while using circle the setview values are different for a bigger circle
let map = L.map('mapid').setView([34.0522, -118.2437], 14);

// let circle = L.circle([34.0522, -118.2437],{color: 'black', fillColor: 'lightyellow', fillOpacity: 0.5, radius: 300}).addTo(map);
let circle = L.circleMarker([34.0522, -118.2437],{radius: 300, color: 'black', fillcolor: '#ffffa1'}).addTo(map);
// let polygon = L.polygon([ [34.0522, -118.2437], [29.7604, -95.3698], [40.7128, -74.0059] ]).addTo(map);
// console.log(polygon)

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "dark-v10",
    // id: "streets-v11",
    accessToken: API_KEY
});

// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);
