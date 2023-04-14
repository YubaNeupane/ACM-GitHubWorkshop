const subdirectories = document.getElementById("subdirectories");

fetch("members/")
  .then((response) => response.text())
  .then((html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    const links = doc.querySelectorAll("a");

    links.forEach((link) => {
      const subdirectory = link.getAttribute("href");

      if (subdirectory == "/" || subdirectory == "/members") return;

      if (subdirectory !== "..") {
        const listItem = document.createElement("li");
        const anchor = document.createElement("a");

        anchor.textContent = subdirectory
          .substring(9, subdirectory.length)
          .toUpperCase()
          .replace("%20", " ");

        anchor.href = `${subdirectory}/index.html`;
        anchor.addEventListener("click", (event) => {
          event.preventDefault();
          renderPage(anchor.href);
        });

        listItem.appendChild(anchor);
        subdirectories.appendChild(listItem);
      }
    });
  });

function renderPage(url) {
  fetch(url)
    .then((response) => response.text())
    .then((html) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");

      document.body.innerHTML = "";
      document.body.appendChild(doc.body);
    });
}
