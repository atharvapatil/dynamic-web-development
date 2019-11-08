window.addEventListener('load', displayData);

// setInterval(fetchISSLocation, 2000);


async function displayData() {

const map = L.map('issMap').setView([0, 0], 4);
    const attribution =
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
    const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    const tiles = L.tileLayer(tileUrl, { attribution });
    tiles.addTo(map);
    // Making a marker with a custom icon
    const issIcon = L.icon({
      iconUrl: 'issIcon.png',
      iconSize: [56, 56],
      iconAnchor: [28, 28]
    });
    let marker = L.marker([0, 0], { icon: issIcon }).addTo(map);


      // Fetching the ISS data from the API
async function fetchISSLocation() {
  const response = await fetch('https://api.wheretheiss.at/v1/satellites/25544');
  const data = await response.json();
  // console.log(data);

  const latitude = data.latitude;
  const longitude = data.longitude;
  const velocity = data.velocity;
  const time = data.timestamp;

  // Create a new JavaScript Date object based on the timestamp
// multiplied by 1000 so that the argument is in milliseconds, not seconds.
var date = new Date(time*1000);
// Hours part from the timestamp
var hours = date.getHours();
// Minutes part from the timestamp
var minutes = "0" + date.getMinutes();
// Seconds part from the timestamp
var seconds = "0" + date.getSeconds();

// Will display time in 10:30:23 format
var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);


  document.getElementById('lat').textContent = latitude.toFixed(2);
  document.getElementById('lon').textContent = longitude.toFixed(2);
  document.getElementById('velocity').textContent = velocity.toFixed(2);
  document.getElementById('time').textContent = formattedTime

  map.setView([latitude, longitude], map.getZoom());
  marker.setLatLng([latitude, longitude]);

}

fetchISSLocation();

setInterval(fetchISSLocation, 1200);

}
