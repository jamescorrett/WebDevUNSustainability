document.addEventListener("DOMContentLoaded", () => {
  let currentPath = window.location.pathname.split("/").pop();
  if (currentPath === "") {
    currentPath = "index.html";
  }

  fetch("data.json")
    .then((response) => response.json())
    .then((responseData) => {

      if (currentPath === "team.html") {
        const teamSection = document.getElementById("team");
        if (teamSection) {
          const members = responseData.teamMembers || [];
          let currentAudio = null;

          members.forEach((member) => {
            const card = document.createElement("article");
            card.className = "team-member hidden";

            
            const imageWrapper = document.createElement("div");
            imageWrapper.className = "team-image-wrapper";

            const img = document.createElement("img");
            img.className = "team-photo";
            img.src = member.image;
            img.alt = member.name || "Team member";

            const name = document.createElement("h3");
            name.className = "team-name";
            name.textContent = member.name;

            const overlay = document.createElement("div");
            overlay.className = "team-overlay";

            const overlayText = document.createElement("p");
            overlayText.className = "team-overlay-text";
            overlayText.textContent = member.description;
            overlay.appendChild(overlayText);

            const audio = new Audio(member.song);

            imageWrapper.addEventListener("mouseenter", () => {
              imageWrapper.classList.add("hovered");

              if (currentAudio && currentAudio !== audio) {
                currentAudio.pause();
                currentAudio.currentTime = 0;
              }

              currentAudio = audio;
              audio.currentTime = 0;
              audio.play().catch(() => {
              });
            });

            imageWrapper.addEventListener("mouseleave", () => {
              imageWrapper.classList.remove("hovered");

              audio.pause();
              audio.currentTime = 0;
              if (currentAudio === audio) {
                currentAudio = null;
              }
            });

            imageWrapper.appendChild(img);
            imageWrapper.appendChild(overlay);

            card.appendChild(imageWrapper);
            card.appendChild(name);

            teamSection.appendChild(card);
          });
        }
      }

      // Fade-in on scroll for elements with .hidden
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("show");
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.2,
        }
      );

      const hiddenElements = document.querySelectorAll(".hidden");
      hiddenElements.forEach((el) => observer.observe(el));
    })
    .catch((err) => {
      console.error("Error loading data.json:", err);
    });
});
