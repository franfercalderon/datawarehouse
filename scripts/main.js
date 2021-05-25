//LISTENERS

// const { error } = require("console");

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
    contactsBtn.src="./styles/assets/contacts.png"
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


loginBtn.addEventListener('click', async (event)=>{
    event.preventDefault();
    const email= emailInput.value;
    const pass = passInput.value;
    try{
        const to = '/users/login';
        const body = {
            "email": email,
            "password": pass
        };
        const method = 'POST';

        const access= await fetch(url, to, body, method);
        console.log(access)
    }
    catch(err){
        console.error(err)
    }
})

