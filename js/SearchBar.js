// Reference the HTML elements
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const searchEngineSelect = document.getElementById('search-engine');

// Define the search engines and their corresponding search URLs
const engines = {
  ddg: 'https://duckduckgo.com/?q=',
  brave: 'https://search.brave.com/search?q=',
  startpage: 'https://www.startpage.com/sp/search?q='
};

// Event listener to load the saved search engine preference when the page loads
window.addEventListener('DOMContentLoaded', () => {
  // Retrieve the saved search engine from localStorage
  const savedEngine = localStorage.getItem('selectedEngine');
  // If there's a saved engine, set it as the selected value in the dropdown
  if (savedEngine && engines[savedEngine]) {
    searchEngineSelect.value = savedEngine;
  }
});

// Event listener to save the selected search engine when it changes
searchEngineSelect.addEventListener('change', () => {
  // Save the selected engine to localStorage for future use
  localStorage.setItem('selectedEngine', searchEngineSelect.value);
});

// Event listener for when the user submits the form
searchForm.addEventListener('submit', (e) => {
  // Prevent the default form submission behavior
  e.preventDefault();
  
  // Get the search query from the input field and trim any whitespace
  const query = searchInput.value.trim();
  
  // Get the selected search engine from the dropdown
  const selectedEngine = searchEngineSelect.value;

  // If there's a query and a valid engine selected, perform the search
  if (query && engines[selectedEngine]) {
    // Construct the search URL with the engine's base URL and the encoded query
    const searchURL = engines[selectedEngine] + encodeURIComponent(query);
    // Redirect to the search engine with the query
    window.location.href = searchURL;
  } else {
    // If no query is entered, alert the user
    alert('Please enter a search query.');
  }
});

export function initSearchBar() {
    console.log("SearchBar ready") ;
}