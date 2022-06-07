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

var userInfo = {
    walletAddress: cookieObj.userAddress,
    mailaddress: "",
    email: "",
    discordNickname: "",
    totalBillingAmount: 0,
    generatedMerch: cookieObj.selectedMerch,
    transactionConfirmed: false
};

document.getElementById("pay").onclick = () => {
    let allAreFilled = true;
    document.getElementById("myForm").querySelectorAll("[required]").forEach(function(i) {
      if (!allAreFilled) return;
      if (!i.value) allAreFilled = false;
    })
    if (!allAreFilled) {
      alert('Fill all the fields');
    }

    //REFERENCES 
    /**
     * walletAddress: "0x0..."
     * mailaddress: "JohnStreet"
     * email: "test@example.com"
     * discordNickname: "John_Doe#0001"
     * totalBillingAmount: 100
     * generatedMerch: Array
     * transactionConfirmed: true
     */

    //reconstrut user info from input fields
    userInfo.walletAddress = cookieObj.userAddress;
    userInfo.mailaddress = document.getElementById("mailaddress").value;
    userInfo.email = document.getElementById("email").value;
    userInfo.discordNickname = document.getElementById("nick").value;
    userInfo.totalBillingAmount = totalBill;
    userInfo.generatedMerch = cookieObj.selectedMerch;
    userInfo.transactionConfirmed = false;

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
    if (Object.keys(result).length === 0){
        alert("Transaction Failed");
    }
    else {
        alert("Transaction Confirmed");
        userInfo.transactionConfirmed = true;
    }

    //forwarding user response to database
    let data = userInfo;

    fetch("http:localhost:8000/pay", {
    method: "POST",
    headers: {'Content-Type': 'application/json'}, 
    body: JSON.stringify(data)
    }).then(res => {
    console.log("Response Forwarded! response: ", res);
    });

    redirect();
}

//If successfull then redirect to Thankyou.html
const redirect = () => {
    window.location.replace("/merch/thankyou.html");
}