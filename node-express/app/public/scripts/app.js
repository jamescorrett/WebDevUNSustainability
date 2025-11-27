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

      const page = document.body.dataset.page; // content specific for pages (body page-data ="pagename")

      if (page === "home") {
        //top row
        const videoElement = document.getElementById("video");
        const video = document.createElement("video");
        video.src = '/assets/fish.mp4';
        video.controls = false;
        video.autoplay = true;
        video.muted = true;
        video.loop = true;
        video.playsInline = true;
        videoElement.appendChild(video);

        const title = document.createElement("article");
        videoElement.appendChild(title);
        title.textContent = responseData.home.video[0].title;

        const quote = document.createElement("p");
        quote.className = "video-quote";
        quote.textContent = '"the greatest threat to our planet is the belief that someone else will save it for us" - Robert Swan';
        videoElement.appendChild(quote);
        
        //2nd row

        const goalsSection = document.getElementById("goals");

        for (item of responseData.home.goals) {
          const goalsWrapper = document.createElement("div");
          goalsWrapper.classList.add("goalsWrapper");

          const imageAnchor = document.createElement("a");
          const goalsImage = document.createElement("img");
          const goalsText = document.createElement("h1");
          const hoverOverlay = document.createElement("div");
          hoverOverlay.classList.add("hoverOverlay");

          goalsImage.src = item.image;
          imageAnchor.href = item.url;
          goalsText.textContent = item.title;
          imageAnchor.append(hoverOverlay, goalsText, goalsImage);
          goalsWrapper.append(imageAnchor);

          goalsSection.append(goalsWrapper);
        }

        //row 3 and 4
        const rowsSection = document.getElementById("rows");

        for (item of responseData.home.rowPages) {
          const rowsWrapper = document.createElement("div");
          rowsWrapper.classList.add("rowsWrapper");

          const imageAnchor = document.createElement("a");
          const rowsImage = document.createElement("img");
          const rowsText = document.createElement("h1");
          const hoverOverlay = document.createElement("div");
          hoverOverlay.classList.add("hoverOverlay");

          rowsImage.src = item.image;
          imageAnchor.href = item.url;
          rowsText.textContent = item.title;
          imageAnchor.append(hoverOverlay, rowsText, rowsImage);
          rowsWrapper.append(imageAnchor);

          rowsSection.append(rowsWrapper);
        }
      }

      if (page === "goals") {
      }
      if (page === "team") {
      }
      if (page === "form") {
      }
    });
});
