let field1 = document.querySelector(".field1");
let field2 = document.querySelector(".field2");

let menu1 = document.querySelector(".menu1");
let menu2 = document.querySelector(".menu2");

let Cspan1 = document.querySelector(".currency-div1 span")
let flag1 = document.querySelector(".currency-div1 img")

let Cspan2 = document.querySelector(".currency-div2 span")
let flag2 = document.querySelector(".currency-div2 img")

let currencyData; 
let flagsData;

async function getCurrencyData(){
    currencyData = await (await fetch("currency.json")).json();
    flagsData = await (await fetch("flags.json")).json();
    // currencyData = await (await fetch("https://open.er-api.com/v6/latest/USD")).json();

    currencyData = currencyData["rates"];
    let countries = Object.keys(currencyData);
    let firstCountry =  countries[0];
    Cspan1.innerHTML = firstCountry;
    Cspan2.innerHTML = firstCountry;
    
    flag1.src = flagsData[firstCountry];
    flag2.src = flagsData[firstCountry];

    for (let country of countries){
        let option = document.createElement("div");
        
        option.setAttribute("value", country);
        let img = document.createElement("img");
        img.src = flagsData[country];
        option.appendChild(img);
        option.appendChild(document.createTextNode(country));
        option.className = "option1";
        let option2 = option.cloneNode(true);
        option2.className = "option2";
        menu1.appendChild(option);
        menu2.appendChild(option2);
    }
}

getCurrencyData();

function convert(amount, c1, c2){
    let dollarValue = amount / currencyData[c1];
    let finalValue = dollarValue * currencyData[c2];
    return finalValue;
}

function updateField1(){
    if (field2.value === ""){
        field1.value = "";
    }else{
        let value2 = parseFloat(field2.value);
        let currency1 = select1.value;
        let currency2 = select2.value;
        let convertedValue = convert(value2, currency2, currency1);
        field1.value = `${convertedValue.toFixed(2)}`;
    }
}

function updateField2(){
    if (field1.value === ""){
        field2.value = "";
    }else{
        let value1 = parseFloat(field1.value);
        let currency1 = select1.value;
        let currency2 = select2.value;
        let convertedValue = convert(value1, currency1, currency2);
        field2.value = `${convertedValue.toFixed(2)}`;
    }
}


field1.oninput = updateField2;
field2.oninput = updateField1;



