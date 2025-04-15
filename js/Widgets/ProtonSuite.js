document.addEventListener("DOMContentLoaded", () => {
  const apps = ["Mail", "Drive", "Calendar", "Pass", "Wallet", "VPN"];
  const container = document.getElementById("proton-apps");

  apps.forEach(app => {
    const host = `${app.toLowerCase()}.proton.me`;
    const link = document.createElement("a");
    link.href = `https://${host}`;
    link.dataset.host = host;
    link.target = "_blank";

    const img = document.createElement("img");
    img.src = `https://icons.duckduckgo.com/ip3/${host}.ico`;
    img.alt = `${host} icon`;

    const span = document.createElement("span");
    span.textContent = app;

    link.append(img, span);
    container.appendChild(link);
  });
});

export function initProtonSuite() {
  console.log("Proton Suite ready");
}
