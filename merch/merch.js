//Service Provider
const serverUrl = "https://dj2eobgdklts.usemoralis.com:2053/server";
const appId = "ND5nN7BLT0R3qnfVZ45mD9GAULmk6MPQBlYGkDza";
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
                getNFTs();
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

var ethNFTsImagesIPFS = [];
var ethNFTsImages = [];
var ethNFTsImagesURLs = [];

var allImages = {
    "eth" : ethNFTsImagesURLs,
    //add all chains
};

//gets all the NFTs of the current user
const getNFTs = () => {
    const packet = { chain: 'rinkeby', address: currentUserAddress }; //Switch to Eth Network
    const ethNFTs = await Moralis.Web3API.account.getNFTs(options);
    
    for(let i = 0; i < ethNFTs.length - 1; i++) {
        let tempNFTObj = ethNFTs[i];
        let traits = Object.getOwnPropertyNames(tempNFTObj);
        for(let j = 0; j < traits.length - 1; j++){
            if(traits[j] == "image"){
                ethNFTsImagesIPFS.push(tempNFTObj.image);
            }
        }
    }
    console.log(ethNFTsImagesIPFS);
    for(let i = 0; i<ethNFTsImagesIPFS.length - 1 ; i++){
        let temp = ethNFTsImagesIPFS[i];
        let tempIDs = temp.substring(7);
        ethNFTsImages.push(tempIDs);
        console.log(ethNFTsImages);

        ethNFTsImagesURLs.push(`https://ipfs.io/ipfs/${ethNFTsImages[i]}`);

        console.log(ethNFTsImagesURLs[i]);

        /*
        let tempImage = ethNFTsImagesIPFS[i];
        let image = document.createElement("img");
        image.src = tempImage;
        image.className = "nft-image";
        document.getElementById("nft-container").appendChild(image);
        */
    }
}