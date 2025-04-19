const colorOptions = [
  { name: 'White', value: '#ffffff' } ,
  { name: 'Teal', value: '#b2dfdb' } ,
  { name: 'Pale Green', value: '#e4f5d4' } ,
  { name: 'Beige', value: '#f5f5dc' } ,
  { name: 'Wheat', value: '#f5deb3' } ,
  { name: 'Cream Orange', value: '#fdd9b5' } ,
  { name: 'Grey', value: '#808080' } ,
  { name: 'Night', value: '#1e1e2f' } ,
  { name: 'Black', value: '#000000' } ,
];
const imageOptions = [
  { label: 'Space', url: '/assets/images/Space.webp' } ,
  { label: 'Mountains', url: '/assets/images/Mountains.webp' } ,
  { label: 'Gradient', url: '/assets/images/Gradient.webp' } ,
  { label: 'Forest', url: '/assets/images/Forest.webp' } ,
  { label: 'City', url: '/assets/images/City.webp' } ,
  { label: 'Architecture', url: '/assets/images/Architecture.webp' } ,
  { label: 'Waves', url: '/assets/images/Waves.webp' } ,
];
  
// Function to render the options dynamically
function renderOptions(type) {
  const container = document.getElementById('optionsContainer');
  container.innerHTML = '';

  const savedValue = localStorage.getItem('bgValue');

  if (type === 'color') {
    colorOptions.forEach(color => {
      const label = document.createElement('label');
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'bgColor';
      radio.value = color.value;
      if (color.value === savedValue) radio.checked = true;

      radio.addEventListener('change', () => setBgColor(color.value));
      label.appendChild(radio);
      label.append(` ${color.name}`);
      container.appendChild(label);
      container.appendChild(document.createElement('br'));
    });
  } else if (type === 'image') {
    imageOptions.forEach(img => {
      const label = document.createElement('label');
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'bgImage';
      radio.value = img.url;
      if (img.url === savedValue) radio.checked = true;

      radio.addEventListener('change', () => setBgImage(img.url));
      label.appendChild(radio);
      label.append(` ${img.label}`);
      container.appendChild(label);
      container.appendChild(document.createElement('br'));
    });
  }
}

// Set background color based on selected option
function setBgColor(color) {
  document.body.style.backgroundImage = '';
  document.body.style.backgroundColor = color;

  localStorage.setItem('bgType', 'color');
  localStorage.setItem('bgValue', color);
}

// Set background image based on selected option
function setBgImage(imageUrl) {
  document.body.style.backgroundColor = '';
  document.body.style.backgroundImage = `url(${imageUrl})`;
  document.body.style.backgroundRepeat = 'no-repeat';
  document.body.style.backgroundSize = 'cover';
  document.body.style.backgroundPosition = 'center';

  localStorage.setItem('bgType', 'image');
  localStorage.setItem('bgValue', imageUrl);
}

// Attach listeners once the DOM is ready
window.addEventListener('DOMContentLoaded', () => {
  const radios = document.querySelectorAll('input[name="bgType"]');
  radios.forEach(radio => {
    radio.addEventListener('change', (e) => {
      renderOptions(e.target.value);
    });
  });

  // Render default selection (based on what's checked)
  const checked = document.querySelector('input[name="bgType"]:checked');
  if (checked) renderOptions(checked.value);
});

// Restore user's choice on page load
window.addEventListener('DOMContentLoaded', () => {
  const bgType = localStorage.getItem('bgType');
  const bgValue = localStorage.getItem('bgValue');

  if (bgType === 'color') {
    setBgColor(bgValue);
    document.querySelector('input[value="color"]').checked = true;
  } else if (bgType === 'image') {
    setBgImage(bgValue);
    document.querySelector('input[value="image"]').checked = true;
  } else {
    setBgColor('#ffffff'); // Default color
  }

  // Initialize radio buttons to reflect current background type
  renderOptions(bgType || 'color');
});

  export function initBackground() {
    console.log("Background ready");
}