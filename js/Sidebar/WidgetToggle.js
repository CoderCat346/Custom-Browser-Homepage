const widgets = [
    { id: "clock-widget-wrapper", label: "Clock" },
    { id: "Quran-widget-wrapper", label: "Qur'an Ayah" },
    { id: "weather-widget-wrapper", label: "Weather" },
    { id: "news-widget-wrapper", label: "News" },
    { id: "proton-apps-wrapper", label: "Proton Suite" },
    { id: "notes-area-wrapper", label: "Notes" }
  ];
  
  const container = document.getElementById("widget-toggle-container");
  
  // Load the stored settings (if any) from localStorage
  const storedSettings = JSON.parse(localStorage.getItem('widgetSettings')) || {};
  
  // Set default visibility of widgets (only Clock visible)
  const defaultSettings = {
    "clock-widget-wrapper": true,
    "Quran-widget-wrapper": false,
    "weather-widget-wrapper": false,
    "news-widget-wrapper": false,
    "proton-apps-wrapper": false,
    "notes-area-wrapper": false
  };
  
  // Merge default settings with stored settings (stored overrides default)
  const finalSettings = { ...defaultSettings, ...storedSettings };
  
  widgets.forEach(({ id, label }) => {
    const wrapper = document.createElement("label");
    const checkbox = document.createElement("input");
  
    checkbox.type = "checkbox";
    checkbox.dataset.widget = id;
    // Set checkbox state based on merged settings
    checkbox.checked = finalSettings[id];
  
    wrapper.appendChild(checkbox);
    wrapper.append(` ${label}`);
    container.appendChild(wrapper);
    container.appendChild(document.createElement("br"));
  
    // Handle visibility toggle
    checkbox.addEventListener("change", function () {
      const section = document.getElementById(id); // Target the <section> tag by ID
      if (section) {
        section.style.display = this.checked ? "block" : "none"; // Toggle visibility
      }
  
      // Save the checkbox state to localStorage
      finalSettings[id] = this.checked;
      localStorage.setItem('widgetSettings', JSON.stringify(finalSettings));
    });
  
    // Set the initial visibility of the widgets based on saved settings
    const section = document.getElementById(id); // Target the <section> tag
    if (section) {
      section.style.display = checkbox.checked ? "block" : "none"; // Set initial visibility
    }
  });

  export function initWidget_toggle() {
    console.log("Widget Toggle ready");
}