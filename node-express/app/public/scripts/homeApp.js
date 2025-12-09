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
      const video = document.createElement("video");
      video.src = "/assets/fish.mp4";
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
      quote.textContent =
        '"the greatest threat to our planet is the belief that someone else will save it for us" - Robert Swan';
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
        goalsText.classList.add("hidden");

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
        rowsText.classList.add("hidden");

        rowsImage.src = item.image;
        imageAnchor.href = item.url;
        rowsText.textContent = item.title;
        imageAnchor.append(hoverOverlay, rowsText, rowsImage);
        rowsWrapper.append(imageAnchor);

        rowsSection.append(rowsWrapper);
      }

      //FAQ
      const bottomObj = responseData.home.bottom.contents;
      const bottomSection = document.getElementById("bottom");

      const faqs = document.createElement("div");
      faqs.classList.add("faqs");

      const faqsTitle = document.createElement("h3");
      const faqsDesc = document.createElement("p");

      faqsTitle.textContent = bottomObj.title;
      faqsDesc.textContent = bottomObj.text;

      faqs.append(faqsTitle, faqsDesc);
      bottomSection.appendChild(faqs);

      const questions = document.createElement("div");
      questions.classList.add("questionSection");

      for (item of responseData.home.bottom.faqs) {
        const faqItem = document.createElement("div");
        faqItem.classList.add("faqItem");

        const questText = document.createElement("button");
        questText.classList.add("faqQuestion");
        questText.textContent = item.question;

        const ansText = document.createElement("div");
        ansText.classList.add("faqAnswer");
        ansText.textContent = item.answer;

        questText.addEventListener("click", () => {
          const isOpen = faqItem.classList.contains("open");
          document
            .querySelectorAll(".faqItem")
            .forEach((i) => i.classList.remove("open"));
          if (!isOpen) faqItem.classList.add("open");
        });

        faqItem.append(questText, ansText);
        questions.append(faqItem);
      }

      bottomSection.append(questions);

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
