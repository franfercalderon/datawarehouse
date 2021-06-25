//FUNCIONES SECCION CONTACTOS


function removeHidden(x){
    x.classList.remove("hidden")
}

function addHidden(x){
    x.classList.add("hidden")
}

async function openContacts(contacts){

    //LIMPIA TABLA SI YA ESTABA ABIERTA
    const table = document.querySelector(".contactsTable");
    if(table) table.remove()

    //MUESTRA SEECION
    contactsSection.classList.remove("hidden");

    //ESCONDE OTRAS SECCIONES
    if(regionOpen==true){
        console.log("la saca")
        document.querySelector(".regionsSection").remove()
    }

    //UPDATE ESTADO SECCIONES:
    contactsOpen= true;
    regionOpen=false;

    //SRC IMG BOTONES
    regionBtn.src="./styles/assets/region.png"
    contactsBtn.src="./styles/assets/contacts_hover.png";

    //OBTIENE REGIONES DESDE DB
    const regions= await getallRegions();

    //COMPLETA SELECT REGIONES DESDE DB
    for(let i= 0; i<regions.length; i++){
        const option= document.createElement("option");
        option.value=regions[i].name;
        option.innerHTML= regions[i].name;
        document.querySelector("#contactRegion").appendChild(option)
    }
    
    //COMPLETA SELECT PAISES SEGUN REGION:
    dynamicLocation("contactSearch");

    //FUNCION RENDERIZAR CONTACTOS
    if(contacts){
        fillContactTable(contacts, 0);
    }
    else{
        const contactList = await getAllContacts();
        fillContactTable(contactList, 0)
    }
}

async function pagination(contactList, offset, sort, way){
    
    //VARIABLES
    const next= document.querySelector(".forwardContainer");
    const prev= document.querySelector(".backContainer");
    const showingContacts = document.querySelector(".showingContacts");
    const totalContacts = document.querySelector(".totalContacts");

    //OBTIENE INFORMACIOÓN DE CONTACTOS TOTALES Y USA EL LARGO PARA MOSTRARLO EN INDEX
    const contacts = await getAllContacts();
    totalContacts.innerHTML=`${contactList.length}`
    showingContacts.innerHTML=`${offset+1} - ${offset+10}`;

    //MOSTRAR MÁS CONTACTOS
    next.addEventListener("click", ()=>{
        if(contactList.length> offset+10){
            offset=offset+10;
            document.querySelector(".contactsTable").remove();
            fillContactTable(contactList, offset);
        }
    })  

    //MOSTRAR CONTACTOS ANTERIORES
    prev.addEventListener("click", ()=>{

        //SI LLEGA A LA PRIMERA PÁGINA
        if(offset>=0 && offset<10){
            offset=0;
            document.querySelector(".contactsTable").remove();
            fillContactTable(contactList, offset);
        }

        else{
            offset=offset-10;
            document.querySelector(".contactsTable").remove();
            fillContactTable(contactList, offset);
        }
    })
}

function sortAlpha(contactList, attribute){
    //RESETEA SRC DE TODAS LAS FLECHAS
    document.querySelector(".column2 img").src="./styles/assets/order_unsel.png"
    document.querySelector(".locationColumn img").src="./styles/assets/order_unsel.png"
    document.querySelector(".column4 img").src="./styles/assets/order_unsel.png"
    document.querySelector(".column5 img").src="./styles/assets/order_unsel.png"
    document.querySelector(".column7 img").src="./styles/assets/order_unsel.png"

    //ENTRA SEGUN LA COLUMNA A ORDENAR
    if(attribute=="name"){

        //ORDENA USANDO EL METODO SRC
        contactList.sort((a,b)=>{
            if(orderName==false){
                if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
            }
            else{
                if(a.name.toLowerCase() < b.name.toLowerCase()) return 1;
                if(a.name.toLowerCase() > b.name.toLowerCase()) return -1;
            }
            return 0;
        })

        //TOGGLE DE VARIABLE DE ESTADO PARA ITERAR ENTRE ASC Y DESC
        if(orderName==false) orderName=true;
        else orderName=false;
    }
    if(attribute=="country"){
        
        //ORDENA USANDO EL METODO SRC
        contactList.sort((a,b)=>{
            if(orderCountry==false){
                if(a.contactCity.cityCountry.name.toLowerCase() < b.contactCity.cityCountry.name.toLowerCase()) return -1;
                if(a.contactCity.cityCountry.name.toLowerCase() > b.contactCity.cityCountry.name.toLowerCase()) return 1;
            }
            else{
                if(a.contactCity.cityCountry.name.toLowerCase() < b.contactCity.cityCountry.name.toLowerCase()) return 1;
                if(a.contactCity.cityCountry.name.toLowerCase() > b.contactCity.cityCountry.name.toLowerCase()) return -1;
            }
            return 0;
        })

        //TOGGLE DE VARIABLE DE ESTADO PARA ITERAR ENTRE ASC Y DESC
        if(orderCountry==false) orderCountry=true;
        else orderCountry=false;
    }
    if(attribute=="company"){
        
        //ORDENA USANDO EL METODO SRC
        contactList.sort((a,b)=>{
            if(orderCompany==false){
                if(a.contactCompany.name.toLowerCase() < b.contactCompany.name.toLowerCase()) return -1;
                if(a.contactCompany.name.toLowerCase() > b.contactCompany.name.toLowerCase()) return 1;
            }
            else{
                if(a.contactCompany.name.toLowerCase() < b.contactCompany.name.toLowerCase()) return 1;
                if(a.contactCompany.name.toLowerCase() > b.contactCompany.name.toLowerCase()) return -1;
            }
            return 0;
        })

        //TOGGLE DE VARIABLE DE ESTADO PARA ITERAR ENTRE ASC Y DESC
        if(orderCompany==false) orderCompany=true
        else orderCompany=false
    }
    if(attribute=="role"){
        
        //ORDENA USANDO EL METODO SRC
        contactList.sort((a,b)=>{
            if(orderRole==false){
                if(a.role.toLowerCase() < b.role.toLowerCase()) return -1;
                if(a.role.toLowerCase() > b.role.toLowerCase()) return 1;
            }
            else{
                if(a.role.toLowerCase() < b.role.toLowerCase()) return 1;
                if(a.role.toLowerCase() > b.role.toLowerCase()) return -1;
            }
            return 0;
        })

        //TOGGLE DE VARIABLE DE ESTADO PARA ITERAR ENTRE ASC Y DESC
        if(orderRole==false) orderRole=true
        else orderRole=false
    }
    if(attribute=="interest"){
        
        //ORDENA USANDO EL METODO SRC
        contactList.sort((a,b)=>{
            if(orderInterest==false){
                if(a.interest < b.interest) return -1;
                if(a.interest > b.interest) return 1;
            }
            else{
                if(a.interest < b.interest) return 1;
                if(a.interest > b.interest) return -1;
            }
            return 0;
        })

        //TOGGLE DE VARIABLE DE ESTADO PARA ITERAR ENTRE ASC Y DESC
        if(orderInterest==false) orderInterest=true
        else orderInterest=false
    }

    //LIMPIA RESULTADOS DE LA TABLA Y MUESTRA LOS NUEVOS, SEGUN ORDEN
    document.querySelector(".contactsTable").remove();
    fillContactTable(contactList, 0);
}

async function fillContactTable(contactList, offset, sort){

    //OBTIENE CONTACTOS SEGUN OFFSET
    // const contactList = await getAllContacts();
    const contacts = contactList.slice(offset, offset+10)

    //CREA DIV Y TABLA CON CONTACTOS DE DB
    const mainDiv= document.createElement("div");
    mainDiv.classList.add("contactsTable");
    mainDiv.innerHTML= `
        <div class="tableRow tableHeader">
            <div class="tableColumn column1">
                <input type="checkbox" name="selectall" id="selectall">
            </div>
            <div class="tableColumn column2">
                <p>Contacto</p> 
                <img src="./styles/assets/order_unsel.png" alt="ordenar">
            </div>
            <div class="tableColumn locationColumn">
                <p>País/Región</p> 
                <img src="./styles/assets/order_unsel.png" alt="ordenar">
            </div>
            <div class="tableColumn column4">
                <p>Compañía</p> 
                <img src="./styles/assets/order_unsel.png" alt="ordenar">
            </div>
            <div class="tableColumn column5">
                <p>Cargo</p> 
                <img src="./styles/assets/order_unsel.png" alt="ordenar">
            </div>
            <div class="tableColumn column7">
                <p>Interés</p> 
                <img src="./styles/assets/order_unsel.png" alt="ordenar">
            </div>
            <div class="tableColumn column8">Opciones</div>
        </div>
        <div class="headerDivider"></div>
        <div class="tableRows"></div>
        <div class="headerDivider"></div>
        <div class="indexBtns">
            <div class="indexContainer">
                <p><span class="showingContacts"></span> de <span class="totalContacts"></span> contactos</p>
            </div>
            <div class="backContainer arrowContainer">
                <img src="./styles/assets/back.png" alt="back" class="indexArrow">
            </div>
            <div class="forwardContainer arrowContainer">
                <img src="./styles/assets/forward.png" alt="forward" class="indexArrow">
            </div>
        </div>`
    document.querySelector(".contactsSection").appendChild(mainDiv);

    //AGREGA EVENTLISTENERS A SORT ARROWS
    document.querySelector(".column2 img").addEventListener("click", ()=>{
        sortAlpha(contactList, "name");
        document.querySelector(".column2 img").src="./styles/assets/order_sel.png"

    });
    document.querySelector(".locationColumn img").addEventListener("click", ()=>{
        sortAlpha(contactList, "country");
        document.querySelector(".locationColumn img").src="./styles/assets/order_sel.png"
    });
    document.querySelector(".column4 img").addEventListener("click", ()=>{
        sortAlpha(contactList, "company");
        document.querySelector(".column4 img").src="./styles/assets/order_sel.png"
    });
    document.querySelector(".column5 img").addEventListener("click", ()=>{
        sortAlpha(contactList, "role");
        document.querySelector(".column5 img").src="./styles/assets/order_sel.png"
    });
    document.querySelector(".column7 img").addEventListener("click", ()=>{
        sortAlpha(contactList, "interest");
        document.querySelector(".column7 img").src="./styles/assets/order_sel.png"
    });

    //LLAMA A FUNCION DE PAGINACIÓN/INDEX
    pagination(contactList, offset);

    //IF HEADER CHECHBOX IS SELECTED:
    const selectAll = document.querySelector("#selectall");
    selectAll.addEventListener("click",()=>{
        const boxes = Array.apply(null,document.querySelectorAll(".contactCheckbox"));
        const contacts = Array.apply(null, document.querySelectorAll(".itemRow"));

        if(selectAll.checked==true){
            //VACIA DATOS ANTERIORES DE ARRAY
            selectedArray=[]

            boxes.forEach(e=>{
                //SETEA CADA CHECKBOX A CHECKED
                e.checked=true
                //ENVIA ID DE CONTACTOS A ARRAY
                selectedArray.push(parseInt(e.id))
            });

            contacts.forEach(e=>{
                //AGREGA CLASE HOVER PARA BACKGROUND COLOR DE SELECCIONADO
                e.classList.add("contactHover");
            });

            //ENVIA ARRAY PARA FUNCION CONTADOR DE SELECCIONADOS
            selectedContactsOptions(selectedArray);
        }
        
        else{
            boxes.forEach(e=>{
                //SETEA CADA CHECKBOX A UNCHECKED
                e.checked=false;
                //VACIA ARRAY DE CONTACTOS SELECCIONADOS
                selectedArray=[]
            });

            contacts.forEach(e=>{
                //QUITA CLASE HOVER
                e.classList.remove("contactHover");
            });

            //ELIMINA CONTADOR DE SELECCIONADOS Y OPCION DELETE
            document.querySelector(".qtySelected").remove();
            document.querySelector(".deleteTag").remove();

            //RESTABLECE MARGEN DE BARRA SUPERIOR
            document.querySelector(".contactsBar").classList.remove("moved");
        }
    })
    
    for(let i=0; i<contacts.length; i++){
        //CREA DIV POR CADA CONTACTO Y COMLPETA CON DATOS EXISTENTES
        const thisContact= document.createElement("div");
        thisContact.classList.add("tableRow");
        thisContact.classList.add("itemRow");
        thisContact.innerHTML=`
            <div class="tableColumn column1">
                <input type="checkbox" name="select" id="${contacts[i].id}" class="contactCheckbox">
            </div>
            <div class="tableColumn">${contacts[i].name} ${contacts[i].lastname}</div>
            <div class="tableColumn locationColumn">${contacts[i].contactCity.cityCountry.name} / ${contacts[i].contactCity.cityCountry.countryRegion.name}</div>
            <div class="tableColumn">${contacts[i].contactCompany.name}</div>
            <div class="tableColumn">${contacts[i].role}</div>
            <div class="tableColumn interestColumn">
                <p>${contacts[i].interest}%</p>
                <img src="./styles/assets/load${contacts[i].interest}.png" alt="interest">
            </div>
            <div class="tableColumn column8 contactOptions">...</div>`

        document.querySelector(".tableRows").appendChild(thisContact);

        const options = document.querySelectorAll(".contactOptions");
        
        //HOVER SOBRE CONTACTO 
        thisContact.addEventListener("mouseenter", ()=>{
            options[i].innerHTML="";
            thisContact.classList.add("contactHover");
            const optionsDiv= document.createElement("div");
            optionsDiv.classList.add("optionsContainer");
            
            //MUESTRA OPCIONES DE EDITAR Y ELIMINAR CUANDO HOVER
            optionsDiv.innerHTML=`
                <div class="optionHoverBtns optionEdit" ">
                    <img src="./styles/assets/edit.png" alt="editar contacto" id="optionEdit">
                </div>
                <div class="optionHoverBtns optionDelete">
                    <img src="./styles/assets/delete.png" alt="eliminar contacto" id="optionDelete">
                </div>`;
            options[i].appendChild(optionsDiv);
        });


        thisContact.addEventListener("mouseleave", ()=>{

            //QUITA CLASE HOVER Y DEVUELVE ESTILO ORIGINAL
            if(thisContact.querySelector(".contactCheckbox").checked==false){
                thisContact.classList.remove("contactHover");        
            }
            options[i].innerHTML="...";
        });

        
        thisContact.addEventListener("click", (e)=>{

            //SI SE CLICKEA ICONO EDITAR, LLAMA OPCION EDITAR CON ID CONTACTO
            if(e.target.id == "optionEdit"){
                editContact(contacts[i].id)
            }
        });
        
        thisContact.addEventListener("click", (e)=>{

            //SI SE CLICKEA ICONO EDITAR, LLAMA OPCION ELIMINAR CON ID CONTACTO Y OFFTET PARA RENDERIZAR NUEVAMENTE CONTACTOS
            if(e.target.id == "optionDelete"){
                selectedArray.push(contacts[i].id);
                prompt("confirmation", "Está seguro que desea borrar el contacto?", selectedArray, offset)
            }
        });      

        thisContact.addEventListener("click", (e)=>{
            
            //SI SE CLICKEA CHECKBOX
            if(e.target.classList=="contactCheckbox"){

                //SI SE ENCUENTRA CHEQUEADO
                if(e.target.checked){

                    //SE AGREGA CLASE CON ESTILO HOVER
                    thisContact.classList.add("contactHover");

                    //ENVIA ID USUARIO A ARRAY DE SELECCIONADO
                    selectedArray.push(contacts[i].id);

                    //ACTUALIZA TAG CONTADOR USUARIOS SELECCIONADOS
                    selectedContactsOptions(selectedArray);
                }
                else{
                    
                    //SI CHACKEBOX SE DESELECCIONA, BUSCA INDEX DEL ID Y LO QUITA DEL ARRAY 
                    const index = selectedArray.indexOf(contacts[i].id);
                    selectedArray.splice(index, 1);
                    //ACTUALIZA TAG CONTADOR USUARIOS SELECCIONADOS 
                    selectedContactsOptions(selectedArray);
                }
            }
        })
    }
}

async function editContact(id){

    //OBTIENE DATOS DE DB
    const regions= await getallRegions();
    const channels = await getallChannels(); 
    const contactCards= await getContactInfo(id);
    const contact =  await getContactById(id);

    //CREA DIV
    let newContactDiv = document.createElement("div");
    newContactDiv.classList.add("contactModal");
    newContactDiv.innerHTML= `
    <div class="contactMainDiv">
        <div class="title">
            <p>Editar contacto</p>
        </div>
        <div class="contactDataDiv level1">
            <div class="contactData">
                <label for="newUserName">Nombre<span>*</span></label>
                <input name="newUserName" class= "newContactName" type="text" placeholder="Nombre" value='${contact.name}'>
            </div>
            <div class="contactData">
                <label for="newUserLastname">Apellido<span>*</span></label>
                <input name="newUserLastname" class= "newContactLastname" type="text" placeholder="Apellido" value='${contact.lastname}'>
            </div>
            <div class="contactData">
                <label for="newUserEmail">Email<span>*</span></label>
                <input name="newUserEmail" class= "newContactEmail" type="text" placeholder="Email" value='${contact.email}'>
            </div>
            <div class="contactData contactCompanyDiv">
                <label for="newUserCompany">Compañía<span>*</span></label>
                <input name="newUserCompany" class= "newContactCompany" type="text" placeholder="Compañía" value='${contact.contactCompany.name}'>
                <div class="companiesSugDiv"></div>
            </div>
            <div class="contactData">
                <label for="newUserRole">Cargo<span>*</span></label>
                <input name="newUserRole" class= "newContactRole" type="text" placeholder="Cargo" value='${contact.role}'>
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
                    <option value=0>0%</option>
                    <option value=25>25%</option>
                    <option value=50>50%</option>
                    <option value=75>75%</option>
                    <option value=100>100%</option>
                </select>
            </div>
        </div>
        <div class="contactDataDiv level3">
          
        </div>
        <div class="contactModalBtns">
            <div class="cancelNewUser">
                <p>Cancelar</p>
            </div>
            <div class="saveContactEdition">
                <p>Guardar</p>
            </div>
        </div>
    </div>`
    document.querySelector(".main").appendChild(newContactDiv);

    //INYECTA REGIONES A SELECT
    for(let i=0; i<regions.length; i++){
        const option = document.createElement("option");
        option.value= regions[i].name;
        option.innerHTML= regions[i].name;
        document.querySelector("#newUserRegion").appendChild(option);
    }

    //OBTIENE PAISES DE LA REGION SELECCIONADA
    const countries = await getCountryByRegion(contact.contactCity.cityCountry.countryRegion.name);
    for(let i=0; i<countries.length; i++){
        const option = document.createElement("option");
        option.value= countries[i].name;
        option.innerHTML= countries[i].name;
        document.querySelector("#newUserCountry").appendChild(option);
    }

    //OBTIENE CIUDADES DEL PAIS SELECCIONADO
    const cities = await getCitiesByCountry(contact.contactCity.cityCountry.name);
    for(let i=0; i<cities.length; i++){
        const option = document.createElement("option");
        option.value= cities[i].name;
        option.innerHTML= cities[i].name;
        document.querySelector("#newUserCity").appendChild(option);
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

    //LLAMA A SELECT DINAMICO SEGUN REGION/PAIS 
    dynamicLocation("contactModal");
    
    //LLAMA A FUNCION PREDICTIVA DE COMPANIAS
    companyPrediction();
    
    //FILL VALUES WITH LOCATION DATA
    document.querySelector("#newUserRegion").value= contact.contactCity.cityCountry.countryRegion.name;
    document.querySelector("#newUserCountry").value= contact.contactCity.cityCountry.name;
    document.querySelector("#newUserCity").value= contact.contactCity.name;

    //FILL INTEREST VALUE
    document.querySelector("#newUserInterest").value= contact.interest;

    //FILL VALUES WITH EXISTING CONTACT CARDS
    for(let i =0; i<contactCards.length; i++){
        document.querySelector(`#newUserChannel${i}`).value = contactCards[i].ContactChannel.name;
        document.querySelector(`#newUserAccount${i}`).value = contactCards[i].account;
        document.querySelector(`#newUserPrefference${i}`).value = contactCards[i].prefference;
    }
    
    //FUNCIONES BOTONES
    document.querySelector(".cancelNewUser").addEventListener("click", ()=>{
        newContactDiv.remove();
    })
    document.querySelector(".saveContactEdition").addEventListener("click", ()=>{
        updateContact(contact.id)
    });
}


//FUNCIONES LOGIN

document.addEventListener("DOMContentLoaded", (e)=>{

    //AL CARGARSE LA PÁGINA, CHEQUEA SI TENE TOKEN EN LOCALSTORAGE
    if (localStorage.getItem("token") !== null) {

        //SI ENCUENTRA TOKEN, REMUEVE PANTALLA LOGIN E INGRESA A LA APP
        let userData={
            token:JSON.parse(localStorage.getItem("token")),
            name:JSON.parse(localStorage.getItem("username")),
            isAdmin:localStorage.getItem("admin"),
            photo:localStorage.getItem("photo")
        }

        //LLAMA A FUNCTION LOGIN CON DATA DESDE LOCALSTORAGE
        loginSuccess(userData)
    } 
    else{

        //SI NO, MUESTRA PANTALLA LOGIN
        loginscreen.classList.remove("hidden");
    }

});

async function loginLoad(){

    //TOMA DATOS DE INPUT
    const body = {
        "email": emailInput.value,
        "password": passInput.value
    }

    //LLAMA A API
    const res= await fetchApi(url, '/users/login', 'POST', body);

    //SI ENCUENTRA EL USUARIO:
    if(res.success){
    
        localStorage.setItem("token", JSON.stringify(res.success.token));
        localStorage.setItem("username", JSON.stringify(res.success.userData.name));
        localStorage.setItem("admin", JSON.stringify(res.success.userData.isAdmin));
        localStorage.setItem("photo", JSON.stringify(res.success.userData.photo));

        loginSuccess(res.success.userData, "welcome");

    }
    else{
        //PROMPT DE ERROR
        loginError();
    }
}

function loginSuccess(user, welcome){

    if(welcome=="welcome"){

        //SI ESTÁ LOGGUEANDO POR PRIMERA VEZ
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
    else{

        //SI ESTÁ RECARGANDO LA VENTANA
        loginscreen.classList.add("hidden");
            openContacts();
            document.querySelector(".loggedusercontainer").innerHTML=`
            <p>${user.name}</p>
            <img src=${user.photo} alt="foto usuario">`
    }

    if (localStorage.getItem("admin") == "true") {

        //SI LA PROPIEDAD ADMIN ES TRUE, MUESTRA SECCIÓN DE USUARIOS
        document.querySelector(".usersBtn").classList.remove("hidden");
    }


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

//ABRE MODAL PARA NUEVO CONTACTO
async function openNewContact(){
    //OBTIENE REGIONES Y CANALES DE CONTACTO DESDE DB
    const regions= await getallRegions();
    const channels = await getallChannels(); 

    //CREA DIV 
    let newContactDiv = document.createElement("div");
    newContactDiv.classList.add("contactModal");
    newContactDiv.innerHTML= `
    <div class="contactMainDiv">
        <div class="title">
            <p>Crear nuevo contacto</p>
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
                    <option value=0>0%</option>
                    <option value=25>25%</option>
                    <option value=50>50%</option>
                    <option value=75>75%</option>
                    <option value=100>100%</option>
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

    //INYECTA REGIONES A SELECT
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
    
    //FUNCIONES BOTONES
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
    //SI ES LLAMADA DESDE EL MODAL DE CREAR/EDITAR CONTACTO
    if(origin == "contactModal"){
        const regionSelect = document.querySelector("#newUserRegion");
        const countrySelect = document.querySelector("#newUserCountry");
        const citySelect = document.querySelector("#newUserCity");
    
        regionSelect.addEventListener("change", async ()=>{
            //LIMPIA RESULTADOS ANTERIORES
            countrySelect.innerHTML="";

            //OBTIENE PAISES POR NOMBRE DE REGION
            const region = regionSelect.value;
            const countries= await getCountryByRegion(region);
            
            //CREA UNA PRIMERA OPCION "NULA"
            let nullOption = document.createElement("option");
            nullOption.innerHTML= '<option value="" disabled selected></option>';
            countrySelect.appendChild(nullOption);

            for(let i=0; i<countries.length; i++){
                //CREA OPCIONES EN SELECT DE PAISES
                const option = document.createElement("option");
                option.value= countries[i].name;
                option.innerHTML= countries[i].name;
                countrySelect.appendChild(option);
                }
        });
    
        countrySelect.addEventListener("change", async () =>{
            //LIMPIA RESULTADOS ANTERIORES
            citySelect.innerHTML="";

            //CREA UNA PRIMERA OPCION "NULA"
            let nullOption = document.createElement("option");
            nullOption.innerHTML= '<option value="" disabled selected></option>';
            citySelect.appendChild(nullOption);

            //OBTIENE CIUDADES POR NOMBRE DE PAIS
            const cities= await getCitiesByCountry(countrySelect.value);
        
            for(let i=0; i<cities.length; i++){
                //CREA OPCIONES EN SELECT DE CIUDADES
                const option = document.createElement("option");
                option.value= cities[i].name;
                option.innerHTML= cities[i].name;
                citySelect.appendChild(option);
                }
        });
    }
    //SI ES LLAMADA DESDE LAS OPCIONES DE BUSQUEDA
    if(origin == "contactSearch"){

        const regionSelect = document.querySelector("#contactRegion");
        const countrySelect = document.querySelector("#contactCountry");
        // regionSelect.innerHTML="";
        // countrySelect.innerHTML="";

        regionSelect.addEventListener("change", async ()=>{
            //LIMPIA RESULTADOS ANTERIORES
            countrySelect.innerHTML="";

            //CREA UNA PRIMERA OPCION "NULA"
            let nullOption = document.createElement("option");
            nullOption.innerHTML= '<option value="" disabled selected></option>';
            countrySelect.appendChild(nullOption);

            //OBTIENE PAISES POR NOMBRE DE REGION
            const region = regionSelect.value;
            const countries= await getCountryByRegion(region);
            
            for(let i=0; i<countries.length; i++){

                //CREA OPCIONES EN SELECT DE PAISES
                const option = document.createElement("option");
                option.value= countries[i].name;
                option.innerHTML= countries[i].name;
                countrySelect.appendChild(option);
            }
        });
    }
}

//FUNCION CONTADOR CONACS SELECCIONADOS
function selectedContactsOptions(selected){

    if(document.querySelector(".qtySelected")){
        //ELIMINA ETIQUETAS EXISTENTES
        const counterTags = Array.apply(null, document.querySelectorAll(".qtySelected"));
        counterTags.forEach(e=>{
            e.remove()
        })
        const deleteTags = Array.apply(null, document.querySelectorAll(".deleteTag"));
        deleteTags.forEach(e=>{
            e.remove()
        })
    }
    
    if(selected.length>0){

        //CREA ESPACIO PARA TAGS, MUEVE MARGEN DE BARRA SUPERIOR
        document.querySelector(".contactsBar").classList.add("moved");

        //CREA DIV CONTADOR
        const qtySelected = document.createElement("div");
        qtySelected.classList.add("qtySelected");
        const p = document.createElement("p");

        //MUESTRA LARGO DE ARRAY RECIBIDO (CONTACTOS SELECCIONADOS)
        p.innerHTML=`${selected.length} contactos seleccionados`
        qtySelected.appendChild(p);
        document.querySelector(".contactsSection").appendChild(qtySelected)

        //CREA DIV ELIMINAR
        const deleteTag = document.createElement("div");
        deleteTag.classList.add("deleteTag");
        deleteTag.innerHTML=`
            <img src="./styles/assets/delete.png" alt="eliminar">
            <p>Eliminar contactos seleccionados</p>`
        
        document.querySelector(".contactsSection").appendChild(deleteTag)

        deleteTag.addEventListener("click", ()=>{

            //GENERA PROMPT DE CONFIRMACION Y LUEGO ELIMINA
            prompt("confirmation", "Desea eliminar los contactos seleccionados?", selected, 0)
            
        });
    }
    else{
        //RESTABLECE MARGEN DE BARRA SUPERIOR
        document.querySelector(".contactsBar").classList.remove("moved");
    }

}

//INYECTA A SELECT PAIS SEGUN REGION Y CIUDAD SEGUN PAIS
function companyPrediction(){
    const newContactCompany = document.querySelector(".newContactCompany");
    const companiesSugDiv = document.querySelector(".companiesSugDiv");
    companiesSugDiv.innerHTML = "";

    //AL RECIBIR INPUT
    newContactCompany.addEventListener("keyup", async ()=>{
        //LIMPIA RESUTADOS VIEJOS
        companiesSugDiv.innerHTML = "";
        const input = newContactCompany.value;
        if(input.length>0){
            //BUSCA COINCIDENCIAS CON NOMBRES DE COMPANIA
            const matches= await searchCompany(input);
            if(matches.length>0){
                //SI ENCUENTRA AL MENOS UNA COINCIDENCIA, ENVIA DIV DE SUGERENCIAS POR DELANTE E INYECTA RESULTADOS
                companiesSugDiv.style.zIndex = "2";
                for(let i=0; i<matches.length; i++){
                    const sug = document.createElement("p");
                    sug.innerHTML= `${matches[i].name}`;
                    companiesSugDiv.appendChild(sug);
                    sug.addEventListener("click", ()=>{
                        //AL CLICKEAR RESULTADOS LOS ENVIA AL INPUT Y BORRA SUGERENCIAS
                        newContactCompany.value= matches[i].name;
                        companiesSugDiv.innerHTML = "";
                        companiesSugDiv.style.zIndex = "1";

                    })
                }
            }
        }
        //SI INPUT VACIO, ENVIA DIV POR DETRÁS
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

    //CORROBORA DATOS OBLIGATORIOS 
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

    //ENVIA POST A API
    const newContact = await fetchApi(url, '/contacts', 'POST', body);
    if(newContact.error) return prompt("mandatory","Formato de email incorrecto")
    else{

        //GUARDA CANALES DE CONTACTO SELECCIONADOS

        const savechannel= await saveContactChannel(newContact);
        //SI SE CREA AL MENOS UN CONTACTO
        if(savechannel){
            openContacts()
            return prompt("success","Contacto creado con éxito");
            
        }
        //SI NO SE CREO NINGUN CANAL DE CONTACTO BORRA AL USUARIO PARA CREARLO NUEVAMENTE CON CANAL DE CONTACTO
        else{
            selectedArray.push(newContact.id);
            await deleteContact(selectedArray);
        }
    }
}
//UPDATE CONTACT
async function updateContact(id){
    
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

    //CORROBORA DATOS OBLIGATORIOS 
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

    //ENVIA PUT A API
    const updatedContact = await fetchApi(url, '/contacts/'+id, 'PUT', body);
    if(updatedContact.error) return prompt("mandatory","Formato de email incorrecto")
    else{
        //BORRA CANALES PREEXISTENTES
        await deleteContactCards(id);
        //GUARDA CANALES DE CONTACTO ACTUALES
        const contact= {id:id}
        const savechannel= await saveContactChannel(contact);
        if(savechannel){
            //DEVUELVE MENSAJE DE ÉXITO
            return prompt("success","Contacto actualizado")
        }
    }
}

//PROMPTS:
function prompt(status, message, id, offset){
    const contactMainDiv = document.querySelector(".contactMainDiv");
    const createPrompt = document.createElement("div");
    createPrompt.classList.add("createPrompt");

    //ALERTA DE CAMPOS FALTANTES
    if(status=="mandatory"){
        createPrompt.innerHTML=`
        <img src="./styles/assets/error.png" alt="error">
        <p>${message}</p>`;
        contactMainDiv.appendChild(createPrompt)
        setTimeout(()=>{
            createPrompt.remove()}, 2000
        );
    }

    //MENSAJE DE EXITO
    if(status=="success"){
        createPrompt.innerHTML=`
        <img src="./styles/assets/success.png" alt="exito">
        <p>${message}</p>`;
        contactMainDiv.appendChild(createPrompt)
        setTimeout(()=>{
            document.querySelector(".contactModal").remove()}, 2000
        );
    }

    //CONFIRMACION DELETE CONTACT
    if(status=="search"){
        createPrompt.innerHTML=`
        <img src="./styles/assets/error.png" alt="error">
        <p>${message}</p>`;
        document.querySelector(".contactsSection").appendChild(createPrompt);
        setTimeout(()=>{
            createPrompt.remove()}, 2000
        );
    }

    //CONFIRMACION DELETE CONTACT
    if(status=="confirmation"){
        createPrompt.innerHTML=`
        <img src="./styles/assets/error.png" alt="exito">
        <p>${message}</p>
        <div class="promptBtns">
            <div id="promptCancelBtn">Cancelar</div>
            <div id="promptConfirmBtn">Eliminar</div>
        </div>`;
        document.querySelector(".contactsSection").appendChild(createPrompt);
        createPrompt.addEventListener("click",  async (e)=>{  
            //SI HACE CLICK EN CANCELAR, BORRA EL PROMPT
            if(e.target.id=="promptCancelBtn"){
                createPrompt.remove()
            }
            //SI HACE CLICK EN ELIMINAR
            if(e.target.id=="promptConfirmBtn"){
                //ELIMINA CONTACT POR ID
                await deleteContact(id);

                //ELIMINA TAGS DE OPCIONES SELECCIONADOS
                if(document.querySelector(".qtySelected")){
                    document.querySelector(".deleteTag").remove();
                    document.querySelector(".qtySelected").remove();
                }

                //RESTABLECE MARGEN DE BARRA SUPERIOR
                document.querySelector(".contactsBar").classList.remove("moved");

                if(deleteContact){
                    selectedArray=[];

                    createPrompt.innerHTML=`
                    <img src="./styles/assets/success.png" alt="exito">
                     <p>Contacto eliminado!</p>`
                    
                    setTimeout(()=>{
                        //RENDERIZA NUEVAMENTE LISTA DE CONTACTOS Y BORRA PROMPT
                        openContacts()
                        createPrompt.remove()
                    }, 2000);
                }

            }
        })

    }
}

//GUARDAR INFORMACION DE CONTACTO
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
                return prompt("mandatory", "Canal de contacto incompleto")
            }
        }
    }
    if(contactInfos.length>0) return contactInfos;

    //SI NO RECIBE NINGUN CANAL DE CONTACTO
    return prompt("mandatory", "Se requiere al menos un canal de contacto")
}

//BUSQUEDA DE CONTACTOS

async function searchContact(){

    const name= document.querySelector(".searchByName input").value;
    const company= document.querySelector(".searchByCompany input").value;
    const role= document.querySelector(".searchByRole input").value;
    const region= document.querySelector(".searchByRegion select").value;
    const country= document.querySelector(".searchByCountry select").value;
    const interest= document.querySelector(".searchByInterest select").value;
    
    if(!name && !company && !role && !region&& !country&& !interest){

        //SI NO RECIBE AL MENOS UN PARAMETRO DE BUSQUEDA
        prompt("search", "Ingrese al menos un valor de búsqueda")
    }

    //OBJETO CON VALORES PARA BUSQUEDA
    const obj={
        name, 
        company,
        role,
        region,
        country,
        interest
    }

    //LLAMA A FUNCION DE BUSQUEDA
    const searchedContacts= await getContactSearch(obj);

    //SI RECIBE AL MENOS UN RESULTADO
    if(searchedContacts.length>0){

        //RESETEA INPUTS
        document.querySelector(".searchByName input").value = "";
        document.querySelector(".searchByCompany input").value = "";
        document.querySelector(".searchByRole input").value = "";
        // document.querySelector(".searchByRegion select").innerHTML = "";
        // document.querySelector(".searchByCountry select").innerHTML= "";
        // document.querySelector(".searchByInterest select").innerHTML= "";


        //RENDERIZA RESULTADOS
        openContacts(searchedContacts);

        //ESCONDE SECCIÓN DE BUSQUEDA Y BOTON BUSQUEDA
        searchDetail.classList.add("hidden");
        searchBtn.classList.add("hidden");
    }
    else{

    }
}

//FUNCIONES SECCION REGIONES

async function openRegions(){

    //UPDATE ESTADO SECCIONES:
    contactsOpen= false;
    regionOpen=true;

    //SRC IMG BOTONES
    regionBtn.src="./styles/assets/region_hover.png"
    contactsBtn.src="./styles/assets/contacts.png";

    //ESCONDE SECCIONES:
    contactsSection.classList.add("hidden");

    //CREA DIV CONTENEDOR
    const regionsSection = document.createElement("section");
    regionsSection.classList.add("regionsSection");
    document.querySelector(".main").appendChild(regionsSection);

    //LLAMA A API PARA OBTENER TODAS LAS REGIONES/PAISES/CIUDADES
    const regions= await getallRegions();

    //RENDERIZA LOCACIONES
    fillLocations(regions)
}

async function fillLocations(regions){
    
    //ORDENA REGIONES ALFABETICAMENTE
    regions.sort((a,b)=>{
        if(a.name>b.name) return 1;
        if(a.name<b.name) return -1;
        return 0
    });
    
    regions.forEach(async region=>{

        //CREA DIV PARA CADA REGION
        const regionDiv = document.createElement("div");
        regionDiv.classList.add(`regionDiv`);
        regionDiv.innerHTML=`
            <p class="regionTitle">${region.name}</p>`
        document.querySelector(".regionsSection").appendChild(regionDiv);

        //OBTIENE PAISES DE LA REGIÓN
        const countries = await getCountryByRegion(region.name);

        //ORDENA PAISES ALFABETICAMENTE
        countries.sort((a,b)=>{
        if(a.name>b.name) return 1;
        if(a.name<b.name) return -1;
        return 0
        });

        countries.forEach(async country=>{

            //CREA DIV PARA CADA PAIS
            const countryDiv= document.createElement("div");
            countryDiv.classList.add("countryDiv");
            countryDiv.innerHTML=`
                <p class="countryName">${country.name}</p>`
            regionDiv.appendChild(countryDiv);

            //OBTIENE CIUDADES DEL PAIS
            const cities= await getCitiesByCountry(country.name);
    
            cities.sort((a,b)=>{
                if(a.name>b.name) return 1;
                if(a.name<b.name) return -1;
                return 0
            });

            for(let i=0; i<cities.length; i++){

            
            // cities.forEach(city=>{
                //CREA DIV PARA CADA PAIS
                const cityDiv= document.createElement("div");
                cityDiv.classList.add("cityDiv");
                cityDiv.classList.add("hidden");
                cityDiv.innerHTML=`
                    <p class="cityName">${cities[i].name}</p>
                    <div class="cityOptions">...</div>`
                countryDiv.appendChild(cityDiv);

                const cityOptions= document.querySelectorAll(".cityOptions");

                cityDiv.addEventListener("mouseenter", ()=>{
                    cityOptions[i].innerHTML=`
                        <div class="cityHoverBtns cityEdit" ">
                            <img src="./styles/assets/edit.png" alt="editar ciudad" id="cityEdit">
                        </div>
                        <div class="cityHoverBtns cityDelete">
                            <img src="./styles/assets/delete.png" alt="eliminar ciudad" id="cityDelete">
                        </div>`
                        
                        
                })

                // cityDiv.addEventListener("mouseenter", ()=>{
                //     cityOptions[i].innerHTML=`
                //         <div class="cityHoverBtns cityEdit" ">
                //             <img src="./styles/assets/edit.png" alt="editar ciudad" id="cityEdit">
                //         </div>
                //         <div class="cityHoverBtns cityDelete">
                //             <img src="./styles/assets/delete.png" alt="eliminar ciudad" id="cityDelete">
                //         </div>`
                // })
                // cityDiv.addEventListener("mouseleave", ()=>{

                //     document.querySelector(".cityOptions").innerHTML="..."
                // })



            };

            countryDiv.addEventListener("click", async ()=>{
                const toHide= Array.apply(null, countryDiv.querySelectorAll(".cityDiv"));
                
                //MUESTRA/ESCONDE CIUDADES AL CLIQUEAR PAIS
                toHide.forEach(e=>{
                    e.classList.toggle("hidden")
                })
            })

            
        })
    })
}







