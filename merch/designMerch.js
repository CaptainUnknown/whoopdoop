const parseCookie = str =>
str
.split(';')
.map(v => v.split('='))
.reduce((acc, v) => {
  acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
  return acc;
}, {});

const cookieObj = parseCookie(document.cookie);

var NFTs = cookieObj.NFTs;
console.log(NFTs);
var merchs = cookieObj.selectedMerch;
console.log(merchs);

var NFTs = ["https://ipfs.io/ipfs/QmVZqAEa8BUQd8qmTfXgZfzRdptzNFMEGxFr2Aifixe56V/1.png", "https://ipfs.io/ipfs/QmVZqAEa8BUQd8qmTfXgZfzRdptzNFMEGxFr2Aifixe56V/2.png"];
console.log(NFTs);
var merchs = ['https://picsum.photos/seed/2/100', 'https://picsum.photos/seed/1/100'];
console.log(merchs);
var count = 0; //current itterating image counter

let imageCounter = document.getElementById('currentItteratingCount')
imageCounter.innerHTML = "You are editing image " + (count+1) + " of " + merchs.length;

const updateImageDisplay = () => {
  if(count == merchs.length){
    window.location.replace("pay.html");
  }
  document.getElementById("canvas-img").src = merchs[count];
  document.getElementById("free-img").src = NFTs[count];
  count++;
}

//Checks whether the user is authenticated
//if (cookieObj.userAddress == undefined) {
  //window.location.replace("/merch/merch.html");
//}


//============================Image Generation================================
var generatedImages = [];
const freeImgContainer = document.querySelector('.free-img-container');
const freeImg = document.querySelector('#free-img');

const moveImg = (e) => {

    freeImgContainer.style.position = "absolute";
    
    const shiftX = e.clientX - freeImgContainer.getBoundingClientRect().left;
    const shiftY = e.clientY - freeImgContainer.getBoundingClientRect().top;
    const moveAt = (pageX, pageY) => {
        freeImgContainer.style.left = pageX-shiftX+'px';
        freeImgContainer.style.top = pageY-shiftY+'px';
      }  
      const onMouseMove = (e) => {
        if(e.target == document.querySelector("#free-img"))
          moveAt(e.pageX, e.pageY);
      }
    
      document.addEventListener('mousemove', onMouseMove);
      freeImgContainer.addEventListener("mouseup", () => {
        document.removeEventListener('mousemove', onMouseMove);
      });
      freeImgContainer.addEventListener("mouseexit", () => {
        document.removeEventListener('mousemove', onMouseMove);
      });
}

freeImg.addEventListener('mousedown', moveImg);

const takeshot = () => {
  const outputElm = document.getElementById('output');
  outputElm.innerHTML = "";
  html2canvas(screenshot, {allowTaint: true, useCORS: true}).then(
      (canvas) => {
          //outputElm.appendChild(canvas);
          link.style.display = 'inline';
          link.addEventListener('click', (ev) => {
            link.href = canvas.toDataURL();
            link.download = "My Merch.png";

            console.log(canvas.toDataURL());
            
            //let image = dataURLtoFile(canvas.toDataURL(), 'generated' + (count) + '.png');
             // upload(image);
            //  updateImageDisplay();
          }, false);
      });
}

const uploadShot = () => {
  const outputElm = document.getElementById('output');
  outputElm.innerHTML = "";
  html2canvas(screenshot, {allowTaint: true, useCORS: true}).then(
      (canvas) => {
        let dataURI = canvas.toDataURL();
        console.log(dataURI);
        let image = dataURLtoFile(canvas.toDataURL(), 'generated' + (count) + '.png');
        console.log(image);
        upload(image);
        updateImageDisplay();
      });
}

const screenshot = document.getElementById('canvas-container');
const screenshotBtn = document.getElementById('screenshot-btn');
screenshotBtn.addEventListener('click', takeshot);
var link = document.getElementById('dl-link');

updateImageDisplay();

/*
var canvasSrc = 'canvas.jpg';
var freeImgSrc = 'free.png';

document.getElementById('canvas-img').src = canvasSrc;
document.getElementById('free-img').src = freeImgSrc;
*/
//==========================================================================

let next = document.getElementById("btn-next");
next.addEventListener('click', () => {
  uploadShot();
  imageCounter.innerHTML = "You are editing image " + (count+1) + " of " + merchs.length;
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
        'Authorization': 'Bearer public_FW25ar69TXtVNNJie6Me8MCC25Rs'
    },
    body: image
  })
  .then((res) => res.json())
  .then((res) => {
    generatedImages.push(res.fileUrl);
    console.log(generatedImages);
  });
}

const storeGeneratedImages = () => {
  document.cookie = "GeneratedMerch=" + JSON.stringify(generatedImages);
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