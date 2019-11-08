console.log('Javascript actions active');

window.addEventListener('load', displayDrink);


async function displayDrink(){
  const data = await fetchDrink();
  const {drink_category, drink_name, drink_instructions, drink_thumbnail} = data;

  document.getElementById('drink_thumbnail').src =  await drink_thumbnail;
  document.getElementById('drink_category').innerHTML =  await drink_category;
  document.getElementById('drink_name').innerHTML =  await drink_name;
  document.getElementById('drink_instructions').innerHTML =  await drink_instructions;

}

async function fetchDrink(){
  const response  = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
  const data = await response.json();

  const drink = data.drinks[0];
  console.log(drink);

  const drink_category = drink.strCategory;
  const drink_name = drink.strDrink;
  const drink_instructions = drink.strInstructions;
  const drink_thumbnail = drink.strDrinkThumb;
  // console.log(drink_category + "\n" + drink_name + "\n" + drink_instructions);

  return {drink_category, drink_name, drink_instructions, drink_thumbnail};
}
