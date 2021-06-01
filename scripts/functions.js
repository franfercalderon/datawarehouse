// const models = require("../models");

function removeHidden(x){
    x.classList.remove("hidden")
}

function addHidden(x){
    x.classList.add("hidden")
}

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

async function openContacts(){

    //MUESTRA SEECION
    
    contactsSection.classList.remove("hidden");
    contactsBtn.src="./styles/assets/contacts_hover.png";
    contactsOpen= true;
    const regions= await getallRegions();
    const countries= await getallCountries();

    //COMPLETA SELECT REGIONES DESDE DB

    for(let i= 0; i<regions.length; i++){
        console.log(regions[i].name);
        const option= document.createElement("option");
        option.value=regions[i].name;
        option.innerHTML= regions[i].name;
        document.querySelector("#contactRegion").appendChild(option)
    }

    //COMPLETA SELECT PAISES DESDE DB

    for(let i= 0; i<countries.length; i++){
        console.log(countries[i].name);
        const option= document.createElement("option");
        option.value=countries[i].name;
        option.innerHTML= countries[i].name;
        document.querySelector("#contactCountry").appendChild(option)
    }



}

async function getallRegions(){
    const regions = await fetchApi(url, '/regions', 'GET');
    return regions
}

async function getallCountries(){
    const countries = await fetchApi(url, '/countries', 'GET');
    return countries
}

{/* <div class="searchDetail hidden">
    <div class="searchByName">
        <label for="contactName">Nombre</label>
        <input type="text" name="contactName" class= "searchInput" placeholder="Nombre del contacto">
    </div>
    <div class="searchByRole">
        <label for="contactRole">Cargo</label>
        <input type="text" name="contactRole" class= "searchInput"  placeholder="Cargo del contacto">
    </div>
    <div class="searchByRegion">
        <label for="contactRegion">Región</label>
        <select name="contactRegion"  class= "searchInput" id="contactRegion">
            <option value="" disabled selected>Región del contacto</option>
            <option value="Africa">Africa</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Latin America">Latin America</option>
            <option value="North America">North America</option>
            <option value="Oceania">Oceania</option>
        </select>
    </div>
    <div class="searchByCountry">
        <label for="contactCountry">País</label>
        <select name="contactCountry" class= "searchInput"  id="contactCountry">
            <option value="" disabled selected>País del contacto</option>
            <option value="Argentina">Argentina</option>
            <option value="Chile">Chile</option>
            <option value="España">España</option>
            <option value="Francia">Francia</option>
            <option value="Oman">Oman</option>
            <option value="Vietnam">Vietnam</option>
        </select>
    </div>
    <div class="searchByChannel">
        <label for="contactChannel">Canal preferido</label>
        <select name="contactChannel"  class= "searchInput" id="contactChannel">
            <option value="" disabled selected>Canal favorito</option>
            <option value="Facebook">Facebook</option>
            <option value="Instagram">Instagram</option>
            <option value="Telegram">Telegram</option>
            <option value="WhatsApp">WhatsApp</option>
        </select>
    </div>
    <div class="searchByInterest">
        <label for="contactInterest">Interés</label>
        <select name="contactInterest"  class= "searchInput" id="contactInterest">
            <option value="" disabled selected>Interés</option>
            <option value="0%">0%</option>
            <option value="25%">25%</option>
            <option value="50%">50%</option>
            <option value="75%">75%</option>
            <option value="100%">100%</option>
        </select>
    </div>
</div> */}

async function loginLoad(){
    console.log(`entra a loginLoad`);
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
    // logincontainer.innerHTML= "";
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
    )
}



