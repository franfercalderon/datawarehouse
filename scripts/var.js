//BUTTONS

const contactsBtn = document.querySelector(".contactsBtn img");
const companyBtn = document.querySelector(".companyBtn img");
const usersBtn = document.querySelector(".usersBtn img");
const regionBtn = document.querySelector(".regionBtn img");
const loginBtn = document.querySelector(".loginBtn");
const loggedusercontainer = document.querySelector(".loggedusercontainer");
const searchOptions = document.querySelector(".searchOptions");
const searchBtn = document.querySelector(".search");
const newContactBtn = document.querySelector(".contactsBar-btns.new");


//LABELS

const contactsLabel = document.querySelector(".contactsLabel");
const companyLabel = document.querySelector(".companyLabel");
const usersLabel = document.querySelector(".usersLabel");
const regionLabel = document.querySelector(".regionLabel");
const loggeduseroptions = document.querySelector(".loggeduseroptions");

//INPUT

const emailInput = document.querySelector(".emailInput");
const passInput = document.querySelector(".passInput");
// const newContactCompany = document.querySelector(".newContactCompany");

//API

const url = 'http://127.0.0.1:3000';

//SECTIONS
const logincontainer = document.querySelector(".logincontainer");
const loginscreen = document.querySelector(".loginscreen");
const searchDetail = document.querySelector(".searchDetail");
const contactsSection = document.querySelector(".contactsSection");

//STATES
let contactsOpen = false;
let companyOpen = false;
let usersOpen = false;
let regionOpen = false;

let orderName= false;
let orderCountry= false;
let orderCompany= false;
let orderRole= false;
let orderInterest= false;
let countryDeployed= false;


let offset = 0;
let opened= false;
let selectedArray= [];



