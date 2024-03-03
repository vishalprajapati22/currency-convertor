const dropdowns = document.querySelectorAll(".dropdown select");
const button = document.querySelector("button");
let fromCurrency = document.querySelector(".from select");
let toCurrency = document.querySelector(".to select");
let exchangeTxt = document.querySelector(".msg");

//for select and flag

for (select of dropdowns) {
    for (currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        } else if (select.name === "to" && currCode === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change", (evt) => {
        upadateFlag(evt.target);
    })
}

const upadateFlag = (element) => {
    let currCode = element.value;
    countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let flag = element.parentElement.querySelector("img");
    flag.src = newSrc;
}

//for button and calling api

button.addEventListener("click", (evt) => {
    evt.preventDefault();
    console.log(fromCurrency.value, toCurrency.value)
    getExchageValue();
})

function getExchageValue() {
    let amount = document.querySelector(".amount input")
    let amtVal = amount.value;
    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amount.value = "1";
    }

    exchangeTxt.innerText = "Getting exchange rate....";
    let url = `https://v6.exchangerate-api.com/v6/b23fd5ec6169bab3598496f5/latest/${fromCurrency.value}`
    fetch(url)
        .then((response) => {
            return response.json()
        }).then((result) => {
            // console.log(result.conversion_rates)
            let exchangeRate = result.conversion_rates[toCurrency.value];
            let total = (amtVal * exchangeRate).toFixed(2);
            exchangeTxt.innerText = `${amtVal} ${fromCurrency.value}=${total} ${toCurrency.value}`
        })
        .catch(() => {
            exchangeTxt.innerText = "something went wrong";
        });
}

window.addEventListener("load",()=>{
    getExchageValue();
})