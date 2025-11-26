document.addEventListener("DOMContentLoaded", () => {
  const navItems = document.getElementById("navBar");
  const navUl = document.createElement("ul");
  navItems.appendChild(navUl);

  fetch("data.json")
    .then((response) => response.json())
    .then((responseData) => {
      // global navigation
      for (item of responseData.nav) {
        const navList = document.createElement("li");
        const navAnchor = document.createElement("a");

        navAnchor.href = item.url;
        navAnchor.textContent = item.linkText;

        navList.appendChild(navAnchor);
        navUl.appendChild(navList);
      }

      const page = document.body.dataset.page;

      // content specific for pages (body page-data ="pagename")
      if (page === "home") {
      }

      if (page === "goals") {
      }

      if (page === "form") {
      }
    });
});
