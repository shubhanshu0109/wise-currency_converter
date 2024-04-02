const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector(" button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
const amountInput = document.querySelector(".amount input");
const showRate=document.getElementById('showRate');
// let rems = document.getElementById('rem');
let fee;





for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "INR") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "USD") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "0";
  }
  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
  let response = await fetch(URL);
  let data = await response.json();
  let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
  let cc=`${fromCurr.value.toUpperCase()}`;
  showRate.innerHTML=rate;
  const selectedCurrency = fromCurr.value.toLowerCase();
  if (selectedCurrency === "inr") {
    fee = 332.01;
  } else {
    updatefee1((newFee) => {
        fee = newFee; // Assign the callback value to the fee variable
      });
  }
  let rems = (amtVal - fee).toFixed(2); // Calculate the remaining amount after deducting the fee
  document.getElementById('rem').innerText = `${rems} ${cc}`; // Update the remaining amount displayed

  let finalAmount = (rems * rate).toFixed(3);
  msg.innerText = `${finalAmount}`;

};
const updatefee = async () => {
    let amount = 322.01;
    
    const URL = `${BASE_URL}/inr.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data["inr"][fromCurr.value.toLowerCase()];
    let cc=`${fromCurr.value.toUpperCase()}`;
      
   
    let finalfee = (amount * rate).toFixed(2);
    document.querySelector('span .fee').innerHTML=`${finalfee} ${cc}`;
    document.querySelector('span .fees').innerHTML=`${finalfee} ${cc}`;
    fee=finalfee;
    

  };
  const updatefee1 = async () => {
    let amount = 322.01;
    
    const URL = `${BASE_URL}/inr.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data["inr"][fromCurr.value.toLowerCase()];
    
      
   
    let finalfee = amount * rate;
   
    if (typeof callback === 'function') {
        callback(finalfee);
      }
    

  };
const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://wise.com/web-art/assets/flags/${countryCode.toLowerCase()}.svg`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
 
  
  
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

window.addEventListener("load", () => {
  updateExchangeRate();
  
});
amountInput.addEventListener("input", () => {
    updateExchangeRate();
    updatefee();
    
  });

// fromCurr.addEventListener("change",()=>{
//     updateExchangeRate(fee);
// })