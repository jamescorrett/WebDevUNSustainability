document.addEventListener("DOMContentLoaded", () => {
  const landVideo = document.getElementById("video");

  // Hero video + title
  const landVideoElement = document.createElement("video");
  landVideoElement.src = "/assets/treesvideo.mp4";
  landVideoElement.autoplay = true;
  landVideoElement.muted = true;
  landVideoElement.loop = true;
  landVideoElement.playsInline = true;
  landVideoElement.controls = false;
  const landTitle = document.createElement("article");
  landTitle.classList.add("hidden");
  landTitle.textContent = "Land";
  landVideo.append(landVideoElement, landTitle);

  // Middle image box
  const landBox = document.getElementById("imgBox");
  const landImage = document.createElement("img");
  landImage.src = "/assets/trees.jpg";
  landImage.alt = "Forest conservation";
  landBox.appendChild(landImage);

  // Text boxes
  const paragraphs = [
    "Healthy land protects biodiversity and supports the communities that depend on it.",
    "Reforestation and regenerative agriculture fight erosion, improve food security, and restore ecosystems."
  ];
  const textBoxes = document.querySelectorAll("#main .textBox");
textBoxes.forEach((box, paragraphIndex) => {
    const p = document.createElement("p");
    p.textContent = paragraphs[paragraphIndex] || "";
    box.appendChild(p);
});
});
