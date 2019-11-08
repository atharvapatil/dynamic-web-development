window.addEventListener('load', displayData);

setInterval(displayData, 2000);

async function displayData() {
  fetchISSLocation()
    .then((data) => {
      console.log(data);
      const {
        latitude,
        longitude,
        velocity
      } = data;

      document.getElementById('lat').textContent = latitude.toFixed(2);
      document.getElementById('lon').textContent = longitude.toFixed(2);
      document.getElementById('velocity').textContent = velocity.toFixed(2);

      const map = L.map('issMap').setView([0, 0], 6);
      const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
      const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
      const tiles = L.tileLayer(tileUrl, {
        attribution
      });
      tiles.addTo(map);

      const issIcon = L.icon({
        iconUrl: 'issIcon.png',
        iconSize: [64, 64],
        iconAnchor: [32, 32]
      });

      let marker = L.marker([0, 0], {
        icon: issIcon
      }).addTo(map);

      map.setView([latitude, longitude], map.getZoom());
      marker.setLatLng([latitude, longitude]);

    })
    .catch((error) => {
      console.error(error);
    })

}


// Fetching the ISS data from the API
async function fetchISSLocation() {
  const response = await fetch('https://api.wheretheiss.at/v1/satellites/25544');
  const data = await response.json();
  // console.log(data);

  const latitude = data.latitude;
  const longitude = data.longitude;
  const velocity = data.velocity;

  return {
    latitude,
    longitude,
    velocity
  }
}
