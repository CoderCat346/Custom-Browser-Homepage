// Get references to DOM elements (parts of the HTML)
const shortcutForm = document.getElementById('shortcutForm');
const folderForm = document.getElementById('folderForm');
const shortcutsDiv = document.getElementById('shortcuts');
const toggleFormBtn = document.getElementById('toggleFormBtn');
const formContainer = document.getElementById('formContainer');
const parentFolderSelect = document.getElementById('parentFolder');
const folderParentSelect = document.getElementById('folderParent');

// Load saved shortcuts from localStorage, or start with an empty list
let shortcuts = JSON.parse(localStorage.getItem('shortcuts') || '[]');

// If the data is in old format (just a flat list of shortcuts), convert it
if (shortcuts.length && !shortcuts[0].hasOwnProperty('children')) {
  shortcuts = [{ name: 'Root', children: shortcuts }];
}

// Save shortcuts to localStorage
function saveShortcuts() {
  localStorage.setItem('shortcuts', JSON.stringify(shortcuts));
}

// Recursively find a folder by its path (e.g., ["Work", "Projects"])
function findFolder(pathArray, current = shortcuts) {
  if (!pathArray.length) return { children: current }; // Base case: return current level if path is empty
  const name = pathArray[0]; // Take the first folder name in the path
  const next = current.find(item => item.name === name && item.children); // Find folder with that name
  return next ? findFolder(pathArray.slice(1), next.children) : null;
}

// Render the entire shortcuts/folder structure on the page
function renderShortcuts(data = shortcuts, container = shortcutsDiv, path = []) {
  container.innerHTML = ''; // Clear existing display

  data.forEach((item, index) => {
    const wrapper = document.createElement('div'); // Container for each item
    wrapper.style.marginLeft = '20px'; // Indent for subfolders

    const header = document.createElement('div'); // Row for name + buttons
    header.style.display = 'flex';
    header.style.alignItems = 'center';
    header.style.gap = '10px';

    // Delete button for both folders and shortcuts
    const delBtn = document.createElement('button');
    delBtn.textContent = '❌';
    delBtn.onclick = () => {
      data.splice(index, 1); // Remove from the parent array
      saveShortcuts();
      renderShortcuts();
      updateFolderDropdowns();
    };

    // If it's a folder
    if (item.children) {
      const toggleBtn = document.createElement('button');
      toggleBtn.textContent = '▶'; // Arrow to indicate collapsed folder
      toggleBtn.style.cursor = 'pointer';

      const label = document.createElement('strong');
      label.textContent = item.name;

      const subContainer = document.createElement('div');
      subContainer.style.display = 'none'; // Initially hidden

      // Toggle collapse/expand when arrow is clicked
      toggleBtn.onclick = () => {
        const isExpanded = subContainer.style.display === 'block';
        subContainer.style.display = isExpanded ? 'none' : 'block';
        toggleBtn.textContent = isExpanded ? '▶' : '▼';
      };

      header.append(toggleBtn, label, delBtn); // Folder row
      wrapper.appendChild(header);
      wrapper.appendChild(subContainer);

      // Recursively render folder contents
      renderShortcuts(item.children, subContainer, [...path, item.name]);
    }

    // If it's a shortcut
    else {
      const a = document.createElement('a');
      a.href = item.url;
      a.textContent = item.name;
      a.target = '_blank'; // Open in new tab

      header.appendChild(a);
      header.appendChild(delBtn);
      wrapper.appendChild(header);
    }

    container.appendChild(wrapper); // Add to the main view
  });
}

// Update dropdowns for choosing folder paths in the form
function updateFolderDropdowns() {
  const paths = [];

  // Recursively collect all folder paths
  function traverse(data, path = []) {
    data.forEach(item => {
      if (item.children) {
        const newPath = [...path, item.name]; // Keep track of the path
        paths.push(newPath); // Add the folder path to list
        traverse(item.children, newPath); // Recurse into subfolders
      }
    });
  }

  traverse(shortcuts); // Start collecting from root

  // Helper to populate both dropdowns (for folders and shortcuts)
  function populate(selectElement) {
    selectElement.innerHTML = `<option value="">(Root)</option>`;
    paths.forEach(path => {
      const value = path.join('/');
      const label = path.join(' / ');
      const option = new Option(label, value);
      selectElement.appendChild(option);
    });
  }

  populate(parentFolderSelect);
  populate(folderParentSelect);
}

// Handle shortcut creation
shortcutForm.addEventListener('submit', e => {
  e.preventDefault(); // Prevent form from refreshing the page

  const name = document.getElementById('name').value;
  const url = document.getElementById('url').value;
  const path = parentFolderSelect.value ? parentFolderSelect.value.split('/') : [];

  const folder = findFolder(path);
  if (folder) {
    folder.children.push({ name, url }); // Add shortcut to the folder
    saveShortcuts();
    renderShortcuts();
    shortcutForm.reset();
  }
});

// Handle folder creation
folderForm.addEventListener('submit', e => {
  e.preventDefault();

  const name = document.getElementById('folderName').value;
  const path = folderParentSelect.value ? folderParentSelect.value.split('/') : [];

  const folder = findFolder(path);
  if (folder) {
    folder.children.push({ name, children: [] }); // Add a new empty folder
    saveShortcuts();
    renderShortcuts();
    folderForm.reset();
    updateFolderDropdowns(); // Refresh dropdowns
  }
});

// Show/hide the form section when "+" is clicked
toggleFormBtn.addEventListener('click', () => {
  const isVisible = formContainer.style.display === 'block';
  formContainer.style.display = isVisible ? 'none' : 'block';
  toggleFormBtn.textContent = isVisible ? '＋' : '−';
});

// Run on first page load
renderShortcuts();
updateFolderDropdowns();
