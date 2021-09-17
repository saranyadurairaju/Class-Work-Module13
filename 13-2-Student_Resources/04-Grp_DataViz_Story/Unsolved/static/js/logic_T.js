// static/js/logic.js

// Create base tile layers
var streetmap = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox/streets-v11',
  accessToken: API_KEY
});

var lightmap = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox/light-v10',
  accessToken: API_KEY
});

// Create map object with streetmap as default base layer
var myMap = L.map("map", {
  center: [
    42.3100, -71.1100
  ],
  zoom: 12,
  layers: [streetmap]
});


// Use this link to get the Neighborhoods geojson data.
var neighborhoodsLink = "static/data/Boston_Neighborhoods.geojson"

// Use this link to get the WiFi geojson data.
var wifiLink = "static/data/Wicked_Free_Wi-Fi_Locations.geojson"

// Get our Neighborhoods GeoJSON data using d3.json
d3.json(neighborhoodsLink, function(data) {

  // Create a geoJSON layer with the retrieved data
  var neighborhoods = L.geoJson(data, {
    // Style each feature
    style: function(feature) {
      return {
        fillOpacity: 0.5,
        color: "#4c4c4c",
        stroke: true,
        weight: 1.0
      };
    },

    // Called on each feature
    onEachFeature(feature, layer) {
      // Set mouse events to change map styling
      layer.on({
        // When a user's mouse touches a map feature, the mouseover event calls this function, that feature's opacity changes to 90% so that it stands out
        mouseover: function(event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.9
          });
        },

        // When the cursor no longer hovers over a map feature - when the mouseout event occurs - the feature's opacity reverts back to 50%
        mouseout: function(event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.5
          });
        },

        // When a feature (neighborhood) is clicked, it is enlarged to fit the screen
        click: function(event) {
          //myMap.fitBounds(event.target.getBounds());
          myMap.setView(event.latlng, 13);
          // Log Neighborhood Name to Console
          console.log(event.target.feature.properties.Name);
          console.log("Number of WiFi Hotspots: ");
        }

      });

      // Popup Displaying Neighborhood Name
      layer.bindPopup("<h3>" + feature.properties.Name + "</h3>");
    }

  }).addTo(myMap);

  // Retrieve the WiFi locations layer for our map.
  let wifiLocations = new L.LayerGroup();

  // Retrieve the WiFi locations GeoJSON data.
  d3.json(wifiLink, function(data) {
    L.geoJson(data, {
      onEachFeature: function(feature, layer) {
        layer.bindPopup("<h3>" + feature.properties.Address + "</h3><h4>Neighborhood: " + feature.properties.Neighborhood + "</h4>")
      }
    }).addTo(wifiLocations);

    // Add the wifiLocations layer to our map.
    wifiLocations.addTo(myMap);
  });

  // Define a baseMaps object to hold base layers
  var baseMaps = {
    "Street Map": streetmap,
    "Light Map": lightmap
  };

  // Define an overlay object to selectively display boroughs data
  var overlayMaps = {
    "Boston Neighborhoods": neighborhoods,
    "Public WiFi APs": wifiLocations
  };

  // Add a Layer Control Object
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

});
