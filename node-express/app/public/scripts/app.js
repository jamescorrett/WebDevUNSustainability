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
      //mobile nav bar hamburger
      let hamburger = document.querySelector("#hamburger");

      hamburger.addEventListener("click", function () {
        document.querySelector("#navBar ul").classList.toggle("showNav");
        document.querySelector("#navBar").classList.remove("postScroll");
        document.querySelector("#navBar").classList.toggle("showNav");
      });

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
      const nav = document.getElementById("navBar");

      const nav = document.querySelector("nav");

      document.addEventListener("mousewheel", function (event) {
        if (event.wheelDelta >= 0 && nav.classList != "showNav") {
          nav.classList.remove("postScroll");
        } else if (event.wheelDelta <= 0 && nav.classList != "showNav") {
          nav.classList.add("postScroll");
        }
      });

      if (page === "form") {
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
