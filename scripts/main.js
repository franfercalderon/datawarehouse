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
    addHidden(companyLabel)
    companyBtn.src="./styles/assets/company.png"
});

usersBtn.addEventListener("mouseleave", ()=>{
    addHidden(usersLabel)
    usersBtn.src="./styles/assets/users.png"
});

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
        console.log('edit '+e.target.parentNode.parentNode.id);
    }

    if(e.target.id=="regionDelete"){
        //CLICK EN ELIMINAR REGION
        prompt("deleteregion", "Desea eliminar la región?", e.target.parentNode.parentNode.id)
    }

    if(e.target.id=="regionAdd"){
        //CLICK EN AGREGAR PAIS A REGION 
        // console.log('add to puto'+e.target.parentNode.parentNode.id);
        const id = e.target.parentNode.parentNode.id;
        const regionName = await getRegionById(id);
        openLocationModal(`Agregar país a ${regionName}`, "newCountry", id);
    }


    //LISTENERS PAISES
    if(e.target.id=="countryEdit"){
        //CLICK EN EDITAR PAIS
        console.log('edit '+e.target.parentNode.parentNode.id);
    }

    if(e.target.id=="countryDelete"){
        //CLICK EN ELIMINAR PAIS
        prompt("deletecountry", "Desea eliminar el país?", e.target.parentNode.parentNode.id)
    }

    if(e.target.id=="countryAdd"){
        //CLICK EN AGREGAR CIUDAD A PAIS

        

        // console.log('add to '+e.target.parentNode.parentNode.id);
    }


    //LISTENERS CIUDADES
    if(e.target.id=="cityEdit"){
        //CLICK EN EDITAR CIUDAD
        console.log('edit '+e.target.parentNode.parentNode.id);
    }

    if(e.target.id=="cityDelete"){
        //CLICK EN ELIMINAR CIUDAD
        prompt("deletecity", "Desea eliminar la ciudad?", e.target.parentNode.parentNode.id)
    }

})




