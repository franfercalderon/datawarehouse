//API CALLS

//CONTACTOS

async function deleteContact(id){
    const deletedContact = await fetchApi(url, '/contacts/'+id, 'DELETE');
    return deletedContact
}

//REGIONES
async function getallRegions(){
    const regions = await fetchApi(url, '/location/regions', 'GET');
    return regions
}

async function getRegionByName(reg){
    const region = await fetchApi(url, '/location/regions/name_'+reg, 'GET');
    return region.id;
}

//PAISES

async function getallCountries(){
    const countries = await fetchApi(url, '/location/countries', 'GET');
    return countries
}

async function getCountryByRegion(reg){
    const region = await fetchApi(url, '/location/regions/name_'+reg, 'GET');
    const regionId = region.id;
    const countries = await fetchApi(url, '/location/countries/region_'+regionId, 'GET');
    return countries;
}

async function getCountryByName(country){
    const searchedCountry = await fetchApi(url, '/location/countries/name_'+country, 'GET');
    return searchedCountry.id;
}

//CIUDADES

async function getallCities(){
    const cities = await fetchApi(url, '/location/cities', 'GET');
    return cities
}

async function getCitiesByCountry(ctry){
    const country = await fetchApi(url, '/location/countries/name_'+ctry, 'GET');
    const countryId = country.id;

    const cities = await fetchApi(url, '/location/cities/country_'+countryId, 'GET');
    return cities 
}

async function getCityByName(cty){
    const city = await fetchApi(url, '/location/cities/name_'+cty, 'GET');
    return city.id;
}

//CANALES DE CONTACTO

async function getallChannels(){
    const channels = await fetchApi(url, '/contacts/channels', 'GET');
    return channels
}

async function createNewChannel(body){
    const newContactChannel = await fetchApi(url, '/contacts/channels', 'POST', body);
    return newContactChannel
}

async function getChannelByName(chan){
    const channel= await fetchApi(url, '/contacts/channels/name_'+chan, 'GET');
    return channel.id
}

//COMPANIAS

async function searchCompany(input){
    const companies = await fetchApi(url, '/companies/'+input, 'GET');
    return companies
}

async function getCompanyByName(comp){
    const company = await fetchApi(url, '/companies/name_'+comp, 'GET');
    return company.id
}

//LLAMADA A API, FUNCION GENERAL:

async function fetchApi(url, target, method, body){
    if(method== 'GET'){
        try{
            const bearer = 'Bearer ' + JSON.parse(localStorage.getItem('token'));
            const res = await fetch(url+target, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': bearer
                }
            });
            const data = res.json();
            return await data;
        }
        catch(err){
            console.log(err)
        }
    }
    else{
        try{
            const bearer = 'Bearer ' + JSON.parse(localStorage.getItem('token'));
            const res = await fetch(url+target, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': bearer
                },
                body: JSON.stringify(body)
            });
            const data = res.json();
            return await data;
        }
        catch(err){
            console.log(err)
        }
    }
}


//FUNCIONES SECCION:

function removeHidden(x){
    x.classList.remove("hidden")
}

function addHidden(x){
    x.classList.add("hidden")
}


async function openContacts(){

    //MUESTRA SEECION
    
    contactsSection.classList.remove("hidden");
    contactsBtn.src="./styles/assets/contacts_hover.png";
    contactsOpen= true;
    const regions= await getallRegions();
    const channels = await getallChannels();

    // //COMPLETA SELECT REGIONES DESDE DB
    
    for(let i= 0; i<regions.length; i++){
        const option= document.createElement("option");
        option.value=regions[i].name;
        option.innerHTML= regions[i].name;
        document.querySelector("#contactRegion").appendChild(option)
    }
    
    //COMPLETA SELECT PAISES SEGUN REGION:

    dynamicLocation("contactSearch");


    //COMPLETA CANALES DE CONTACTO

    for(let i= 0; i<channels.length; i++){
        const option= document.createElement("option");
        option.value=channels[i].name;
        option.innerHTML= channels[i].name;
        document.querySelector("#contactChannel").appendChild(option) 
    }

}


//FUNCIONES LOGIN

async function loginLoad(){
    const body = {
        "email": emailInput.value,
        "password": passInput.value
    }
    const res= await fetchApi(url, '/users/login', 'POST', body);
    if(res.success){
        loginSuccess(res.success.userData);
        console.log(res.success.token);
        console.log(res.success.userData.name);
        console.log(res.success.userData.isAdmin);
    
        localStorage.setItem("token", JSON.stringify(res.success.token));
        localStorage.setItem("username", JSON.stringify(res.success.userData.name));
        localStorage.setItem("admin", JSON.stringify(res.success.userData.isAdmin));

    }
    else{
        loginError();
    }
}

function loginSuccess(user){
    logincontainer.innerHTML= "";
    const welcomeMsg = document.createElement("div");
    welcomeMsg.classList.add("welcomeMsg");
    welcomeMsg.innerHTML=`
    <img src="./styles/assets/success.png" alt="exito">
    <p>Bienvenido ${user.name}</p>`;
    logincontainer.appendChild(welcomeMsg);
    setTimeout(()=>{
        loginscreen.classList.add("hidden");
        openContacts();
        document.querySelector(".loggedusercontainer").innerHTML=`
        <p>${user.name}</p>
        <img src=${user.photo} alt="foto usuario">`
    }, 2000)
}

function loginError(){
    const loginErr = document.createElement("div");
    loginErr.classList.add("loginErr");
    loginErr.innerHTML=`
    <img src="./styles/assets/error.png" alt="error">
    <p>Email o constraseña inválidos.</p>`;
    loginscreen.appendChild(loginErr);
    emailInput.value= "";
    passInput.value="";
    setTimeout(()=>{
        loginErr.remove()}, 2000
    );
}


async function openNewContact(){
    const regions= await getallRegions();
    const channels = await getallChannels(); 

    let newContactDiv = document.createElement("div");
    newContactDiv.classList.add("contactModal");
    newContactDiv.innerHTML= `
    <div class="contactMainDiv">
        <div class="title">
            <p>Crear nuevo usuario</p>
        </div>
        <div class="contactDataDiv level1">
            <div class="contactData">
                <label for="newUserName" >Nombre<span>*</span></label>
                <input name="newUserName" class= "newContactName" type="text" placeholder="Nombre">
            </div>
            <div class="contactData">
                <label for="newUserLastname">Apellido<span>*</span></label>
                <input name="newUserLastname" class= "newContactLastname" type="text" placeholder="Apellido">
            </div>
            <div class="contactData">
                <label for="newUserEmail">Email<span>*</span></label>
                <input name="newUserEmail" class= "newContactEmail" type="text" placeholder="Email">
            </div>
            <div class="contactData contactCompanyDiv">
                <label for="newUserCompany">Compañía<span>*</span></label>
                <input name="newUserCompany" class= "newContactCompany" type="text" placeholder="Compañía">
                <div class="companiesSugDiv"></div>
            </div>
            <div class="contactData">
                <label for="newUserRole">Cargo<span>*</span></label>
                <input name="newUserRole" class= "newContactRole" type="text" placeholder="Cargo">
            </div>
        </div>
        <div class="contactDataDiv level2">
            <div class="contactData n2">
                <label for="newUserRegion" >Region</label>
                <select name="newUserRegion" id="newUserRegion">
                    <option value="" disabled selected>Región</option>
                </select>
            </div>
            <div class="contactData n2">
                <label for="newUserCountry" >País</label>
                <select name="newUserCountry" id="newUserCountry">
                    <option value="" disabled selected>Pais</option>
                </select>
            </div>
            <div class="contactData n2">
                <label for="newUserCity" >Ciudad</label>
                <select name="newUserCity" id="newUserCity">
                    <option value="" disabled selected>Ciudad</option>
                </select>
            </div>
            <div class="contactData n2">
                <label for="newUserInterest" >Interés</label>
                <select name="newUserInterest" id="newUserInterest">
                    <option value="" disabled selected>Interés</option>
                    <option value="0">0%</option>
                    <option value="25">25%</option>
                    <option value="50">50%</option>
                    <option value="75">75%</option>
                    <option value="100">100%</option>
                </select>
            </div>
        </div>
        <div class="contactDataDiv level3">
          
        </div>
        <div class="contactModalBtns">
            <div class="cancelNewUser">
                <p>Cancelar</p>
            </div>
            <div class="saveNewUser">
                <p>Guardar</p>
            </div>
        </div>
    </div>`
    document.querySelector(".main").appendChild(newContactDiv);

    for(let i=0; i<regions.length; i++){
        const option = document.createElement("option");
        option.value= regions[i].name;
        option.innerHTML= regions[i].name;
        document.querySelector("#newUserRegion").appendChild(option);
    }

    //CREA CANALES DE CONTACTO

    for(let i=0; i<channels.length; i++){
        const channelDiv = document.createElement("div");
        channelDiv.classList.add("channelDiv");
        channelDiv.classList.add(`n${i}`);
        channelDiv.innerHTML= `
        <div class="contactData n3">
            <label for="newUserChannel" >Canal de contacto</label>
            <select name="newUserChannel" id="newUserChannel${i}" class= "newUserChannel">
                <option value="" disabled selected>Canal</option>
            </select>
        </div>
        <div class="contactData n3">
            <label for="newUserAccount">Cuenta</label>
            <input name="newUserAccount" type="text" placeholder="@contact" id="newUserAccount${i}">
        </div>
        <div class="contactData n3">
            <label for="newUserPrefference" >Preferencias</label>
            <select name="newUserPrefference" id="newUserPrefference${i}">
                <option value="" disabled selected>Preferencias</option>
                <option value="Nodisturb">No molestar</option>
                <option value="Workingdays">Contactar días hábiles</option>
                <option value="Always">Contactar siempre</option>
            </select>
        </div>`
        document.querySelector(".contactDataDiv.level3").appendChild(channelDiv);

    }

    //AGREGA CANALES DISPONIBLES A SELECT 
    document.querySelectorAll(".newUserChannel").forEach(e=>{
        for(let i=0; i<channels.length; i++){
            const option = document.createElement("option");
            option.value= channels[i].name;
            option.innerHTML= channels[i].name;
            e.appendChild(option);
        }
    })
    
    //FUNIONES BOTONES
    document.querySelector(".cancelNewUser").addEventListener("click", ()=>{
        newContactDiv.remove();
    })
    document.querySelector(".saveNewUser").addEventListener("click", ()=>{
        saveNewConact()
    });
    
    //LLAMA A SELECT DINAMICO SEGUN REGION/PAIS 
    dynamicLocation("contactModal");

    //LLAMA A FUNCION PREDICTIVA DE COMPANIAS
    companyPrediction();
}

//FILLS COUNTRY/CITY SELECTS ACCORDING TO REGION/COUNTRY SELECTION

function dynamicLocation(origin){
    if(origin == "contactModal"){
        const regionSelect = document.querySelector("#newUserRegion");
        const countrySelect = document.querySelector("#newUserCountry");
        const citySelect = document.querySelector("#newUserCity");
    
        regionSelect.addEventListener("change", async ()=>{
        countrySelect.innerHTML="";
        const region = regionSelect.value;
        const countries= await getCountryByRegion(region);
        
        let nullOption = document.createElement("option");
        nullOption.innerHTML= '<option value="" disabled selected></option>';
        countrySelect.appendChild(nullOption);

        for(let i=0; i<countries.length; i++){
            const option = document.createElement("option");
            option.value= countries[i].name;
            option.innerHTML= countries[i].name;
            countrySelect.appendChild(option);
            }
        });
    
        countrySelect.addEventListener("change", async () =>{
        citySelect.innerHTML="";
        let nullOption = document.createElement("option");
        nullOption.innerHTML= '<option value="" disabled selected></option>';
        citySelect.appendChild(nullOption);
        const cities= await getCitiesByCountry(countrySelect.value);
    
        for(let i=0; i<cities.length; i++){
            const option = document.createElement("option");
            option.value= cities[i].name;
            option.innerHTML= cities[i].name;
            citySelect.appendChild(option);
            }
        });
    }

    if(origin == "contactSearch"){
        const regionSelect = document.querySelector("#contactRegion");
        const countrySelect = document.querySelector("#contactCountry");

        regionSelect.addEventListener("change", async ()=>{
            countrySelect.innerHTML="";
            let nullOption = document.createElement("option");
            nullOption.innerHTML= '<option value="" disabled selected></option>';
            countrySelect.appendChild(nullOption);
            const region = regionSelect.value;
            const countries= await getCountryByRegion(region);
            
            for(let i=0; i<countries.length; i++){
                const option = document.createElement("option");
                option.value= countries[i].name;
                option.innerHTML= countries[i].name;
                countrySelect.appendChild(option);
            }
        });
    }
}

//
function companyPrediction(){
    const newContactCompany = document.querySelector(".newContactCompany");
    const companiesSugDiv = document.querySelector(".companiesSugDiv");
    companiesSugDiv.innerHTML = "";

    newContactCompany.addEventListener("keyup", async ()=>{
        companiesSugDiv.innerHTML = "";
        const input = newContactCompany.value;
        if(input.length>0){
            const matches= await searchCompany(input);
            if(matches.length>0){
                companiesSugDiv.style.zIndex = "2";
                for(let i=0; i<matches.length; i++){
                    const sug = document.createElement("p");
                    sug.innerHTML= `${matches[i].name}`;
                    // console.log(matches[i].name);
                    companiesSugDiv.appendChild(sug);
                    sug.addEventListener("click", ()=>{
                        newContactCompany.value= matches[i].name;
                        companiesSugDiv.innerHTML = "";
                        companiesSugDiv.style.zIndex = "1";

                    })
                }
            }
        }
        if(input.length==0){
            companiesSugDiv.style.zIndex = "1";
        }
    })
    

}

//GUARDAR NUEVO CONTACTO

async function saveNewConact(){

    const name = document.querySelector(".newContactName").value;
    const lastname = document.querySelector(".newContactLastname").value;
    const email = document.querySelector(".newContactEmail").value;
    const company = document.querySelector(".newContactCompany").value;
    const role = document.querySelector(".newContactRole").value;
    const region = document.querySelector("#newUserRegion").value;
    const country = document.querySelector("#newUserCountry").value;
    const city = document.querySelector("#newUserCity").value;
    const interest = document.querySelector("#newUserInterest").value;

    //GET IDS
    const regionId= await getRegionByName(region);
    const countryId = await getCountryByName(country);
    const cityId = await getCityByName(city);
    const companyId = await getCompanyByName(company);

    if(name=="" || lastname== "" || email=="" || company=="" || role== ""){
        return prompt("mandatory","Faltan datos obligatorios")
    }

    const body ={
        name: name,
        lastname: lastname,
        email: email,
        company: companyId,
        role: role,
        region: regionId,
        country: countryId,
        city: cityId,
        interest: interest
    }

    const newContact = await fetchApi(url, '/contacts', 'POST', body);

    if(newContact){

         //GUARDA CANALES DE CONTACTO SELECCIONADOS

        const savechannel= await saveContactChannel(newContact);
        //SI SE CREA AL MENOS UN CONTACTO
        if(savechannel){
            return prompt("success","Contacto creado con éxito")
        }
        //SI NO SE CREO NINGUN CANAL DE CONTACTO BORRA AL USUARIO PARA CREARLO NUEVAMENTE CON CANAL DE CONTACTO
        else{
            await deleteContact(newContact.id);
        }
    }
}

//ERROR AND SUCCESS MESSAGES:

function prompt(status, message){
    const contactMainDiv = document.querySelector(".contactMainDiv");
    const createPrompt = document.createElement("div");
    createPrompt.classList.add("createPrompt");

    if(status=="mandatory"){
        createPrompt.innerHTML=`
        <img src="./styles/assets/error.png" alt="error">
        <p>${message}</p>`;
        contactMainDiv.appendChild(createPrompt)
        setTimeout(()=>{
            createPrompt.remove()}, 2000
        );
    }

    if(status=="success"){
        createPrompt.innerHTML=`
        <img src="./styles/assets/success.png" alt="exito">
        <p>${message}</p>`;
        contactMainDiv.appendChild(createPrompt)
        setTimeout(()=>{
            document.querySelector(".contactModal").remove()}, 2000
        );
    }
}

//
async function saveContactChannel(contact){

    const channels = await getallChannels();
    let contactInfos = [];

    for(let i=0; i<channels.length; i++){
        const thischannel = document.querySelector(`#newUserChannel${i}`).value;
        if(thischannel!=""){
            const thisaccount = document.querySelector(`#newUserAccount${i}`).value;
            const thisprefference = document.querySelector(`#newUserPrefference${i}`).value;

            //CHEQUEA QUE LOS CAMPOS SE HAYAN COMPLETADO
            if(thisaccount!="" && thisprefference!=""){

                //OBTIENE ID DE CANAL
                const channelId = await getChannelByName(thischannel);

                //BODY PARA CREAR CONTACT INFO
                const body= {
                    idUser: contact.id,
                    idChannel: channelId,
                    account: thisaccount,
                    prefference: thisprefference
                }
                const newChannel = await createNewChannel(body);
                contactInfos.push(newChannel);
            }
            else{
                //faltan campos
            }
        }
    }
    if(contactInfos.length>0) return contactInfos;
    return prompt("mandatory", "Se requiere al menos un canal de contacto")

}


