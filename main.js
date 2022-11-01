import './style.css'

// MAP
var map = L.map('map').setView([59.206000, 18.082900], 13).fitWorld();

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// ICON
var nuclearIcon = L.icon({
    iconUrl: 'nuclearIcon.png',
    //shadowUrl: 'leaf-shadow.png',

    iconSize:     [65, 75], // size of the icon
    //shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    //shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [10.5, -90] // point from which the popup should open relative to the iconAnchor
});

// FETCH
fetch("https://raw.githubusercontent.com/cristianst85/GeoNuclearData/master/data/json/denormalized/nuclear_power_plants.json")
  .then(r => r.json())
  .then(body => {
    console.log(body)

    for (let i = 0; i < body.length; i++) {
      //const info = body[i]
      //console.log(info)

      const {Latitude, Longitude, Name} = body[i]
      //console.log(Latitude)
      if(Latitude != null || Longitude != null)
        var markerTest = L.marker([Latitude, Longitude], {icon: nuclearIcon}).addTo(map).bindPopup(Name);
    }
    
  })
