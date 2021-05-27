function removeHidden(x){
    x.classList.remove("hidden")
}

function addHidden(x){
    x.classList.add("hidden")
}

function openContacts(){
    contactsSection.classList.remove("hidden");
    contactsBtn.src="./styles/assets/contacts_hover.png"
    contactsOpen= true
}

async function loginLoad(){
    console.log(`entra a loginLoad`);
    const body = {
        "email": emailInput.value,
        "password": passInput.value
    };
    try{
        const callApi= await fetch(url+'/users/login', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const res = await callApi.json();
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
    catch(err){
        console.error(err)
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



