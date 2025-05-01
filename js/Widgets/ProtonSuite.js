// Waits until the entire HTML document has been fully loaded and parsed.
// This ensures DOM elements are accessible before trying to manipulate them.
document.addEventListener("DOMContentLoaded", () => {

  // Define an array of Proton services you want to display as quick-access apps.
  const apps = ["Mail", "Drive", "Calendar", "Pass", "Wallet", "VPN"];

  // Get a reference to the container element where app links will be inserted.
  const container = document.getElementById("proton-apps");

  // Loop through each app name in the apps array
  apps.forEach(app => {

    // Convert the app name to lowercase and form its corresponding host/domain.
    // For example, "Mail" becomes "mail.proton.me"
    const host = `${app.toLowerCase()}.proton.me`;

    // Create a new anchor (<a>) element to serve as a clickable link.
    const link = document.createElement("a");
    link.href = `https://${host}`;       // Set the link to point to the app's website.
    link.dataset.host = host;            // Store the host in a custom data attribute.
    link.target = "_blank";              // Open the link in a new browser tab.

    // Create an <img> element to display the app’s favicon.
    const img = document.createElement("img");
    img.src = `https://icons.duckduckgo.com/ip3/${host}.ico`;  // Dynamically get favicon using DuckDuckGo's favicon service.
    img.alt = `${host} icon`;           // Add alt text for accessibility and better SEO.

    // Create a <span> element to show the app name as visible text.
    const span = document.createElement("span");
    span.textContent = app;             // Set the text content to the current app name.

    // Append the <img> and <span> elements as children of the <a> link element.
    link.append(img, span);

    // Finally, append the complete <a> link (with image and label) to the main container.
    container.appendChild(link);
  });
});

// Exported function to initialize or hook up additional Proton Suite functionality.
// Currently just logs to console for debugging/development purposes.
export function initProtonSuite() {
  console.log("Proton Suite ready"); // Used to confirm the Proton suite JS module is loaded.
}
