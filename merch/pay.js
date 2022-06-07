const parseCookie = str =>
str
.split(';')
.map(v => v.split('='))
.reduce((acc, v) => {
  acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
  return acc;
}, {});

const cookieObj = parseCookie(document.cookie);

//Checks whether the user is authenticated
if (cookieObj.userAddress == undefined) {
  window.location.replace("/merch/merch.html");
}

var merchPrices;
var merchURLs;

const getData = () => {

    fetch('http://localhost:8000/prices')
    .then(res => res.json())
    .then(data => merchPrices = data)
    .then(() => console.log(merchPrices));


    fetch('http://localhost:8000/merchURLs')
    .then(res => res.json())
    .then(data => merchURLs = data)
    .then(() => console.log(merchURLs));

    setTimeout(() => {
        console.log(merchPrices);
        console.log(merchURLs);

        calculateBill();
    }, 1000);
}

getData();

document.getElementById("pay").onclick = function() {
    let allAreFilled = true;
    document.getElementById("myForm").querySelectorAll("[required]").forEach(function(i) {
      if (!allAreFilled) return;
      if (!i.value) allAreFilled = false;
    })
    if (!allAreFilled) {
      alert('Fill all the fields');
    }
    
    payBill();
};

var totalBill = 0;
const calculateBill = () => {
    for (let i = 0; i < cookieObj.selectedMerch.length; i++) {
        if (cookieObj.selectedMerch == merchPrices[Object.keys(merchPrices)[i]]){
            totalBill += Number(merchPrices[Object.keys(merchPrices)[i]]);
        }
    }
}

//Prompts the user to transfer ERC 20 Tokens
const payBill = async () => {
    const options = {
        type: "native",
        amount: Moralis.Units.ETH(totalBill),
        receiver: "0x..", //ADD OWNER ADDRESS
    };
    const transaction = await Moralis.transfer(options);
    const result = await transaction.wait(); //Waits for atleast One confirmation
    alert("Waiting for confirmation");
    setTimeout(() => {
        if (Object.keys(result).length === 0){
            alert("Transaction Failed");
        }
        else {
            alert("Transaction Successful");
            redirect();
        }
    }, 5000);
}

//If successfull then redirect to Thankyou.html
const redirect = () => {
    window.location.replace("/merch/thankyou.html");
}