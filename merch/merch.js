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
            });
    }
    setTimeout(function() {
        if(user){
            alert("Wallet Conected");
        }
    }, 400);
    getNFTObjs();
}
  
async function logOut() {
    await Moralis.User.logOut();
    console.log("logged out");
}
  
  
//current eth address of the user
async function getCurrentUser() {
    let currentUser = Moralis.User.current();
    var currentUserAddress = 0;
    currentUserAddress = currentUser.attributes.ethAddress;
    console.log(currentUserAddress);
}

document.getElementById("btn-logout").addEventListener('click', () => {
    logOut();
    setTimeout(function() {
        alert("Wallet Disconnected");
    }, 800);
}, false);
document.getElementById("btn-login").addEventListener('click', () => {
    login();
    ADDFUNCTIONALITY();//ADD FUNCTIONALITY
}, false);
