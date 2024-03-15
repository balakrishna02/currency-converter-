let mode = document.querySelector(".mode");
let body = document.querySelector("body");
let BASE_URL = "https://latest.currency-api.pages.dev/v1/currencies"
let btn = document.querySelector("form button");
let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");
let msg = document.querySelector(".msg");


const dropdown = document.querySelectorAll(".dropdown select");


for(let select of dropdown){
    for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "from" && currCode === "USD"){
            newOption.selected = "selected";
        }
        else if(select.name === "to" && currCode === "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

const updateFlag = (element) => {
    // console.log(countryList[element.value]); //IN US
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc; 
};


const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;

    if(amtVal === "" || amtVal < 1){
        amtVal = 1;
        amount.value = "1";
    }
    
  
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    const response = await fetch(URL);
    let data = await response.json();
    let fromRate = data[fromCurr.value.toLowerCase()];//eur ko store krliye
    let toRate = fromRate[toCurr.value.toLowerCase()];
    // console.log(toRate);

    let finalAmount = amtVal * toRate;
    
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
}


btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});

window.addEventListener("load", () => {
    updateExchangeRate();
});


let currMode = "dark";

const change = () => { 

    if(currMode === "light"){
        
        body.classList.remove("light");
        body.classList.add("dark");

        let changeMode = document.querySelector(".mode i");
        changeMode.classList = "fa-regular fa-lightbulb"

        currMode = "dark";
    }
    else{
        body.classList.remove("dark");
        body.classList.add("light");

        let changeMode = document.querySelector(".mode i");
        changeMode.classList = "fa-solid fa-lightbulb"

        currMode = "light";
    }
}

mode.addEventListener("click", change);


const URL = "https://cat-fact.herokuapp.com/facts";
const facts = document.querySelector(".facts");
const button = document.querySelector("#btn");
 

