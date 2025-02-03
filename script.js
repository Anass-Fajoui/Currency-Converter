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

let search1 = document.querySelector(".search1");
let search2 = document.querySelector(".search2");

let convRateSpan = document.querySelector(".convRate");
let pc1 = document.querySelector(".pc1");
let pc2 = document.querySelector(".pc2");
let swapBtn = document.querySelector(".swap");
let convertBtn = document.querySelector(".convert");

let currencyData; 
let flagsData;
let countries;
let options1 = [];
let options2 = [];

let active = 0;


async function setup(){
    try {
        currencyData = await (await fetch("https://open.er-api.com/v6/latest/USD")).json();
    }catch(error){
        console.log("there is an error here buddy");
        currencyData = await (await fetch("currency.json")).json();

        const notyf = new Notyf({
            duration: 2500,
            dismissible: true,
            position: { x: "right", y: "top" }
          });
      
        notyf.error("Connection error with the server.");
        setTimeout(function(){
            notyf.error("The exchange rates may be outdated. Please try again later.");
        }, 3000)
    }
    
    flagsData = await (await fetch("flags.json")).json();

    currencyData = currencyData["rates"];
    countries = Object.keys(currencyData);
    let firstCountry =  countries[0];
    Cspan1.innerHTML = firstCountry;
    Cspan2.innerHTML = firstCountry;
    
    flag1.src = flagsData[firstCountry][0];
    flag2.src = flagsData[firstCountry][0];

    for (let country of countries){
        addOption(country, 1);
        addOption(country, 2);
    }

    // options1 = Array.from(menu1.children);
    options1[0].classList.add("active");
    // options2 = Array.from(menu2.children);
    options2[0].classList.add("active");
    

    options1.forEach(function(item){
        item.onclick = function(){
            console.log("option clicked : " + item.getAttribute("value"));
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
            updateConversionRate();
            console.log("updated successfully");
        }
    });

    options2.forEach(function(item){
        item.onclick = function(){
            console.log("option clicked : " + item.getAttribute("value"));
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
            updateConversionRate();
            console.log("updated successfully");

        }
    });
};

setup();

function addOption(country, n){
    let option = document.createElement("div");
    
    option.setAttribute("value", country);
    let img = document.createElement("img");
    img.src = flagsData[country][0];
    option.appendChild(img);
    option.appendChild(document.createTextNode(country));
    let abv = document.createElement("span");
    abv.innerHTML = `&nbsp;(${flagsData[country][1]})`
    abv.style.fontSize = "13px";
    option.appendChild(abv);

    if (country === "MAD"){
        console.log(option);
    }
    if (n === 1){
        option.className = "option1";
        options1.push(option);
        menu1.appendChild(option);
    }else{
        option.className = "option2";
        options2.push(option);
        menu2.appendChild(option);
    }
}
// USD = a c1
// USD = b c2
// c1 = 1/a USD = b/a c2

function updateConversionRate(){
    let c1 = Cspan1.innerHTML;
    let c2 = Cspan2.innerHTML;
    pc1.innerHTML = c1;
    pc2.innerHTML = c2;
    let convRate = currencyData[c2] / currencyData[c1];
    convRate = convRate.toFixed(3);
    convRateSpan.innerHTML = `${convRate}`;
}

function swap(){
    let c1 = Cspan1.innerHTML;
    let c2 = Cspan2.innerHTML;
    updateCurrency1(c2);
    updateCurrency2(c1);
    updateConversionRate();
    if (active === 1){
        updateField2();
    }else if(active === 2){
        updateField1();
    }
}
swapBtn.onclick = swap;

function updateCurrency1(c){
    Cspan1.innerHTML = c;
    flag1.src = flagsData[c][0];
}

function updateCurrency2(c){
    Cspan2.innerHTML = c;
    flag2.src = flagsData[c][0];
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
        field1.value = `${convertedValue.toFixed(3)}`;
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
        field2.value = `${convertedValue.toFixed(3)}`;
    }
}

currencyDiv1.onclick = function(){
    drop2.style.display = "none";
    if (drop1.style.display === "block"){
        drop1.style.display = "none";
    }else{
        drop1.style.display = "block";
    }
    search1.focus();   
}


currencyDiv2.onclick = function(){
    drop1.style.display = "none";
    if (drop2.style.display === "block"){
        drop2.style.display = "none";
    }else{
        drop2.style.display = "block";
    }
    search2.focus();

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

search1.oninput = function(){
    let val1 = search1.value;
    val1 = val1.toUpperCase();
    menu1.replaceChildren();
    // countries.forEach(function(item){
    //     if (item.includes(val1)){
    //         addOption(item, 1)
    //     }
    // })
    options1.forEach(function(option){
        let current = option.getAttribute("value");
        if (current.includes(val1)){
            menu1.appendChild(option);
        }
    })

    if (menu1.children.length === 0) {
        let empty = document.createElement("div");
        empty.appendChild(document.createTextNode("No Currency Found"));
        empty.className = "empty";
        menu1.appendChild(empty);
    }
};
search2.oninput = function(){
    let val2 = search2.value;
    val2 = val2.toUpperCase();
    menu2.replaceChildren();
    // countries.forEach(function(item){
    //     if (item.includes(val2)){
    //         addOption(item, 2)
    //     }
    // })
    options2.forEach(function(option){
        let current = option.getAttribute("value");
        if (current.includes(val2)){
            menu2.appendChild(option);
        }
    })
    if (menu2.children.length === 0) {
        let empty = document.createElement("div");
        empty.appendChild(document.createTextNode("No Currency Found"));
        empty.className = "empty";
        menu2.appendChild(empty);
    }
};

// convertBtn.onclick = function(){
//     if (active === 1){
//         updateField2();
//     }else if(active === 2){
//         updateField1();
//     }
// }
