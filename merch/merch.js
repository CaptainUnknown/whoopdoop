//Service Provider
const serverUrl = "https://9u6c8mkecbej.usemoralis.com:2053/server";
const appId = "eR98aghbIcArA9Wfhh86INVnCk0M04Y96FviHdRJ";
Moralis.start({ serverUrl, appId });

console.log("window.location", window.location.pathname);

window.onload = () => {
  document.getElementById("btn-nftsSelected").style.visibility = "hidden";
  let user = Moralis.User.current();
    console.log("user", user);
    if(user){
        document.getElementById("btn-login").style.visibility = "hidden";
        document.getElementById("btn-logout").style.visibility = "visible";
        document.getElementById("btn-nftsSelected").style.visibility = "visible";
        getNFTs();
    }
    if(!user){
      document.getElementById("btn-login").style.visibility = "visible";
      document.getElementById("btn-logout").style.visibility = "hidden";
      document.getElementById("btn-nftsSelected").style.visibility = "hidden";
    }
};

//Authentication
const login = async () => {
    let user = Moralis.User.current();
    if (!user) {
        user = await Moralis.authenticate({
                signingMessage: "Connect Whoopdoop to MetaMask",
            })
            .then(function(user) {
                console.log("logged in user:", user);
                console.log(user.get("ethAddress"));
                document.getElementById("btn-login").style.visibility = "hidden";
                document.getElementById("btn-logout").style.visibility = "visible";
                waitForAddress();
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
  
const logOut = async () => {
    await Moralis.User.logOut()
    .catch((error) => {
      console.log(error);
      alert(error.message);
    });
    console.log("logged out");
    setTimeout(function(){
        document.getElementById("btn-logout").style.visibility = "hidden";
        document.getElementById("btn-login").style.visibility = "visible";
   }, 400);
}
  
  
//Waits for the current user's ethereum address to be fetched
var currentUserAddress = "";
const addressGrabber = async () => {
    let currentUser = Moralis.User.current();
    if(currentUser){
        currentUserAddress = currentUser.attributes.ethAddress;
        return currentUserAddress;
    }
}
const waitForAddress = async() => {
    let t = await addressGrabber();
    console.log("address fetched successfully");
    getNFTs();
}

console.log(currentUserAddress);

document.getElementById("btn-logout").addEventListener('click', () => {
  logOut();
  setTimeout(function() {
      alert("Wallet disconnected");
  }, 800);
});
document.getElementById("btn-login").addEventListener('click', () => {
  login();
});


var ethNFTsImagesIPFS = []; //array of IPFS urls
var ethNFTsContentIDs = []; //array of content IDs
var ethNFTsImagesURLs = []; //array of NFT images

const getNFTs = async() => {
  const packet = { chain: "eth", address: currentUserAddress, token_address: "0x565AbC3FEaa3bC3820B83620f4BbF16B5c4D47a3" };
  const ethNFTs = await Moralis.Web3API.account.getNFTsForContract(packet);
  for(let i = 0; i < ethNFTs.length; i++) {
    ethNFTsContentIDs.push(ethNFTs[i].image.substring(7));
  }
  console.log(ethNFTsContentIDs);
  for(let i = 0; i < ethNFTsContentIDs.length; i++) {
    ethNFTsImagesURLs.push(`https://ipfs.io/ipfs/${ethNFTsContentIDs[i]}`);
  }
  console.log(ethNFTsImagesURLs);
  
  if(ethNFTsImagesURLs.length == 0){
    alert("No NFTs found");
  }
  else{
    document.getElementById("btn-nftsSelected").style.visibility = "visible";
  }
  generateTable();
}

var selectedImages = [];

//TODO: Fix not every image being selectable
const generateTable = () => {
  console.log(ethNFTsImagesURLs.length);
  for(let i = 0; i < ethNFTsImagesURLs.length; i++){
    let imageContainer = document.getElementById("image-container");
    let image = imageContainer.appendChild(document.createElement("li"));
    let fullString = "<input type=\"checkbox\" id=\"cb" + (i) + "\" /><label for=\"cb" +(i)+ "\"><img src=\"" + ethNFTsImagesURLs[i] +"\" /></label>";
    console.log(fullString);
    image.innerHTML = fullString;
    let checkbox = document.getElementById("cb" + (i));
    checkbox.addEventListener( 'change', function() {
      if(this.checked) {
        selectedImages.push(ethNFTsImagesURLs[i]);
        console.log("item selected", selectedImages);
      } else {
        for(let j = 0; j < selectedImages.length; j++) {
          if(selectedImages[j] == ethNFTsImagesURLs[i]) {
            selectedImages.splice(j, 1);
            console.log("item removed", selectedImages);
          }
        }
      }
    });    
  }  
}

let next1 = document.getElementById("btn-nftsSelected");
next1.addEventListener('click', () => {
  if(selectedImages.length == 0){
    alert("Please select at least one NFT");
  }
  else{
    storeSelectedImages();
    storeUserAddress();
    window.location.replace("selectMerch.html");
  }
});

console.log("selectedImages", selectedImages);

//Store selected images in cookies
const storeSelectedImages = () => {
    document.cookie = "selectedNFTs=" + JSON.stringify(selectedImages);
}

//Store user address in cookies
const storeUserAddress = () => {
  document.cookie = "userAddress=" + JSON.stringify(currentUserAddress);
}

console.log("userAddress", document.cookie);