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
  //window.location.replace("/merch/merch.html");
}

var merchPrices;

const getData = async () => {

    await fetch('http://localhost:8000/prices')
    .then(res => res.json())
    .then(data => merchPrices = data)
    .then(() => console.log(merchPrices));


    console.log(merchPrices);

    calculateBill();
}

getData();

var userInfo = {};

document.getElementById("pay").onclick = () => {
    let allAreFilled = true;
    document.getElementById("myForm").querySelectorAll("[required]").forEach(function(i) {
      if (!allAreFilled) return;
      if (!i.value) allAreFilled = false;
    })
    if (!allAreFilled) {
      alert('Fill all the fields');
    }

    //construct user info from input fields
    let formData = document.forms.userData;

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

    //forwarding user response to database
    //let data = /*USER DATA*/;

    fetch("/post/data/here", {
    method: "POST",
    headers: {'Content-Type': 'application/json'}, 
    body: JSON.stringify(data)
    }).then(res => {
    console.log("Response Forwarded! response: ", res);
    });
}

//If successfull then redirect to Thankyou.html
const redirect = () => {
    window.location.replace("/merch/thankyou.html");
}