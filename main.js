import './style.css'

document.title = "markerMap"

// CHECKBOX and ARRAY
const nukeBox = document.getElementById("nukeCheckBox")
const metBox = document.getElementById("metCheckBox")
const eqBox = document.getElementById("eqCheckBox")

const nuclearPlans = []
const meteorites = []
const earthquackes = []

// MAP
var map = L.map('map').setView([0,0], 2);

L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>'
}).addTo(map);

// ICON
var nukeIcon = L.icon({
    iconUrl: 'nukeIcon.png',
    popupAnchor:  [16, 8] 
});

var metIcon = L.icon({
    iconUrl: 'metIcon.png',
    popupAnchor:  [15, 30]
});

var eqIcon = L.icon({
    iconUrl: 'eqIcon.png',
    popupAnchor:  [25.25, 8]
});

// FETCH FUCTION
function init() {
  
  // Power plans
  fetch("https://raw.githubusercontent.com/cristianst85/GeoNuclearData/master/data/json/denormalized/nuclear_power_plants.json")
    .then(r => r.json())
    .then(body => {
      console.log(body)
  
      for (let i = 0; i < body.length; i++) {
  
        const {Latitude, Longitude, Name} = body[i]
        
        if(Latitude != null || Longitude != null)
          var markerNuke = L.marker([Latitude, Longitude], {icon: nukeIcon})
          markerNuke.bindPopup(Name);
          nuclearPlans.push(markerNuke)
      }
      
    })

  // Meteorites
  fetch("https://data.nasa.gov/resource/gh4g-9sfh.json")
    .then(r => r.json())
    .then(body => {
  
      for (let i = 0; i < body.length; i++) {
        
        const {reclat, reclong, name} = body[i]
        
        if(reclat != null || reclong != null)
          var markerMet = L.marker([reclat, reclong], {icon: metIcon})
          markerMet.bindPopup(name)
          meteorites.push(markerMet)
      }
      
    })

  // earthquakes
  fetch("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_day.geojson")
    .then(r => r.json())
    .then(body => {
  
      for (let i = 0; i < body.features.length; i++) {
  			const id = body.features[i].id
        const lat = body.features[i].geometry.coordinates[0]
        const long = body.features[i].geometry.coordinates[1]
          
        if(lat != null || long != null) {
  				var markerEq = L.marker([lat, long], {icon: eqIcon})
  				markerEq.bindPopup(id)
  				earthquackes.push(markerEq)
  			}
  		}		
    })
}init()

// EVENTS FUNCTION
nukeBox.addEventListener('click', () => {
	if(nukeBox.checked) {
		for (let i = 0; i < nuclearPlans.length; i++) {
			nuclearPlans[i].addTo(map)
		}
	} else {
		for (let i = 0; i < nuclearPlans.length; i++) {
			map.removeLayer(nuclearPlans[i])
		}
	}
})

metBox.addEventListener('click', () => {
	if(metBox.checked) {
		for (let i = 0; i < meteorites.length; i++) {
			meteorites[i].addTo(map)
		}
	} else {
		for (let i = 0; i < meteorites.length; i++) {
			map.removeLayer(meteorites[i])
		}
	}
})

eqBox.addEventListener('click', () => {
	if(eqBox.checked) {
		for (let i = 0; i < earthquackes.length; i++) {
			earthquackes[i].addTo(map)
		}
	} else {
		for (let i = 0; i < earthquackes.length; i++) {
			map.removeLayer(earthquackes[i])
		}
	}
})