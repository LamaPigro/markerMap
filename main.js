import './style.css'

document.title = "markerMap"

// CHECKBOX
const nukeBox = document.getElementById("nukeBox")
const metBox = document.getElementById("metBox")
const eqBox = document.getElementById("eqBox")

function test() {
  if (nukebox.checked == true){
    console.log("hello")
  } else {
     console.log("fmmk")
  }
}

// MAP
var map = L.map('map').setView([0,0], 2);

L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>'
}).addTo(map);

// ICON
var nukeIcon = L.icon({
    iconUrl: 'nukeIcon.png',
    popupAnchor:  [16, 8] // point from which the popup should open relative to the iconAnchor
});

var metIcon = L.icon({
    iconUrl: 'metIcon.png',
    iconSize:     [65, 75], // size of the icon
    //popupAnchor:  [10.5, -90] // point from which the popup should open relative to the iconAnchor
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
        var markerNuke = L.marker([Latitude, Longitude], {icon: nukeIcon}).addTo(map).bindPopup(Name);
    }
    
  })

/*fetch("https://data.nasa.gov/resource/gh4g-9sfh.json")
  .then(r => r.jsx())
  .then(body => {)

    for (let i = 0; i < body.length; i++) {
      
      const {reclat, reclong, name} = body[i]
      
      if(reclat != null || reclong != null)
        var markerNet = L.marker([reclat, reclong], {icon: metIcon}).addTo(map).bindPopup(Name);
    }
    
  })*/