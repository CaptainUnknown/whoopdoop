//Checks whether the user is authenticated
if (document.cookie.userAddress == undefined) {
  //window.location.replace("/merch/merch.html");
}

//============================Image Generation================================
const freeImgContainer = document.querySelector('.free-img-container');
const freeImg = document.querySelector('#free-img');

freeImg.addEventListener('mousedown', moveImg);

const moveImg = (e) => {
    
    const shiftX = e.pageX - freeImgContainer.getBoundingClientRect().left;
    const shiftY = e.pageY - freeImgContainer.getBoundingClientRect().top;
    function moveAt(pageX, pageY) {
        //freeImg.style.left = pageX-shiftX-10+'px';
        //freeImg.style.top = pageY-shiftY-35+'px';
        freeImgContainer.style.left = pageX-shiftX+'px';
        freeImgContainer.style.top = pageY-shiftY+'px';
      }
    
     // moveAt(e.pageX, e.pageY);
  
      function onMouseMove(e) {
        if(e.target == document.querySelector("#free-img"))
          moveAt(e.pageX, e.pageY);
      }
    
      document.addEventListener('mousemove', onMouseMove);
      freeImgContainer.addEventListener("mouseup", function() {
        document.removeEventListener('mousemove', onMouseMove);
      });
}

const screenshot = document.getElementById('canvas-container');
const screenshotBtn = document.getElementById('screenshot-btn');
screenshotBtn.addEventListener('click', takeshot);
var link = document.getElementById('dl-link');

const takeshot = () => {
    const outputElm = document.getElementById('output');
    outputElm.innerHTML = "";
    html2canvas(screenshot).then(
        function (canvas) {
            //outputElm.appendChild(canvas);
            link.style.display = 'inline';
            link.addEventListener('click', function(ev) {
                link.href = canvas.toDataURL();
                link.download = "mycanvas.png";
            }, false);
        });
}

/*
const imgRo = new ResizeObserver((entries) => {
  entries.forEach(entry => {
    //if(entry.target == freeImgContainer)
    {
      console.log(freeImg.offsetHeight);
      
      freeImgContainer.style = 'height: "max-content"';
      freeImgContainer.style.width = freeImg.offsetWidth+'px';
    }

  }); 
});
imgRo.observe(freeImgContainer);
*/

var canvasSrc = 'canvas.jpg';
var freeImgSrc = 'free.png';

document.getElementById('canvas-img').src = canvasSrc;
document.getElementById('free-img').src = freeImgSrc;

//==========================================================================