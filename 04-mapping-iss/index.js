window.addEventListener('load', displayData);

async function displayData() {

  const map = L.map('issMap').setView([0, 0], 4);
  const attribution =
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
  const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  const tiles = L.tileLayer(tileUrl, {
    attribution
  });
  tiles.addTo(map);
  // Making a marker with a custom icon
  const issIcon = L.icon({
    iconUrl: 'issIcon.png',
    iconSize: [72, 72],
    iconAnchor: [36, 36]
  });
  let marker = L.marker([0, 0], {
    icon: issIcon
  }).addTo(map);


  // Fetching the ISS data from the API
  async function fetchISSLocation() {
    const response = await fetch('https://api.wheretheiss.at/v1/satellites/25544');
    const data = await response.json();
    // console.log(data);

    const latitude = data.latitude;
    const longitude = data.longitude;
    const velocity = data.velocity;
    const time = data.timestamp;

    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    let date = new Date(time * 1000);
    let hours = date.getHours();
    let minutes = "0" + date.getMinutes();
    let seconds = "0" + date.getSeconds();
    let formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);


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
