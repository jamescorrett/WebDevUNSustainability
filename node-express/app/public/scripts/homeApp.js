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
        const faqsButton = document.createElement("button");
        const faqsExpand = document.createElement("p");

        faqsTitle.textContent = bottomObj.title;
        faqsDesc.textContent = bottomObj.text;
        faqsExpand.textContent = bottomObj.buttonText;
        faqsButton.type = bottomObj.buttonType;

        faqsButton.appendChild(faqsExpand);

        faqs.append(faqsTitle, faqsDesc, faqsButton);
        bottomSection.appendChild(faqs);

        const questions = document.createElement("div");
        questions.classList.add("faqsHidden");
        questions.classList.add("faqsTransition");

        for (item of responseData.home.bottom.faqs) {
          const questText = document.createElement("p");
          questText.classList.add("question");
          const ansText = document.createElement("p");
          ansText.classList.add("answer");
          questText.textContent = item.question;
          ansText.textContent = item.answer;

          questions.append(questText, ansText);
        }
        bottomSection.append(questions);

        faqsButton.addEventListener("click", () => {
          if (questions.classList.contains("faqsShow")) {
            // collapse
            questions.style.maxHeight = "0px";
            questions.classList.remove("faqsShow");
            questions.classList.add("faqsHidden");
          } else {
            // expand
            questions.style.maxHeight = questions.scrollHeight + "px";
            questions.classList.remove("faqsHidden");
            questions.classList.add("faqsShow");
          }
        });

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