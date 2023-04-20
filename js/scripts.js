// adding access token

mapboxgl.accessToken = 'pk.eyJ1IjoiZXZhbm1hbmNpbmkiLCJhIjoiY2xnNXE5d2NlMDJxazNxcDhyc2g1eGo2eCJ9.9FsLDvuMxvT0C4cWbIsQAw';

// adding map, focusing on Queens Public Library at Ridgewood

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v11',
    center: [-73.90460017633869,40.70246967142133],
    zoom: 13.5
})

// reading in geojson data from PLUTO library

map.on('load', function () {
    map.addSource('pluto-ridgewood', {
    type: 'geojson',
    data: './data/ridgewood.geojson'
})

// color coding DSNY subdistricts with roads beneath

map.addLayer({
    id: 'fill-pluto-ridgewood',
    type: 'fill',
    source: 'pluto-ridgewood',
    paint: {
    'fill-color': [
            'match',
            ['get', 'SanitSub'],
            '1B',
            '#f4f455',
            '2B',
            '#f7d496',
            '3A',
            '#FF9900',
            '3E',
            '#f7cabf',
            '3B',
            '#ea6661',
            '1D',
            '#d36ff4',
            '3D',
            '#dac0e8',
            '2D',
            '#5CA2D1',
            '2E',
            '#8ece7c',
            '2C',
            '#bab8b6',
            '3C',
            '#5f5f60',
            '4C',
            '#5f5f60',
            '4d',
            '#fffff9',
            /* other */ '#ccc'
        ]
    }
}, 'road-label-simple')

// allowing users to click on each lot to learn about the DSNY subdistricts

map.on('click', 'fill-pluto-ridgewood', (e) => {
    new mapboxgl.Popup()
    .setLngLat(e.lngLat)
    .setHTML(e.features[0].properties.SanitSub)
    .addTo(map);
    });


})