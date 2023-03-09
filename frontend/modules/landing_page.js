import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  //Updates the DOM with the cities
  if (cities) {
    cities.forEach((key) => {
      addCityToDOM(key.id, key.city, key.description, key.image);
    });
  }
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
  <div class="tile text-white border-0" >
   
      <img class="" src="${image}" alt="" />

      <div class="card-img-overlay d-flex flex-column justify-content-end align-items-center tile-text">
        <div><p class="card-title">${city}</p></div>
        <div > <p class="card-text">${description}</p></div>
      </div>
    
  </div>
  </a>
`

let data = document.getElementById("data")
data.append(card)

}

export { init, fetchCities, addCityToDOM };
