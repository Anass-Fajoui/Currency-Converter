let field1 = document.querySelector(".field1");
let field2 = document.querySelector(".field2");

let drop1 = document.querySelector(".drop-down1");
let menu1 = document.querySelector(".menu1");

let drop2 = document.querySelector(".drop-down2");
let menu2 = document.querySelector(".menu2");

let currencyDiv1 = document.querySelector(".currency-div1");
let Cspan1 = document.querySelector(".currency-div1 span");
let flag1 = document.querySelector(".currency-div1 img");

let currencyDiv2 = document.querySelector(".currency-div2");
let Cspan2 = document.querySelector(".currency-div2 span");
let flag2 = document.querySelector(".currency-div2 img");

let currencyData; 
let flagsData;

let active = 0;

async function setup(){
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

    let options1 = Array.from(menu1.children);
    options1[0].classList.add("active");
    let options2 = Array.from(menu2.children);
    options2[0].classList.add("active");


    options1.forEach(function(item){
        item.onclick = function(){
            options1.forEach(function(b){
                b.classList.remove("active");
            })
            item.classList.add("active");
            updateCurrency1(item.getAttribute("value"));
            drop1.style.display = "none";

            if (active === 1){
                updateField2();
            }else if(active === 2){
                updateField1();
            }
        }
    });

    options2.forEach(function(item){
        item.onclick = function(){
            options2.forEach(function(b){
                b.classList.remove("active");
            })
            item.classList.add("active");
            updateCurrency2(item.getAttribute("value"));
            drop2.style.display = "none";

            if (active === 1){
                updateField2();
            }else if(active === 2){
                updateField1();
            }

        }
    });
};

setup();

function updateCurrency1(c){
    Cspan1.innerHTML = c;
    flag1.src = flagsData[c];
}

function updateCurrency2(c){
    Cspan2.innerHTML = c;
    flag2.src = flagsData[c];
}

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
        let currency1 = Cspan1.innerHTML;
        let currency2 = Cspan2.innerHTML;
        let convertedValue = convert(value2, currency2, currency1);
        field1.value = `${convertedValue.toFixed(2)}`;
    }
}

function updateField2(){
    if (field1.value === ""){
        field2.value = "";
    }else{
        let value1 = parseFloat(field1.value);
        let currency1 = Cspan1.innerHTML;
        let currency2 = Cspan2.innerHTML;
        let convertedValue = convert(value1, currency1, currency2);
        field2.value = `${convertedValue.toFixed(2)}`;
    }
}

currencyDiv1.onclick = function(){
    drop2.style.display = "none";

    if (drop1.style.display === "block"){
        drop1.style.display = "none";
    }else{
        drop1.style.display = "block";
    }
    
}
currencyDiv2.onclick = function(){
    drop1.style.display = "none";
    if (drop2.style.display === "block"){
        drop2.style.display = "none";
    }else{
        drop2.style.display = "block";
    }
}

document.addEventListener("click", function(event){
    if (!drop1.contains(event.target) && event.target !== currencyDiv1){
        drop1.style.display = "none";
    } 
})

document.addEventListener("click", function(event){
    if (!drop2.contains(event.target) && event.target !== currencyDiv2){
        drop2.style.display = "none";
    }
})
// I don't understand this part of the code
currencyDiv1.addEventListener("click", (event) => {
    event.stopPropagation(); 
});
currencyDiv2.addEventListener("click", (event) => {
    event.stopPropagation(); 
});


field1.oninput = function(){
    updateField2();
    active = 1;
};

field2.oninput = function(){
    updateField1();
    active = 2;
};




