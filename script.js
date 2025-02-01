let select1 = document.querySelector("select[name='C1']");
let select2 = document.querySelector("select[name='C2']");
let field1 = document.querySelector(".field1");
let field2 = document.querySelector(".field2");

let currencyData; 

async function getCurrencyData(){
    currencyData = await (await fetch("currency.json")).json();
    // currencyData = await (await fetch("https://open.er-api.com/v6/latest/USD")).json();

    currencyData = currencyData["rates"];
    let countries = Object.keys(currencyData);
    for (let country of countries){
        let option = document.createElement("option");
        option.value = country;
        option.innerText = country;

        let option2 = option.cloneNode(true);
        
        select1.appendChild(option);
        select2.appendChild(option2);
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

select1.onchange = updateField2;
select2.onchange = updateField1