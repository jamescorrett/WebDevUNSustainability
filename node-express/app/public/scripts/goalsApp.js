document.addEventListener("DOMContentLoaded", () => {
  let currentPath = window.location.pathname.split("/").pop();
  if (currentPath === "") {
    currentPath = "index.html";
  }

  fetch("data.json")
    .then((response) => response.json())
    .then((responseData) => {
      var page = document.body.dataset.page;

      //top row
      const videoElement = document.getElementById("video");
      const video = document.createElement("video");
      if (page === "energy") {
        video.src = responseData.energy.video[0].videoSRC;
      } else if (page === "water") {
        video.src = responseData.water.video[0].videoSRC;
      } else if (page === "land") {
        video.src = responseData.land.video[0].videoSRC;
      }
      video.controls = false;
      video.autoplay = true;
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      videoElement.appendChild(video);

      const title = document.createElement("article");
      videoElement.appendChild(title);
      if (page === "energy") {
        title.textContent = responseData.energy.video[0].title;
      } else if (page === "water") {
        title.textContent = responseData.water.video[0].title;
      } else if (page === "land") {
        title.textContent = responseData.land.video[0].title;
      }

      //Appends data from json into main section textBox elements
      const mainSection = document.getElementById("main");
      var children = mainSection.children;
      var x = 0;
      var y = 0;
      for (var i = 0; i < children.length; i++) {
        var tableChild = children[i];
        if (tableChild.classList.contains("textBox")) {
          const para = document.createElement("p");
          tableChild.appendChild(para);
          if (page === "energy") {
            para.textContent = responseData.energy.main[0].para[x];
          } else if (page === "water") {
            para.textContent = responseData.water.main[0].para[x];
          } else if (page === "land") {
            para.textContent = responseData.land.main[0].para[x];
          }
          x++;
        } else if (tableChild.classList.contains("imgBox")) {
          const img = document.createElement("img");
          tableChild.appendChild(img);
          if (page === "energy") {
            img.src = responseData.energy.main[0].image[y];
            img.alt = responseData.energy.main[0].alt[y];
          } else if (page === "water") {
            img.src = responseData.water.main[0].image[y];
            img.alt = responseData.water.main[0].alt[y];
          } else if (page === "land") {
            img.src = responseData.land.main[0].image[y];
            img.alt = responseData.land.main[0].alt[y];
          }
          y++;
        }
        tableChild.classList.add("hidden");
      }

      const foot = document.getElementById("footer");
      const footElement = document.createElement("a");
      foot.appendChild(footElement);
      if (page === "energy") {
        footElement.textContent = responseData.energy.goalFooter[0].display;
        footElement.href = responseData.energy.goalFooter[0].link;
      } else if (page === "water") {
        footElement.textContent = responseData.water.goalFooter[0].display;
        footElement.href = responseData.water.goalFooter[0].link;
      } else if (page === "land") {
        footElement.textContent = responseData.land.goalFooter[0].display;
        footElement.href = responseData.land.goalFooter[0].link;
      }

      //intersectobserve test
      // Intersection Observer setup
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("show"); // add fade-in class
            }
          });
        },
        {
          threshold: 0.2, // triggers when 20% of element is visible
        }
      );

      // select all elements with the hidden class
      const hiddenElements = document.querySelectorAll(".hidden");
      hiddenElements.forEach((el) => observer.observe(el));
    });
});
