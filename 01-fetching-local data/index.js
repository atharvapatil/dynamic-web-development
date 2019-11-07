console.log('Begining the data fetching');

window.addEventListener('DOMContentLoaded', () => {
    fetchText()
      .then((text) => {
        document.getElementById('text').innerText = text;
        console.log('The text was displayed successfully');
    })
      .catch((error) => {
        console.log('An Error Occured');
        console.error(error);
    })
});

function displayImage(){
  fetchImage()
  .then((image) => {
    document.getElementById('image').src = URL.createObjectURL(image);
    console.log('The Image was displayed successfully');
  })
  .catch((error) => {
    console.log('An Error Occured');
    console.error(error);
  })
}


async function fetchText(){
  const response = await fetch('sampleText.txt');
  const data = await response.text();

  console.log(data);

  return data
  // The text data has been fetched at this point
  // Doing something with the data that has been fetched
}

async function fetchImage(){
  const response = await fetch('sampleImage.png');
  const data = await response.blob();

  console.log(data.type);

  return data;
  // document.getElementById('image').src = URL.createObjectURL(data);

  // The text data has been fetched at this point
  // Doing something with the data that has been fetched
}
