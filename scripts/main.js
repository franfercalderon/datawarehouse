//LISTENERS

contactsBtn.addEventListener("mouseover", ()=>{
    removeHidden(contactsLabel)
    contactsBtn.src="./styles/assets/contacts_hover.png"
});

contactsBtn.addEventListener("click", ()=>{
    openContacts()
});

companyBtn.addEventListener("mouseover", ()=>{
    removeHidden(companyLabel)
    companyBtn.src="./styles/assets/company_hover.png"
});

companyBtn.addEventListener("click", ()=>{
    openCompanies()
})

usersBtn.addEventListener("mouseover", ()=>{
    removeHidden(usersLabel)
    usersBtn.src="./styles/assets/users_hover.png"
});

regionBtn.addEventListener("mouseover", ()=>{
    removeHidden(regionLabel)
    regionBtn.src="./styles/assets/region_hover.png"
});

regionBtn.addEventListener("click", ()=>{
    openRegions();
})

contactsBtn.addEventListener("mouseleave", ()=>{
    addHidden(contactsLabel)
    if(contactsOpen==false){
        contactsBtn.src="./styles/assets/contacts.png"
    }
});

companyBtn.addEventListener("mouseleave", ()=>{
    addHidden(companyLabel);
    if(companyOpen==false){
        companyBtn.src="./styles/assets/company.png"
    }
});

usersBtn.addEventListener("mouseleave", ()=>{
    addHidden(usersLabel)
    if(usersOpen==false){
        usersBtn.src="./styles/assets/users.png"
    }
});

usersBtn.addEventListener("click", ()=>{
    openUsers();
})


regionBtn.addEventListener("mouseleave", ()=>{
    addHidden(regionLabel)
    if(regionOpen==false){
        regionBtn.src="./styles/assets/region.png"
    }
    
});


loginBtn.addEventListener('click', (event)=>{
    event.preventDefault();
    loginLoad()
});

loggedusercontainer.addEventListener("mouseover", ()=>{
    loggeduseroptions.classList.remove("hidden")
})


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
});

loggeduseroptions.addEventListener("click", ()=>{

    //BORRA DATOS DE LOCALSTORAGE
    localStorage.clear();

    //CARGA SITIO NUEVAMENTE
    window.location.reload()
})

searchOptions.addEventListener("click", ()=>{
    searchDetail.classList.toggle("hidden")
    document.querySelector(".contactsBar-btns.search").classList.toggle("hidden")
})


searchBtn.addEventListener("click", ()=>{
    searchContact()
})


document.querySelector(".searchByName input").addEventListener("keyup", (e)=>{
    if(e.keyCode===13) searchContact()
});

document.querySelector(".searchByCompany input").addEventListener("keyup", (e)=>{
    if(e.keyCode===13) searchContact()
});

document.querySelector(".searchByRole input").addEventListener("keyup", (e)=>{
    if(e.keyCode===13) searchContact()
})

newContactBtn.addEventListener("click", ()=> {openNewContact()})

//AGREGA LISTENERS A SECCION REGIONES
document.addEventListener("click",async (e)=>{

    //LISTENERS REGIONES
    if(e.target.id=="regionEdit"){
        //CLICK EN EDITAR REGION
        const id= e.target.parentNode.parentNode.id;
        openLocationModal("Editar regi??n", "editRegion", id)
    }

    if(e.target.id=="regionDelete"){
        //CLICK EN ELIMINAR REGION
        prompt("deleteregion", "Desea eliminar la regi??n?", e.target.parentNode.parentNode.id)
    }

    if(e.target.id=="regionAdd"){
        //CLICK EN AGREGAR PAIS A REGION 
        const id = e.target.parentNode.parentNode.id;
        const regionName = await getRegionById(id);
        openLocationModal(`Agregar nuevo pa??s a ${regionName}`, "newCountry", id);
    }


    //LISTENERS PAISES
    if(e.target.id=="countryEdit"){
        //CLICK EN EDITAR PAIS
        const id= e.target.parentNode.parentNode.id;
        openLocationModal("Editar pais", "editCountry", id)
    }

    if(e.target.id=="countryDelete"){
        //CLICK EN ELIMINAR PAIS
        prompt("deletecountry", "Desea eliminar el pa??s?", e.target.parentNode.parentNode.id)
    }

    if(e.target.id=="countryAdd"){
        //CLICK EN AGREGAR CIUDAD A PAIS
        const id= e.target.parentNode.parentNode.id;
        const countryName = await getCountryById(id);
        openLocationModal(`Agregar nueva ciudad a ${countryName}`, "newCity", id);
    }


    //LISTENERS CIUDADES
    if(e.target.id=="cityEdit"){
        //CLICK EN EDITAR CIUDAD
        const id= e.target.parentNode.parentNode.id;
        openLocationModal("Editar ciudad","editCity", id)
    }

    if(e.target.id=="cityDelete"){
        //CLICK EN ELIMINAR CIUDAD
        prompt("deletecity", "Desea eliminar la ciudad?", e.target.parentNode.parentNode.id)
    }

})

  



