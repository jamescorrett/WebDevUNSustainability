document.addEventListener("DOMContentLoaded", () => {
  let currentPath = window.location.pathname.split("/").pop();
  if (currentPath === "") {
    currentPath = "index.html";
  }

  fetch("data.json")
    .then((response) => response.json())
    .then((responseData) => {

      //top row
      const videoElement = document.getElementById("video");
      const video = document.createElement("img");
      video.src = "/assets/placeholder.png";
      /*video.controls = false;
      video.autoplay = true;
      video.muted = true;
      video.loop = true;
      video.playsInline = true;*/
      videoElement.appendChild(video);

      const title = document.createElement("article");
      videoElement.appendChild(title);
      title.textContent = responseData.energy.video[0].title;

      //Appends data from json into main section textBox elements
      const mainSection = document.getElementById("main");
      var children = mainSection.children;
      var x = 0;
      var y = 0;
      for (var i = 0; i < children.length; i++) {
        var tableChild = children[i];
        if (tableChild.classList.contains("textBox")) 
        {
          const para = document.createElement("p");
          tableChild.appendChild(para);
          para.textContent = responseData.energy.main[0].para[x];
          x++;
        }
        else if (tableChild.classList.contains("imgBox")) 
        {
          const img = document.createElement("img");
          tableChild.appendChild(img);
          img.src = responseData.energy.main[0].image[y];
          y++;
        }
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
})