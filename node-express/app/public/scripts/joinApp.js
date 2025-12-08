document.addEventListener("DOMContentLoaded", () => {
  let currentPath = window.location.pathname.split("/").pop();
  if (currentPath === "") {
    currentPath = "index.html";
  }

  fetch("data.json")
    .then((response) => response.json())
    .then((responseData) => {
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

      const myForm = document.getElementById("myForm");
      const Name = document.getElementById("Name");
      const lastname = document.getElementById("lastname");
      const email = document.getElementById("email");
      const Comments = document.getElementById("Comments");
      const paraConfirmation = document.getElementById("Confirmation");

      myForm.addEventListener("submit", (e) => {
        e.preventDefault();

        ConfirmMessageElement.textContent = `Hi ${Name.value}, your message has been received, we will contact you at ${email.value}`;

        const formData = {
          name: Name.value,
          lastname: lastname.value,
          email: email.value,
          message: Comments.value,
        };

        fetch("/form", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        })
          .then((res) => res.json())
          .then((responsedata) => {
            console.log(responsedata);
            paraConfirmation.textContent = `Hi ${responsedata.name}, your message has been received, we will contact you at ${responsedata.email}`;
          })
          .catch((err) => {
            console.error(err);
          });
      });
    });
});
