//LISTENERS

contactsBtn.addEventListener("mouseover", ()=>{
    removeHidden(contactsLabel)
    contactsBtn.src="./styles/assets/contacts_hover.png"
});

companyBtn.addEventListener("mouseover", ()=>{
    removeHidden(companyLabel)
    companyBtn.src="./styles/assets/company_hover.png"
});

usersBtn.addEventListener("mouseover", ()=>{
    removeHidden(usersLabel)
    usersBtn.src="./styles/assets/users_hover.png"
});

regionBtn.addEventListener("mouseover", ()=>{
    removeHidden(regionLabel)
    regionBtn.src="./styles/assets/region_hover.png"
});

contactsBtn.addEventListener("mouseleave", ()=>{
    addHidden(contactsLabel)
    if(contactsOpen==false){
        contactsBtn.src="./styles/assets/contacts.png"
    }
});

companyBtn.addEventListener("mouseleave", ()=>{
    addHidden(companyLabel)
    companyBtn.src="./styles/assets/company.png"
});

usersBtn.addEventListener("mouseleave", ()=>{
    addHidden(usersLabel)
    usersBtn.src="./styles/assets/users.png"
});

regionBtn.addEventListener("mouseleave", ()=>{
    addHidden(regionLabel)
    regionBtn.src="./styles/assets/region.png"
});


loginBtn.addEventListener('click', (event)=>{
    event.preventDefault();
    loginLoad()
});

loggedusercontainer.addEventListener("mouseover", ()=>{
    loggeduseroptions.classList.remove("hidden")
})

let opened= false;

loggedusercontainer.addEventListener("mouseleave", ()=>{
    setTimeout(()=>{
        if(opened== false){
            loggeduseroptions.classList.add("hidden")
        }
    }, 300)
})

loggeduseroptions.addEventListener("mouseover", ()=>{
    opened= true;
    loggeduseroptions.classList.remove("hidden")
})

loggeduseroptions.addEventListener("mouseleave", ()=>{
    opened= false;
    loggeduseroptions.classList.add("hidden")
})

searchOptions.addEventListener("click", ()=>{
    searchDetail.classList.toggle("hidden")
})

searchDetail.addEventListener("mouseleave", ()=>{
    searchDetail.classList.add("hidden")
})

searchBtn.addEventListener("mouseover", ()=>{
    document.querySelector(".search img").src="./styles/assets/magnifier_hover.png"
})

searchBtn.addEventListener("mouseleave", ()=>{
    document.querySelector(".search img").src="./styles/assets/magnifier.png"
})




// function closeDetail(){
//     console.log('caca')
//     loggeduseroptions.classList.add("hidden")
// }


