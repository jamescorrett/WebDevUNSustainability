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
      let hamburger = document.querySelector('#hamburger');

      hamburger.addEventListener('click', function() {
        document.querySelector('#navBar ul').classList.toggle("showNav");
        document.querySelector('#navBar').classList.remove("postScroll");
        document.querySelector('#navBar').classList.toggle("showNav");
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

      const nav = document.getElementById("navBar")

      document.addEventListener("mousewheel", function(event)
      {
        if(event.wheelDelta >= 0 && nav.classList!="showNav"){
          nav.classList.remove('postScroll');
        }
        else if (event.wheelDelta <= 0 && nav.classList!="showNav"){
          nav.classList.add('postScroll');
        }
      })
      const page = document.body.dataset.page; // content specific for pages (body page-data ="pagename")

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
