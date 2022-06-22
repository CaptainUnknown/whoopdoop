//Service Provider
const serverUrl = "https://9u6c8mkecbej.usemoralis.com:2053/server";
const appId = "eR98aghbIcArA9Wfhh86INVnCk0M04Y96FviHdRJ";
Moralis.start({ serverUrl, appId });

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
var merchURLs;

const getData = async () => {

    await fetch('https://squid-app-g68md.ondigitalocean.app/prices')
    .then(res => res.json())
    .then(data => merchPrices = data)
    .then(() => console.log(merchPrices));

    await fetch('https://squid-app-g68md.ondigitalocean.app/merchURLs')
    .then(res => res.json())
    .then(data => merchURLs = data)
    .then(() => console.log(merchURLs));
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
    if(document.getElementById("nick").value.length == 0) {
        alert("Please Input your Nickname to continue...");
    }
    if(document.getElementById("email").value.length == 0) {
        alert("Please Input your Email to continue...");
    }
    if(document.getElementById("mailaddress").value.length == 0) {
        alert("Please Input your Mailing Address to continue...");
    }
    if(document.getElementById("nick").value.length > 0 && document.getElementById("email").value.length > 0 && document.getElementById("mailaddress").value.length > 0){
        userInfo.walletAddress = cookieObj.userAddress;
        userInfo.mailaddress = document.getElementById("mailaddress").value;
        userInfo.email = document.getElementById("email").value;
        userInfo.discordNickname = document.getElementById("nick").value;
        userInfo.totalBillingAmount = totalBill;
        userInfo.generatedMerch = cookieObj.generatedMerch;
        userInfo.transactionConfirmed = false;
        
        calculateBill();
        payBill();
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
};

var totalBill = 0;
const calculateBill = () => {
    totalBill = 0;
    let selectedMerchURLsArray = JSON.parse(cookieObj.selectedMerch);
    let allMerchURLsArray = Object.values(merchURLs);
    let merchPricesArray = Object.values(merchPrices);
    console.log(selectedMerchURLsArray);
    console.log(allMerchURLsArray);
    console.log(merchPricesArray);
    for (let i = 0; i < selectedMerchURLsArray.length; i++) {
        for(let j = 0; j < allMerchURLsArray.length; j++) {
            if(selectedMerchURLsArray[i] == allMerchURLsArray[j]) {
                totalBill += merchPricesArray[j];
            }
        }
    }
    console.log(totalBill);
    ethToUSD();
}

let ethBill;
const ethToUSD = async () => {
    const packet = {address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2", chain: "eth"};
    const response = await Moralis.Web3API.token.getTokenPrice(packet);
    console.log(response);

    const USDPrice = response.usdPrice;
    console.log(USDPrice);
    ethBill = totalBill * (1/USDPrice);
    console.log(ethBill);
}

ethToUSD();

//Prompts the user to transfer ERC 20 Tokens
const payBill = async () => {
    let transact;
    user = await Moralis.authenticate({
        signingMessage: "Connect Whoopdoop to MetaMask",
    })
    .then(() => {
        console.log("Authenticated");
    })
    .catch(err => {
        alert(err.message);
    });
    const options = {
        type: "native",
        amount: Moralis.Units.ETH(ethBill),
        receiver: "0x848C5f70aC85173E2bF52a78CF85fEc9E4Dffd20", //ADD OWNER ADDRESS
    };
    const transaction = await Moralis.transfer(options)
    .then(async () => {
        alert("Waiting for confirmation");
        transact = await transaction.wait()
        .then(async () => {
            alert("Transaction Confirmed, Press OK to continue");
            userInfo.transactionConfirmed = true;
            let data = userInfo;
            let packet = JSON.stringify(data);
    
            await fetch('https://squid-app-g68md.ondigitalocean.app/pay')
            .then(function() {
                console.log('Request succeeded');
            });
    
            redirect();
        })
        .catch(error =>{
            alert("Transaction Failed");
            console.log(err.message);
        });
    })
    .catch(err => {
        let tempMsg = err.message.substring(0, 12)
        if(tempMsg == "insufficient"){
            alert("Insufficient Funds to Pay Gas fees");
        }
        else{
            alert("Transaction Failed")
        }
        console.log(err.message);
    });    
}

//If successfull then redirect to Thankyou.html
const redirect = () => {
    window.location.replace("/merch/thankyou.html");
}