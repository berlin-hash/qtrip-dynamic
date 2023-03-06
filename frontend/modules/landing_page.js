import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  console.log("Form initt()");
  console.log(config.backendEndpoint);

  let cities = await fetchCities();
  console.log(cities);
  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try{
    let fetched = await fetch(config.backendEndpoint + '/cities')
  let data = await fetched.json()
  return data
  }
  catch(err){
    console.log(err);
    return null
  }

}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  let card = document.createElement("div")
  card.className = "col-12 col-md-6 col-xl-3 mt-3"
  card.innerHTML = `
  
  <a href="./pages/adventures/?city=${id}" id="${id}">
  <div class="tile card text-white border-0 " >
    <div class="card-body">
      <img class="card-img tile-img" src="${image}" alt="" />

      <div class="card-img-overlay d-flex flex-column justify-content-end align-items-center">
        <div><p class="card-title">${city}</p></div>
        <div > <p class="card-text">${description}</p></div>
      </div>
    </div>
  </div>
  </a>
`

let data = document.getElementById("data")
data.append(card)

}

export { init, fetchCities, addCityToDOM };
