// Get the form element by its ID
const form = document.getElementById('shortcutForm');

// Get the div where shortcuts will be displayed
const shortcutsDiv = document.getElementById('shortcuts');

// Load existing shortcuts from localStorage (if any)
// If there are none, use an empty array instead
const shortcuts = JSON.parse(localStorage.getItem('shortcuts') || '[]');

// Function to display the shortcuts on the page
function renderShortcuts() {
    // Clear the current list of shortcuts (start fresh)
    shortcutsDiv.innerHTML = '';

    // Loop through each shortcut in the array
    shortcuts.forEach((shortcut, index) => {
        // Create a link (<a>) element for the shortcut
        const a = document.createElement('a');
        a.href = shortcut.url;               // Set the link URL
        a.textContent = shortcut.name;       // Set the link text
        a.target = "_blank";                 // Open the link in a new tab
        a.className = "shortcut";            // Add a class for styling (optional)

        // Create a remove (❌) button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = '❌';         // Button text is a red cross
        removeBtn.style.marginLeft = '10px';  // Adds space between link and button
        removeBtn.onclick = () => {
            // Remove this shortcut from the array
            shortcuts.splice(index, 1);

            // Save the updated list and refresh the display
            saveAndRender();
        };

        // Create a container for each shortcut (link + delete button)
        const div = document.createElement('div');
        div.appendChild(a);           // Add the link to the container
        div.appendChild(removeBtn);  // Add the remove button to the container

        // Add the container to the shortcuts list on the page
        shortcutsDiv.appendChild(div);
    });
}

// Function to save the shortcuts to localStorage and re-display them
function saveAndRender() {
    // Save the current list of shortcuts to the browser's localStorage
    localStorage.setItem('shortcuts', JSON.stringify(shortcuts));

    // Display the updated list
    renderShortcuts();
}

// When the form is submitted...
form.addEventListener('submit', e => {
    e.preventDefault();  // Prevent the page from reloading

    // Get the values entered in the form inputs
    const name = document.getElementById('name').value;
    const url = document.getElementById('url').value;

    // Add the new shortcut to the list
    shortcuts.push({ name, url });

    // Clear the form inputs
    form.reset();

    // Save the updated list and re-display
    saveAndRender();
});

// Initial rendering when the page first loads
renderShortcuts();

// Get the toggle button and form container
const toggleFormBtn = document.getElementById('toggleFormBtn');
const formContainer = document.getElementById('formContainer');

// Toggle form visibility when '+' is clicked
toggleFormBtn.addEventListener('click', () => {
    if (formContainer.style.display === 'none') {
        formContainer.style.display = 'block';
        toggleFormBtn.textContent = '−'; // Change to minus when open
    } else {
        formContainer.style.display = 'none';
        toggleFormBtn.textContent = '＋'; // Back to plus when closed
    }
});
