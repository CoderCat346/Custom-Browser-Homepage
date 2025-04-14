const input = document.getElementById('widgetInput');
const saveBtn = document.getElementById('saveBtn');
const container = document.getElementById('widgetContainer');
const toggleBtn = document.getElementById('toggleBtn');
const widgetCreator = document.getElementById('widgetCreator');

// Load widgets from localStorage on page load
window.onload = () => {
  const stored = JSON.parse(localStorage.getItem('aqi_widgets') || '[]');
  stored.forEach((widgetHTML, index) => renderWidget(widgetHTML, index));
};

// Toggle visibility of the widget creator interface
toggleBtn.addEventListener('click', () => {
  if (widgetCreator.style.display === 'none') {
    widgetCreator.style.display = 'block';
    toggleBtn.textContent = 'Hide Widget Creator'; // Update button text when shown
  } else {
    widgetCreator.style.display = 'none';
    toggleBtn.textContent = 'Show Widget Creator'; // Update button text when hidden
  }
});

saveBtn.addEventListener('click', () => {
  const code = input.value.trim();

  if (!code.includes('data-aqi-widget-payload') || !code.includes('<script')) {
    alert("❌ Please paste a valid AQI widget embed code.");
    return;
  }

  // Save to localStorage as an array
  const widgets = JSON.parse(localStorage.getItem('aqi_widgets') || '[]');
  widgets.push(code);
  localStorage.setItem('aqi_widgets', JSON.stringify(widgets));

  renderWidget(code, widgets.length - 1);
  input.value = ''; // Clear input after saving
});

function renderWidget(widgetHTML, index) {
  const wrapper = document.createElement('div');
  wrapper.style.marginBottom = '20px';
  wrapper.style.border = '1px solid #ddd';
  wrapper.style.borderRadius = '10px';
  wrapper.style.padding = '10px';
  wrapper.style.background = '#fff';
  wrapper.style.boxShadow = '0 1px 4px rgba(0,0,0,0.1)';
  wrapper.setAttribute('draggable', true);
  wrapper.setAttribute('data-index', index); // Store index for reordering

  // Optional: Label for the widget
  const label = document.createElement('h3');
  label.textContent = `Weather Widget ${index + 1}`;
  label.style.fontSize = '16px';
  label.style.color = '#2c3e50';
  label.style.marginBottom = '10px';
  wrapper.appendChild(label);

  // Reliable rendering using iframe
  const iframe = document.createElement('iframe');
  iframe.style.width = '100%';
  iframe.style.height = '300px';
  iframe.style.border = 'none';

  wrapper.appendChild(iframe);
  
  // Remove button for each widget
  const removeBtn = document.createElement('button');
  removeBtn.textContent = 'Remove Widget';
  removeBtn.style.backgroundColor = '#e74c3c';
  removeBtn.style.color = 'white';
  removeBtn.style.border = 'none';
  removeBtn.style.padding = '5px 10px';
  removeBtn.style.fontSize = '14px';
  removeBtn.style.borderRadius = '5px';
  removeBtn.style.marginTop = '10px';
  removeBtn.onclick = () => removeWidget(index, wrapper);
  wrapper.appendChild(removeBtn);

  container.appendChild(wrapper);

  iframe.contentWindow.document.open();
  iframe.contentWindow.document.write(widgetHTML);
  iframe.contentWindow.document.close();
}

// Remove widget from the page and localStorage
function removeWidget(index, wrapper) {
  const confirmed = confirm("Are you sure you want to remove this widget?");
  if (confirmed) {
    const widgets = JSON.parse(localStorage.getItem('aqi_widgets') || '[]');
    widgets.splice(index, 1); // Remove the widget from array
    localStorage.setItem('aqi_widgets', JSON.stringify(widgets));

    container.removeChild(wrapper); // Remove widget from DOM
  }
}

export function initWeather() {
  console.log("Weather ready");
}