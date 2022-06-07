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

//---Generate Table
// TODO: Currently is not dynamic & is hardcoded in html
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


var merchPrices;
var merchURLs;

const getData = async () => {

    await fetch('http://localhost:8000/prices')
    .then(res => res.json())
    .then(data => merchPrices = data)
    .then(() => console.log(merchPrices));


    await fetch('http://localhost:8000/merchURLs')
    .then(res => res.json())
    .then(data => merchURLs = data)
    .then(() => console.log(merchURLs));

    console.log(merchPrices);
    console.log(merchURLs);

    generateTable();

  let merchArray = Object.values(merchURLs);
  console.log("merchArray: " + merchArray);


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
}

getData();