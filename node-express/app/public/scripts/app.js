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
      for (const item of responseData.nav) {
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

      if (page === "water") {
        const videoElement = document.getElementById("video");
        const video = document.createElement("video");
        video.src = "/assets/swimming.mp4";
        video.controls = false;
        video.autoplay = true;
        video.muted = true;
        video.loop = true;
        video.playsInline = true;
        videoElement.appendChild(video);

        const title = document.createElement("article");
        videoElement.appendChild(title);
        title.textContent = responseData.water.video[0].title;

        const mainSection = document.getElementById("main");
        var children = mainSection.children;
        var x = 0;
        var y = 0;
        for (var i = 0; i < children.length; i++) {
          var tableChild = children[i];
          if (tableChild.classList.contains("textBox")) {
            const para = document.createElement("p");
            tableChild.appendChild(para);
            para.textContent = responseData.water.main[0].para[x];
            x++;
          } else if (tableChild.classList.contains("imgBox")) {
            const img = document.createElement("img");
            tableChild.appendChild(img);
            img.src = responseData.water.main[0].image[y];
            y++;
          }
        }
      }

      if (page === "team") {
      }

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("show");
            }
          });
        },
        {
          threshold: 0.2,
        }
      );

      const hiddenElements = document.querySelectorAll(".hidden");
      hiddenElements.forEach((el) => observer.observe(el));
    });
});
