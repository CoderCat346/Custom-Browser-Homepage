document.addEventListener('DOMContentLoaded', function () {
    // Define the themes with their labels
    const themes = [
        { file: 'material-light.css', label: 'Material Light' },
        { file: 'material-dark.css', label: 'Material Dark' } ,
        { file: 'whimsical.css', label: 'Whimsical' } ,
    ];

    const themeLink = document.getElementById('theme-link');
    const themeOptionsContainer = document.getElementById('theme-options');

    // Load the stored theme or default to 'material-light.css'
    const storedTheme = localStorage.getItem('theme') || 'material-light.css';
    themeLink.href = `css/themes/${storedTheme}`;

    // Dynamically generate radio buttons with labels
    themes.forEach(theme => {
        const label = document.createElement('label');
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'theme';
        radio.value = theme.file;
        radio.checked = theme.file === storedTheme;  // Check if this theme was previously selected

        radio.addEventListener('change', function() {
            themeLink.href = `css/themes/${this.value}`;
            localStorage.setItem('theme', this.value); // Save selected theme in localStorage
        });

        label.appendChild(radio);
        label.appendChild(document.createTextNode(theme.label));  // Use the label defined in the array
        themeOptionsContainer.appendChild(label);
        themeOptionsContainer.appendChild(document.createElement('br'));
    });
});

  export function initThemes() {
    console.log("Themes ready");
}