import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL

  const params = new URLSearchParams(search);

  // Place holder for functionality to work in the Stubs
  return params.get("adventure");
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try {
    let fetched = await fetch(
      config.backendEndpoint + "/adventures/detail?adventure=" + adventureId
    );
    let data = await fetched.json();
    return data;
  } catch (err) {
    return null;
  }

  // Place holder for functionality to work in the Stubs
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM

  document.getElementById("adventure-name").innerHTML = adventure.name;
  document.getElementById("adventure-subtitle").innerHTML = adventure.subtitle;

  adventure.images.forEach((img) => {
    let card_img = document.createElement("img");
    card_img.className = "activity-card-image";
    card_img.src = img;

    document.getElementById("photo-gallery").append(card_img);
  });

  document.getElementById("adventure-content").innerText = adventure.content;
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  // document.getElementById("photo-gallery").innerHTML=""
  let carousel_inner = document.createElement("div");
  carousel_inner.className = "carousel-inner";
  images.forEach((img) => {
    let carousel_item = document.createElement("div");
    carousel_item.className = "carousel-item";
    carousel_item.innerHTML = `
    <img class="d-block w-100 activity-card-image" src=${img} alt="First slide">
    `;
    carousel_inner.append(carousel_item);
  });
  carousel_inner.firstChild.className = "carousel-item active";
  let d = document.createElement("div");
  d.append(carousel_inner);

  document.getElementById("photo-gallery").innerHTML = `
  <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  ${d.innerHTML}
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
  `;
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  console.log(adventure);
  if (adventure.available) {
    document.getElementById("reservation-panel-sold-out").style.display =
      "none";
    document.getElementById("reservation-panel-available").style.display =
      "block";
    document.getElementById("reservation-person-cost").innerHTML =
      adventure.costPerHead;
  } else {
    document.getElementById("reservation-panel-available").style.display =
      "none";
    document.getElementById("reservation-panel-sold-out").style.display =
      "block";
  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field

  let Tcost = document.getElementById("reservation-cost");
  let total = persons * adventure.costPerHead;
  Tcost.innerHTML = `${total}`;
}

//Implementation of reservation form submission
 function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  document.querySelector("#myForm").addEventListener("submit", (e) => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.target).entries());
    
    const update = {
      "name": data.name,
      "date": data.date,
      "person": data.person,
      "adventure": adventure.id
    }

    const options = {
      "method": "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(update)
    }
    console.log(update);
    fetch(config.backendEndpoint + '/reservations/new', options)
      .then(data => {
        if(!data.ok){
          throw Error(data.status)
        }
        return data.json()
      })
      .then(update => {
        console.log(update);
        alert("Success!")
      })
      .catch(e => {
        alert("Failed!")
      })
  });
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if(adventure.reserved === true){
    document.getElementById("reserved-banner").style.display = "block"
  }
  else{
    document.getElementById("reserved-banner").style.display = "none"

  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
