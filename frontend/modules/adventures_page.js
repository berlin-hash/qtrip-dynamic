import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  const params = new URLSearchParams(search);
  return params.get("city");
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try {
    let fetched = await fetch(
      config.backendEndpoint + "/adventures?city=" + city
    );
    let data = await fetched.json();
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  adventures.forEach((ele) => {
    // console.log((ele));
    let card = document.createElement("div");
    card.className = "col-6 col-md-6 col-xl-3 mt-3";
    card.innerHTML = `
      <a href="./detail/?adventure=${ele.id}" id="${ele.id}">
              <div class="activity-card card tile">
                <h4 class="category-banner">${ele.category}</h4> 
                <img
                    class="activity-card img"
                    src="${ele.image}"
                    alt=""
                  />
                <div class="card-body">
                  <div class="row">
                    <div class=" d-flex justify-content-between">
                      <div class="card-title" style="font-weight: bold">${ele.name}</div>
                      <div>Rs.${ele.costPerHead}</div>
                    </div>
                  </div>
                  <div class="row">
                    <div class=" d-flex justify-content-between">
                      <div class="card-title" style="font-weight: bold">Duration</div>
                      <div>${ele.duration} Hours</div>
                    </div>
                  </div>

                  
                </div>
              </div>
            </a>`;
    let data = document.getElementById("data");
    data.append(card);
  });
}
function filterByDuration(list, low, high){
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  let flist = list.filter((item)=> {
    return item.duration >= low && item.duration <= high
      
  })
  return flist
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  // console.log(categoryList);
  let flist = [];
  categoryList.forEach((cat) => {
    let dummylist = list
    let xlist = dummylist.filter((item) => {
      return item.category == cat;
    });
    flist = flist.concat(xlist);
  });
  return flist;
}
//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods

  // Place holder for functionality to work in the Stubs
  // console.log(filters);
  let filteredlist = []
  if (filters.category.length == 0 && filters.duration=="") return list;
  if(filters.category.length == 0){
    
    const duration = filters.duration.split("-")
    filteredlist = filterByDuration(list,duration[0],duration[1])
    return filteredlist
  }
  else if(filters.duration == ""){
    return filterByCategory(list, filters.category)
  }
  else{
    const duration = filters.duration.split("-")
    filteredlist = filterByDuration(list,duration[0],duration[1])
    return filterByCategory(filteredlist, filters.category)
    
  }
  
  
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  console.log(filters);
  window.localStorage.setItem("filters", JSON.stringify(filters)+"")
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object

  return JSON.parse(  window.localStorage.getItem("filters"))
  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  if(filters.category.length == 0)
    return
  filters.category.forEach(filter => {
    let pill = document.createElement("div")
    pill.className ="category-filter"
    
    pill.innerHTML=`
    ${filter}
    `
    document.getElementById("category-list").append(pill)
  })

  let durationSelectDiv = document.getElementById("duration-select")
  durationSelectDiv.ariaPlaceholder=filters.duration

}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
