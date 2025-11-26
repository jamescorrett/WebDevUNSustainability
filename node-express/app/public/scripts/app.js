document.addEventListener("DOMContentLoaded", () => {
  let currentPath = window.location.pathname.split("/").pop();
  if (currentPath === "") {
    currentPath = "index.html";
  }
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

        if (item.url === currentPath) {
          navAnchor.classList.add("active");
        }

        navList.appendChild(navAnchor);
        navUl.appendChild(navList);
      }

      const page = document.body.dataset.page;

      // content specific for pages (body page-data ="pagename")
      if (page === "home") {
        //top row
        const videoElement = document.getElementById("video");
        const title = document.createElement("article");
        videoElement.appendChild(title);
        title.textContent = responseData.home.video[0].title;

        //2nd row
        const goalsSection = document.getElementById("goals");

        for (item of responseData.home.goals) {
          const goalsWrapper = document.createElement("div");
          goalsWrapper.classList.add("goalsWrapper");

          const imageAnchor = document.createElement("a");
          const goalsImage = document.createElement("img");
          const goalsText = document.createElement("h3");

          goalsImage.src = item.image;
          imageAnchor.href = item.url;
          goalsText.textContent = item.title;
          imageAnchor.append(goalsText, goalsImage);

          goalsWrapper.append(imageAnchor);

          goalsSection.append(goalsWrapper);
        }
      }

      if (page === "goals") {
      }

      if (page === "form") {
      }
    });
});
