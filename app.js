
const Base_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";



const dropdowns = document.querySelectorAll('.dropdown select');
const btn = document.querySelector('form button');
const fromCurr = document.querySelector('.from select');
const toCurr = document.querySelector('.to select');
const msg = document.querySelector('.msg');


//from code.js
// for (code in countryList){
//     console.log(code, countryList[code]);
// }

for (let select of dropdowns){
    for (currCode in countryList){
        let newOption = document.createElement('option');
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === 'from' && currCode =='USD'){
            newOption.selected = 'selected';
        }
        else if (select.name === 'to' && currCode =='INR'){
            newOption.selected = 'selected';
        }
        select.append(newOption);
    }

    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);//jis bhi jagah change hua h wo store rehta hai evt.target me
    })
}


const updateFlag = (element)=>{
    console.log(element);
    console.log(element.value);
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/shiny/64.png`;
    let img = element.parentElement.querySelector('img');
    img.src = newSrc;
}


btn.addEventListener("click", async (evt)=>{
    // console.log(evt);
    evt.preventDefault();
    let amount = document.querySelector('.amount input');
    let amtVal = amount.value;
    // console.log(amt.value);
    if (amtVal === '' || amtVal < 1){
        amtVal = 1;
        amount.value = '1';
    }

    // console.log(fromCurr.value,toCurr.value);
    const URL =`${Base_URL}/${fromCurr.value.toLowerCase()}.json`;
    console.log(URL);

    let response = await fetch(URL);
    let data = await response.json();
    // console.log(data);
    let exchangeRates = data[fromCurr.value.toLowerCase()];
    let rate = exchangeRates[toCurr.value.toLowerCase()];
    // console.log(rate);
    let finalAmount = amtVal*rate;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
});