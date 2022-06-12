const parseCookie = str =>
str
.split(';')
.map(v => v.split('='))
.reduce((acc, v) => {
  acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
  return acc;
}, {});

const cookieObj = parseCookie(document.cookie);
console.log(cookieObj);

console.log(cookieObj.selectedNFTs);
var NFTs = JSON.parse(cookieObj.selectedNFTs);
var merchs = JSON.parse(cookieObj.selectedMerch);
console.log(NFTs);
console.log(merchs);
var count = 0; //current itterating image counter

let imageCounter = document.getElementById('currentItteratingCount')
imageCounter.innerHTML = "You are editing image " + (count+1) + " of " + merchs.length;

const updateImageDisplay = () => {
  if(count == merchs.length){
    console.log("all NFTs done");
    window.location.replace("pay.html");
  }
  document.getElementById("canvas-img").src = merchs[count];
  document.getElementById("free-img").src = NFTs[count];
  count++;
}

const generateTable = () => {
  for(let i = 0; i < merchs.length; i++){
    let imageContainer = document.getElementById("curretSelector");
    let image = imageContainer.appendChild(document.createElement("li"));
    image.innerHTML = "<li><input type=\"checkbox\" class=\"radioCheck\" id=\"cb" + (i) + "\" /><label for=\"cb" +(i)+ "\"><img src=\"" + NFTs[i] +"\" /></label></li>";
    image.style.width = 05;
    let checkbox = document.getElementById("cb" + (i));
    checkbox.addEventListener( 'change', () => {
      count = 0;
      //only one checkbox at a time can be checked & can not be unchecked
      if(checkbox.checked){
        for(let j = 0; j < merchs.length; j++){
          if(j != i){
            let checkbox = document.getElementById("cb" + (j));
            checkbox.checked = false;
          }
        }
      }
      //are all checkboxes unchecked?
      if(checkbox.checked){
        for(let j = 0; j < merchs.length; j++){
          if(j != i){
            let checkbox = document.getElementById("cb" + (j));
            checkbox.checked = false;
          }
        }
      }
      updateImageDisplay();
    });
  }
}

generateTable();

//Checks whether the user is authenticated
if (cookieObj.userAddress == undefined) {
  window.location.replace("/merch/merch.html");
}


//============================Image Generation================================
var generatedImages = [];
const freeImgContainer = document.querySelector('.free-img-container');
const freeImg = document.querySelector('#free-img');

const position = { x: 0, y: 0 }

interact('.free-img-container').draggable({
  listeners: {
    start (event) {
      console.log(event.type, event.target)
    },
    move (event) {
      position.x += event.dx
      position.y += event.dy

      event.target.style.transform =
        `translate(${position.x}px, ${position.y}px)`
    },
  }
});
interact('#free-img').resizable({
  margin: 10,
  edges: { top: true, left: true, bottom: true, right: true },
  listeners: {
    move: function (event) {
      let { x, y } = event.target.dataset
      console.log(event.target.dataset)

      x = (parseFloat(x) || 0) + event.deltaRect.left
      y = (parseFloat(y) || 0) + event.deltaRect.top

      Object.assign(event.target.style, {
        width: `${event.rect.width}px`,
        height: `${event.rect.height}px`,
        transform: `translate(${x}px, ${y}px)`
      })

      Object.assign(event.target.dataset, { x, y })
    }
  },
  modifiers: [
    interact.modifiers.aspectRatio({ratio: 'preserve'})]
});

const screenshot = document.getElementById('canvas-container');
const screenshotBtn = document.getElementById('screenshot-btn');
var link = document.getElementById('screenshot-btn');

const takeshot = () => {
  html2canvas(screenshot, {allowTaint: true, useCORS: true}).then(
      (canvas) => {
          //link.style.display = 'inline';
          //link.addEventListener('click', (ev) => {
            //link.href = canvas.toDataURL();
            //link.download = "mycanvas.png";
            
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
  takeshot();
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
    updateImageDisplay();
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