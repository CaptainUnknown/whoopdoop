//Service Provider
const serverUrl = "https://rzembgzcfjkd.usemoralis.com:2053/server";
const appId = "WeJBsnqY0axj8C5iz05q1QT1qY0p9oX0XvG1VhRZ";
Moralis.start({ serverUrl, appId });

const checkUser = () => {
    let user = Moralis.User.current();
    console.log("user", user)
    if(user){
        document.getElementById("btn-login").disabled = true;
    }
    else{
        document.getElementById("btn-logout").disabled = true;
    }
}

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
                document.getElementById("btn-login").disabled = true;
                document.getElementById("btn-logout").disabled = false;
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
}
  
async function logOut() {
    await Moralis.User.logOut();
    console.log("logged out");
    document.getElementById("btn-logout").disabled = true;
    document.getElementById("btn-login").disabled = false;
}
  
  
//Waits for the current user's ethereum address to be fetched
var currentUserAddress = "";
const addressGrabber = async () => {
    let currentUser = Moralis.User.current();
    currentUserAddress = currentUser.attributes.ethAddress;
    return currentUserAddress;
}
const waitForAddress = async() => {
    let t = await addressGrabber();
    console.log("address fetched successfully");
    getNFTs();
}
waitForAddress();
console.log(currentUserAddress);


document.getElementById("btn-logout").addEventListener('click', () => {
    logOut();
    setTimeout(function() {
        //alert("Wallet Conected");
        alert("Wallet disconnected");
    }, 800);
}, false);
document.getElementById("btn-login").addEventListener('click', () => {
    login();
}, false);

//gets all the NFTs of the current user
const getNFTs = async () => {
    const packet = { chain: 'eth', address: currentUserAddress };
    const ethNFTs = await Moralis.Web3API.account.getNFTs(options);
}