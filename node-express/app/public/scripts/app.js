document.addEventListener("DOMContentLoaded", () => {
    const localJsonFile = "data.json"
    fetch(localJsonFile)
    .then(response => response.json())
    .then(responseData => {
        console.log(responseData)
        for (item of responseData) {
        const navUl = document.createElement("ul")
        const navList = document.createElement("li")
        const navAnchor = document.createElement("a")
        
        navAnchor.textContent = item.nav.linkText
        navItems.appendChild(navAnchor)

        
        
        }


    })

//navbar
const navItems = document.getElementsByName('nav')



const page = document.body.dataset.page; 

// this shows its the homepage, use a different more global
// variable for the goals pages as they will have the same JS
if (page === "home") {
    console.log('Page loads correctly')

    //content for home page

}





    
}) 
