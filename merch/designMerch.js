/*
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
*/

var NFTs = ["https://ipfs.io/ipfs/QmVZqAEa8BUQd8qmTfXgZfzRdptzNFMEGxFr2Aifixe56V/1.png", "https://ipfs.io/ipfs/QmVZqAEa8BUQd8qmTfXgZfzRdptzNFMEGxFr2Aifixe56V/2.png"];
console.log(NFTs);
var merchs = ['https://picsum.photos/seed/2/100', 'https://i.imgur.com/4A0QeJi.png'];
console.log(merchs);
var count = 0; //current itterating image counter

const updateImageDisplay = () => {
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
  html2canvas(screenshot).then(
      (canvas) => {
          //outputElm.appendChild(canvas);
          link.style.display = 'inline';
          link.addEventListener('click', (ev) => {
            link.href = canvas.toDataURL();
            link.download = "mycanvas.png";
            
            let image = base64ToBlob(canvas.toDataURL());
            upload(image);
            updateImageDisplay();
          }, false);
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

let next3 = document.getElementById("btn-merchDesigned");
next3.addEventListener('click', () => {
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
  });
}

const storeGeneratedImages = () => {
  document.cookie = "GeneratedMerch=" + JSON.stringify(generatedImages);
}


//Convert base64 to blob
const base64ToBlob = (base64) => {
  const byteString = atob(base64);
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const int8Array = new Uint8Array(arrayBuffer);
  for (let i = 0; i < byteString.length; i++) {
    int8Array[i] = byteString.charCodeAt(i);
  }
  return new Blob([int8Array], { type: 'image/png' });
}