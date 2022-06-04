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

let merchArray = Object.values(merchURLs);

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
  window.location.replace("designMerch.html");
});

//Store selected images in cookies
const storeSelectedImages = () => {
    document.cookie = "selectedMerch=" + JSON.stringify(selectedImages);
}

console.log("userAddress", document.cookie);