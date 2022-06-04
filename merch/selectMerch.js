console.log(document.cookie.userAddress);

if (document.cookie.userAddress == undefined) {
   window.location.replace("/merch/merch.html");
}

//object data with merch images
let merchData = {
    "shirt" : "https://picsum.photos/seed/1/100",
    "hoodie" : "https://picsum.photos/seed/2/100",
    "test": "https://picsum.photos/seed/3/100",
    "anothertest": "https://picsum.photos/seed/4/100"
}

let merchArray = Object.values(merchData);

console.log("merchArray: " + merchArray);

var selectedImages = [];
//makes a selectable list of merch images
const generateTable = () => {
    for(let i = 0; i < 4; i++){
        let checkbox = document.getElementById("cb" + (i+1));
        checkbox.addEventListener( 'change', function() {
        if(this.checked) {
            selectedImages.push(merchArray[i]);
            console.log("item selected", selectedImages);
        } else {
            for(let j = 0; j < selectedImages.length; j++) {
              if(selectedImages[j] == merchArray[i]) {
                selectedImages.splice(j, 1);
                console.log("item removed", selectedImages);
              }
            }
          }
      });    
    }
}

generateTable();

let next2 = document.getElementById("btn-merchSelected");
next2.addEventListener('click', () => {
  storeSelectedImages();
  storeUserAddress();
  window.location.replace("designMerch.html");
});

console.log("selectedImages", selectedImages);

//Store selected images in cookies
const storeSelectedImages = () => {
    document.cookie = "selectedImages=" + JSON.stringify(selectedImages);
}

//Store user address in cookies
const storeUserAddress = () => {
  document.cookie = "userAddress=" + JSON.stringify(currentUserAddress);
}

console.log("userAddress", document.cookie);