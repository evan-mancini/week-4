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
            '#cd21bf',
            '2B',
            '#96b4b9',
            '3A',
            '#199ad0',
            '3E',
            '#1eeee5',
            '3B',
            '#f999bc',
            '1D',
            '#a7258e',
            '3D',
            '#ee473b',
            '2D',
            '#9c37b6',
            '2E',
            '#f60479',
            '2C',
            '#c95b5f',
            '3C',
            '#c41fc4',
            '4C',
            '#ecf3f7',
            '4d',
            '#bda15e',
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