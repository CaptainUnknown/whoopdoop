const parseCookie = str =>
str
.split(';')
.map(v => v.split('='))
.reduce((acc, v) => {
  acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
  return acc;
}, {});


const addLoader = () => {
  let loader = document.getElementById("loader");
  loader.style.visibility = "visible";
}

const removeLoader = () => {
  let loader = document.getElementById("loader");
  loader.style.visibility = "hidden";
}

addLoader();

const cookieObj = parseCookie(document.cookie);
console.log(cookieObj);

//Checks whether the user is authenticated
if (cookieObj.userAddress == undefined) {
  window.location.replace("/merch/merch.html");
}

console.log(cookieObj.selectedNFTs);
var NFTs = JSON.parse(cookieObj.selectedNFTs);
var merchs = JSON.parse(cookieObj.selectedMerch);

console.log(NFTs);
console.log(merchs);
var merchCount = 0; //current itterating image counter
var NFTCount = 0;

let imageCounter = document.getElementById('currentItteratingCount')
imageCounter.innerHTML = "You are editing image " + (merchCount+1) + " of " + merchs.length;

const updateImageDisplay = () => {
  if(merchCount == merchs.length){
    console.log("all NFTs done");
    window.location.replace("pay.html");
  }
  if(NFTCount == NFTs.length){
    NFTCount--;
    console.log("NFT Count decrease: " + NFTCount);
  }
  document.getElementById("canvas-img").src = merchs[merchCount];
  document.getElementById("free-img").src = NFTs[NFTCount];
  merchCount++;
  console.log("merch count increased: " + merchCount);
  NFTCount++;
  console.log("NFTCount increased: " + NFTCount);

  updateCanvas();
}

const goBackImageDisplay = () => {
  if(merchCount != 0){
    //NFTCount--;
    //console.log("NFT Count decrease: " + NFTCount);
    merchCount--;
    console.log("merch count decreased: " + merchCount);
  }
  document.getElementById("canvas-img").src = merchs[merchCount];
  document.getElementById("free-img").src = NFTs[NFTCount];
}

const generateTable = () => {
  for(let i = 0; i < NFTs.length - 1; i++){
    let imageContainer = document.getElementById("curretSelector");
    let image = imageContainer.appendChild(document.createElement("li"));
    image.innerHTML = "<li><input type=\"checkbox\" class=\"radioCheck\" id=\"cb" + (i) + "\" /><label for=\"cb" +(i)+ "\"><img src=\"" + NFTs[i] +"\" /></label></li>";
    image.style.width = 05;
    let checkbox = document.getElementById("cb" + (i));
    checkbox.addEventListener( 'change', () => {
      //only one checkbox at a time can be checked & can not be unchecked
      if(merchs.length > 1){
        if(checkbox.checked){
          for(let j = 0; j < merchs.length; j++){
            if(j != i){
              //let checkbox = document.getElementById("cb" + (j));
              checkbox.checked = false;
            }
          }
        }
        //are all checkboxes unchecked?
        if(checkbox.checked){
          for(let j = 0; j < merchs.length; j++){
            if(j != i){
              //let checkbox = document.getElementById("cb" + (j));
              checkbox.checked = false;
            }
          }
        }
      }
      //updateImageDisplay();
      //document.getElementById("free-img").src = NFTs[i];
    });
  }
}

generateTable();


//============================Image Generation================================
var generatedImages = [];
const freeImgContainer = document.querySelector('.free-img-container');
const freeImg = document.querySelector('#free-img');
const position = { x: 0, y: 0 }

const fabricCanvas = new fabric.Canvas('fabric-canvas');
fabricCanvas.setDimensions({width: 400, height: 750});

const updateCanvas = () => {
  fabricCanvas.remove(...fabricCanvas.getObjects());
  freeImg.onload = () =>{
    freeImg.setAttribute('crossorigin', 'anonymous');
    var imgInstance = new fabric.Image(freeImg,
      { top: 50,
        left: 10,
        cornerColor: "white",
        crossOrigin: 'anonymous'});
    imgInstance.scaleToWidth(150, false);
    fabricCanvas.add(imgInstance);
  }
}

const screenshot = document.getElementById('canvas-container');
const screenshotBtn = document.getElementById('screenshot-btn');
//var link = document.getElementById('screenshot-btn');

const takeshot = () => {
  html2canvas(screenshot, {allowTaint: true, useCORS: true}).then(
      (canvas) => {
          //link.style.display = 'inline';
          //link.addEventListener('click', (ev) => {
            //link.href = canvas.toDataURL();
            //link.download = "mycanvas.png";
            console.log(canvas.toDataURL());
            
            let image = dataURLtoFile(canvas.toDataURL());
            upload(image);
          }, false);
      //});
}
//screenshotBtn.addEventListener('click', takeshot);

updateImageDisplay();

//==========================================================================

let next = document.getElementById("btn-next");

next.addEventListener('click', () => {
  addLoader();
  setTimeout(() => {
    takeshot();
    console.log("next returned");
    imageCounter.innerHTML = "You are editing image " + (merchCount+1) + " of " + merchs.length;
    //updateImageDisplay();
    removeLoader();
  }, 1000);
});

let back = document.getElementById("btn-back");
back.addEventListener('click', () => {
  console.log("back clicked");
  addLoader();
  setTimeout(() => {
    goBackImageDisplay();
    imageCounter.innerHTML = "You are editing image " + (merchCount+1) + " of " + merchs.length;
    removeLoader();
  }, 1000);
});

let complete = document.getElementById("btn-merchDesigned");
complete.addEventListener('click', () => {
  storeGeneratedImages();
  window.location.replace("pay.html");
});

const upload = async (image) => {
  fetch('https://api.upload.io/v1/files/basic', {
    method: 'POST',
    headers: {
        'Content-Type': 'image/jpeg',
        'Authorization': 'Bearer public_kW15asK6YxingEreFbvLmh38XKNq'
    },
    body: image
  })
  .then((res) => res.json())
  .then((res) => {
    generatedImages.push(res.fileUrl);
    console.log(generatedImages);
    updateImageDisplay();
  });
}

const storeGeneratedImages = () => {
  document.cookie = "generatedMerch=" + JSON.stringify(generatedImages);
}

//Fix conversion of base64 to blob
function dataURLtoFile(dataurl, filename) {
 
  var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), 
      n = bstr.length, 
      u8arr = new Uint8Array(n);
      
  while(n--){
      u8arr[n] = bstr.charCodeAt(n);
  }
  
  return new File([u8arr], filename, {type:mime});
}

removeLoader();
