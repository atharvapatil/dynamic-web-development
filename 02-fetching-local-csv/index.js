console.log('Javascript actions active');

window.addEventListener('load', graphData);


async function graphData(){
  let ctx = document.getElementById('myChart').getContext('2d');
  const data = await fetchCSV();

  console.log(data);

  var myChart = new Chart(ctx, {
    type: 'polarArea',
    data: {
        label: 'Price',
        datasets: [{
            labels: ['AirBnb Prices'],
            data: data.price,
            fill: false,
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});

}


async function fetchCSV(){
  const response = await fetch('./data/airbnb_small.csv');
  const data = await response.text();

  const borough = [];
  const neighbourhood = [];
  const room_type = [];
  const price = [];

  //removing the first row of the CSV file which are the headers
  const rows = data.split('\n').slice(1);

  rows.forEach((row) => {
      const columns = row.split(',');
      borough.push(columns[0]);
      neighbourhood.push(columns[1]);
      room_type.push(columns[2]);
      price.push(columns[3]);
  })
  // console.log(borough);

  return {borough, neighbourhood, room_type, price}

}
