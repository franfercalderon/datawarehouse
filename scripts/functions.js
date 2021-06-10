//API CALLS

//REGIONES
async function getallRegions(){
    const regions = await fetchApi(url, '/location/regions', 'GET');
    return regions
}

async function getallCountries(){
    const countries = await fetchApi(url, '/location/countries', 'GET');
    return countries
}

//PAISES

async function getCountryByRegion(reg){
    const region = await fetchApi(url, '/location/regions/name_'+reg, 'GET');
    const regionId = region.id;
    // console.log(regionId);
    const countries = await fetchApi(url, '/location/countries/region_'+regionId, 'GET');
    // console.log(countries);
    return countries;

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

//CANALES DE CONTACTO

async function getallChannels(){
    const channels = await fetchApi(url, '/contacts/channels', 'GET');
    return channels
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
                <input name="newUserName" type="text" placeholder="Nombre">
            </div>
            <div class="contactData">
                <label for="newUserLastname">Apellido<span>*</span></label>
                <input name="newUserLastname" type="text" placeholder="Apellido">
            </div>
            <div class="contactData">
                <label for="newUserEmail">Email<span>*</span></label>
                <input name="newUserEmail" type="text" placeholder="Email">
            </div>
            <div class="contactData">
                <label for="newUserCompany">Compañía<span>*</span></label>
                <input name="newUserCompany" type="text" placeholder="Compañía">
            </div>
            <div class="contactData">
                <label for="newUserRole">Cargo<span>*</span></label>
                <input name="newUserRole" type="text" placeholder="Cargo">
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
            <input name="newUserAccount" type="text" placeholder="@contact">
        </div>
        <div class="contactData n3">
            <label for="newUserPrefference" >Preferencias</label>
            <select name="newUserPrefference" id="newUserPrefference">
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

    //LLAMA A SELECT DINAMICO SEGUN REGION/PAIS 
    dynamicLocation("contactModal");

    //FUNIONES BOTONES
    document.querySelector(".cancelNewUser").addEventListener("click", ()=>{
        newContactDiv.remove();
    })
    document.querySelector(".saveNewUser").addEventListener("click", ()=>{
        saveNewConact()
    });

}



function dynamicLocation(origin){
    if(origin == "contactModal"){
        const regionSelect = document.querySelector("#newUserRegion");
        const countrySelect = document.querySelector("#newUserCountry");
        const citySelect = document.querySelector("#newUserCity");
    
        regionSelect.addEventListener("change", async ()=>{
        countrySelect.innerHTML="";
        const region = regionSelect.value;
        const countries= await getCountryByRegion(region);
        
        for(let i=0; i<countries.length; i++){
            const option = document.createElement("option");
            option.value= countries[i].name;
            option.innerHTML= countries[i].name;
            countrySelect.appendChild(option);
            }
        });
    
        countrySelect.addEventListener("change", async () =>{
        citySelect.innerHTML="";
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


function saveNewConact(){
    const name = document.querySelector(".newUserName").value;
    const lastname = document.querySelector(".newUserLastname").value;
    const email = document.querySelector(".newUserEmail").value;
    const company = document.querySelector(".newUserCompany").value;
    const role = document.querySelector(".newUserRole").value;
    // const imgurl = document.querySelector(".")

    const region = document.querySelector("#newUserRegion").value;
    const country = document.querySelector("#newUserCountry").value;
    const city = document.querySelector("#newUserCity").value;
    const interest = document.querySelector("#newUserInterest").value;
    const channel = document.querySelector("#newUserChannel").value;
    const prefference = document.querySelector("#newUserPrefference").value;

    console.log(
        name+lastname+email+company+role+region+country+city+interest+channel+prefference
    )
}

