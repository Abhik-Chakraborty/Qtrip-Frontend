import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();
  console.log("Fetched Cities Data:", cities);

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
  try {
    // Fetch data from backend API
    let response = await fetch(`${config.backendEndpoint}/cities`);
    
    // Check if the response is successful (status 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Convert response to JSON
    let data = await response.json();
    console.log("API Response from /cities:", data);
    return data;
  } catch (error) {
    console.error("Error fetching cities:", error);
    return null;
  }

}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  let container = document.getElementById("data");

  // Create a div for the city card
  let cityCard = document.createElement("div");
  cityCard.className = "col-6 col-lg-3 mb-4"; 

  // Insert city details into the card
  cityCard.innerHTML = `
    <a href="pages/adventures/?city=${id}" id="${id}">
      <div class="tile">
        <img src="${image}" class="img-fluid" alt="${city}">
        <div class="tile-text text-center">
          <h5>${city}</h5>
          <p>${description}</p>
        </div>
      </div>
    </a>
  `;
  console.log(`Adding city to DOM: ${city} (ID: ${id})`)
  // Append city card to the container
  container.appendChild(cityCard);

}

export { init, fetchCities, addCityToDOM };
