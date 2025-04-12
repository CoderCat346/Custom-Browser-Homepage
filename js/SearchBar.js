// Reference the HTML elements
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const searchEngineSelect = document.getElementById('search-engine');

// Reference the radio buttons for tab mode
const tabModeInputs = document.getElementsByName('tab-mode');

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

  // Retrieve the saved tab mode from localStorage
  const savedTabMode = localStorage.getItem('tabMode');
  // If there's a saved tab mode, set the corresponding radio button as checked
  if (savedTabMode) {
    tabModeInputs.forEach(input => {
      input.checked = input.value === savedTabMode;
    });
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

  // Determine the selected tab mode (same tab or new tab)
  let tabMode = 'same'; // default mode
  tabModeInputs.forEach(input => {
    if (input.checked) tabMode = input.value;
  });

  // Save the selected tab mode to localStorage for future use
  localStorage.setItem('tabMode', tabMode);

  // If there's a query and a valid engine selected, perform the search
  if (query && engines[selectedEngine]) {
    // Construct the search URL with the engine's base URL and the encoded query
    const searchURL = engines[selectedEngine] + encodeURIComponent(query);

    // Open the search URL in a new tab or the current tab based on user preference
    if (tabMode === 'new') {
      window.open(searchURL, '_blank');
    } else {
      window.location.href = searchURL;
    }
  } else {
    // If no query is entered, alert the user
    alert('Please enter a search query.');
  }
});

// Function to initialize the search bar (can be used externally if needed)
export function initSearchBar() {
  console.log("SearchBar ready") ;
}
