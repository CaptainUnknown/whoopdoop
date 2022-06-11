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

    //REFERENCE
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
    userInfo.generatedMerch = cookieObj.generatedMerch;
    userInfo.transactionConfirmed = false;
    
    calculateBill();
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
        receiver: "0x848C5f70aC85173E2bF52a78CF85fEc9E4Dffd20", //ADD OWNER ADDRESS
    };
    const transaction = await Moralis.transfer(options);
    alert("Waiting for confirmation");
    const result = await transaction.wait(); //Waits for atleast One confirmation
    
    if (Object.keys(result).length === 0){
        alert("Transaction Failed");
    }
    else {
        alert("Transaction Confirmed");
        userInfo.transactionConfirmed = true;
    }

    // The parameters we are gonna pass to the fetch function
    let data = userInfo;
    let packet = JSON.stringify(data);
    
    fetch('http://localhost:8000/pay', { 
        method: 'POST', 
        body: packet,
        headers: {'Content-Type': 'application/json'}
    })
    .then(function() {
        console.log('Request succeeded');
    });

    redirect();
}

//If successfull then redirect to Thankyou.html
const redirect = () => {
    window.location.replace("/merch/thankyou.html");
}