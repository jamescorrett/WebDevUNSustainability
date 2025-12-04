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
      }
      // water page 
      if (page === "water") {
        //top row
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
          para.textContent = responseData.water.main[0].para[x];
          x++;
        }
        else if (tableChild.classList.contains("imgBox")) 
        {
          const img = document.createElement("img");
          tableChild.appendChild(img);
          img.src = responseData.water.main[0].image[y];
          y++;
        }
      }}

      if (page === "team") {}

      if (page === "form") {

        const titleElement = document.getElementById("title");
        titleElement.textContent = responseData.form[0].title;

        const nameElement = document.getElementById("nameLabel");
        nameElement.textContent = responseData.form[0].name;
        
        const lastnameElement = document.getElementById("lastname");
        lastnameElement.textContent = responseData.form[0].lastname;

        const emailElement = document.getElementById("emailLabel");
        emailElement.textContent = responseData.form[0].email;
       

        const CommentsElement = document.getElementById("Comments");
        CommentsElement.textContent = responseData.form[0].Comments;

        const ConfirmMessageElement = document.getElementById("ConfirmMessage");
        ConfirmMessageElement.textContent = responseData.form[0].ConfirmMessage;
      }
        
          myForm.addEventListener('submit', (e) => {
          //e.preventDefault();
          ConfirmMessage.textContent = `Hi ${Name.value}, your message has been
          received, we will contact you at ${email.value}`;
          e.preventDefault();
          const FormData = {
          name: Name.value,
          lastname: lastname.value,
          email: email.value,
          message: Comments.value,
          };

        const paraConfirmation = document.getElementById('Confirmation')
   
        fetch("/form", {
          method: 'POST',
          headers: {"Content-Type" : "application/json" },
          body: JSON.stringify(FormData),
          
        })
      .then(res => res.json() )
      .then((responsedata) => {
        console.log(responsedata);
        paraConfirmation.textContent=`Hi ${responsedata.name}, your message
        has been received, we will contact you at ${responsedata.email}`;
      })
    .catch(err => {
        console.error(err);
    })
   })


     

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

