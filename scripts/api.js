//CONTACTOS

async function getLimitedContacts(offset){
    const contacts = await fetchApi(url, '/contacts/offset_'+offset, 'GET');
    return contacts
}

async function deleteContact(id){
    //RECEIVE ARRAY DE IDS A ELIMINAR
    id.forEach(async(e)=>{
        const deletedContact = await fetchApi(url, '/contacts/'+e, 'DELETE');
        return deletedContact
    })
}


async function getAllContacts(){
    const contacts = await fetchApi(url, '/contacts', 'GET');
    return contacts
}

async function getContactSearch(obj){
    const searchedContacts = await fetchApi(url, `/contacts/search?name=${obj.name}&company=${obj.company}&role=${obj.role}&region=${obj.region}&country=${obj.country}&interest=${obj.interest}`, 'GET');

    return searchedContacts
}



async function getContactById(id){
    const contact = await fetchApi(url, '/contacts/'+id, 'GET');
    return contact
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

async function getRegionById(id){
    const region = await fetchApi(url, '/location/regions/'+id, 'GET');
    return region.name
}

async function getAllLocations(){
    const locations = await fetchApi(url, '/location/all', 'GET');
    return locations
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

async function getCountryById(id){
    const country = await fetchApi(url, '/location/countries/'+id, 'GET');
    return country.name
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

async function getContactInfo(id){
    const channels= await fetchApi(url, '/contacts/contactChannel/'+id, 'GET');
    return channels
}

async function deleteContactCards(id){
    const deletedCards = await fetchApi(url, '/contacts/contactChannel/'+id, 'DELETE');
    return deletedCards
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

async function getCompanyById(id){
    const company = await fetchApi(url, '/companies/'+id, 'GET');
    return company.name
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