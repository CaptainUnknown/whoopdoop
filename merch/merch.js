//Service Provider
const serverUrl = "https://rzembgzcfjkd.usemoralis.com:2053/server";
const appId = "WeJBsnqY0axj8C5iz05q1QT1qY0p9oX0XvG1VhRZ";
Moralis.start({ serverUrl, appId });

//Authentication
async function login() {
    let user = Moralis.User.current();
    if (!user) {
        user = await Moralis.authenticate({
                signingMessage: "Connect Whoopdoop to the Ethereum network",
            })
            .then(function(user) {
                console.log("logged in user:", user);
                console.log(user.get("ethAddress"));
            })
            .catch(function(error) {
                console.log(error);
                alert(error.message);
            });
    }
    setTimeout(function() {
        let user = Moralis.User.current();
        if(user){
            alert("Wallet Connected");
        }
    }, 400);
    //getNFTs();
}
  
async function logOut() {
    await Moralis.User.logOut();
    console.log("logged out");
}
  
  
//Waits for the current user's ethereum address to be fetched
var currentUserAddress = "";
async function test() {
    let currentUser = Moralis.User.current();
    currentUserAddress = currentUser.attributes.ethAddress;
    return currentUserAddress;
}
async function waitForAddress() {
    let t = await test();
    console.log("address fetched successfully");
    getNFTs();
}
waitForAddress();
console.log(currentUserAddress);


document.getElementById("btn-logout").addEventListener('click', () => {
    logOut();
    setTimeout(function() {
        let user = Moralis.User.current();
        //alert("Wallet Conected");
        if(!user){
            alert("Wallet already disconnected");
        }
        else{
            alert("Wallet disconnected");
        }
    }, 800);
}, false);
document.getElementById("btn-login").addEventListener('click', () => {
    login();
}, false);

const getNFTs = async () => {
}