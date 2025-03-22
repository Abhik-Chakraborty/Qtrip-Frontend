
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
    let params = new URLSearchParams(search);
  
    let city = params.get("city");

    return city;

}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try {
    let response = await fetch(`${config.backendEndpoint}/adventures?city=${city}`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    let data = await response.json();

    console.log("Fetched Adventures Data:", data);

    return data;
  } catch (error) {
    console.error("Error fetching adventures:", error);
    return null;
  }

}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  let container = document.getElementById("data");
  adventures.forEach((adventure) => {
    let adventureCard = document.createElement("div");
    adventureCard.className = "col-6 col-lg-3 mb-4"; 

    adventureCard.innerHTML = `
      <a href="detail/?adventure=${adventure.id}" id="${adventure.id}">
        <div class="activity-card">
          <img src="${adventure.image}" class="img-fluid" alt="${adventure.name}">
          <div class="category-banner">${adventure.category}</div>
          <div class="activity-card-body text-center">
            <h5>${adventure.name}</h5>
            <p>₹${adventure.costPerHead} per person</p>
            <p>Duration: ${adventure.duration} Hours</p>
          </div>
        </div>
      </a>
    `;

    container.appendChild(adventureCard);
  });

}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  return list.filter(adventure => adventure.duration >= low && adventure.duration <= high);

}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  return list.filter(adventure => categoryList.includes(adventure.category));
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  let filteredList = list;
  if (filters.category?.length > 0) filteredList = filterByCategory(filteredList, filters.category);
  if (filters.duration) {
    let [low, high] = filters.duration.split("-").map(Number);
    filteredList = filterByDuration(filteredList, low, high);
  }
  return filteredList;
  // // Place holder for functionality to work in the Stubs
  // return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  window.localStorage.setItem("filters", JSON.stringify(filters));
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  return JSON.parse(window.localStorage.getItem('filters'));
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  let categoryListContainer = document.getElementById("category-list");
  categoryListContainer.innerHTML = "";
  if (filters.category) {
    filters.category.forEach(category => {
      let pill = document.createElement("div");
      pill.className = "category-filter";
      pill.innerHTML = `${category} <span class="remove-pill" onclick="removeFilter('${category}')">x</span>`;
      categoryListContainer.appendChild(pill);
    });
  }
  if (filters.duration) {
    document.getElementById("duration-select").value = filters.duration;
  }

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
