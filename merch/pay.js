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

document.getElementById("pay").onclick = function() {
    let allAreFilled = true;
    document.getElementById("myForm").querySelectorAll("[required]").forEach(function(i) {
      if (!allAreFilled) return;
      if (!i.value) allAreFilled = false;
    })
    if (!allAreFilled) {
      alert('Fill all the fields');
    }

    //Calculate()
    //PayBill()
};


//object data with merch images
let merchURLs = {
    "shirt" : "https://picsum.photos/seed/1/100",
    "hoodie" : "https://picsum.photos/seed/2/100",
    "test": "https://picsum.photos/seed/3/100",
    "anothertest": "https://picsum.photos/seed/4/100"
};

let merchPrices = {
    "shirt" : "0.005",
    "hoodie" : "0.007",
    "test": "0.001",
    "anothertest": "0.001"
};
//TODO MONGO Integration

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
    //Display the result
}

//If successfull then redirect to Thankyou.html
const redirect = () => {
    window.location.replace("/merch/thankyou.html");
}