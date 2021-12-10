

// Set value for a range element
function setValueFroRange(event) {
    console.log(event)
    const x = document.getElementById("generalFeeling").value;
    console.log('Range value = ' + x)
    document.getElementById("generalFeelingRangeValue").innerHTML = x;
}

const elem = document.getElementById("generalFeeling");
elem.addEventListener("change", setValueFroRange);

///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
//https://cloud.google.com/blog/products/maps-platform/quick-map-layer-visualizations-geojson-and-georss
//https://developers.google.com/maps/documentation/javascript/markers#maps_icon_simple-javascript
//https://stackoverflow.com/questions/30574959/set-fill-color-marker-google-map
function pinSymbol(color) {
    return {
        path: 'M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z',
        fillColor: color,
        fillOpacity: 1,
        strokeColor: '#000',
        strokeWeight: 2,
        scale: 1
    };
}

function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: { lat: 51.50093098544679, lng: -0.015221855144604184 }
    });

    var tempObject =
    {
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [-0.015221, 51.500930]
        },
        "properties": {
            "name": "Initial one",
        }
    }

    map.data.addGeoJson(tempObject);


    // 2nd way

    const positions = { lat: 51.50, lng: -0.016 }
    let marker = new google.maps.Marker({
        position: positions,
        title: "For accessability",
        label: "Hello Mr Pawel",
        icon: pinSymbol('green')
    });

    marker.setMap(map)
}
/*
// https://developers.google.com/maps/documentation/javascript/importing_data
let map;

function initMap() {
    console.log('I am being called')
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 2,
        center: new google.maps.LatLng(2.8, -187.3),
        mapTypeId: "terrain",
    });

    // Create a <script> tag and set the USGS URL as the source.
    const script = document.createElement("script");

    // This example uses a local copy of the GeoJSON stored at
    // http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojsonp
    script.src =
        "https://developers.google.com/maps/documentation/javascript/examples/json/earthquake_GeoJSONP.js";
    document.getElementsByTagName("head")[0].appendChild(script);
}

// Loop through the results array and place a marker for each
// set of coordinates.
const eqfeed_callback = function (results) {
    for (let i = 0; i < results.features.length; i++) {
        const coords = results.features[i].geometry.coordinates;
        const latLng = new google.maps.LatLng(coords[1], coords[0]);

        new google.maps.Marker({
            position: latLng,
            map: map,
        });
    }
};
*/