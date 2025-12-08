document.addEventListener("DOMContentLoaded", () => {
  let currentPath = window.location.pathname.split("/").pop();
  if (currentPath === "") {
    currentPath = "index.html";
  }

  fetch("data.json")
    .then((response) => response.json())
    .then((responseData) => {

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