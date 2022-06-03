console.log(document.cookie.userAddress);

if (document.cookie.userAddress.id == undefined) {
    window.location.replace("/merch/merch.html");
}

//object data with merch images
let merchData = {
    "shirt" : "https://i.imgur.com/YXtHGMF.png",
    "hoodie" : "https://i.imgur.com/4A0QeJi.png"
}

let merchArray = Object.values(merchData);

console.log("merchArray: " + merchArray);

var selectedImages = [];
//makes a selectable list of merch images
const generateTable = () => {
    for(let i = 0; i < merchArray.length; i++){
        let imageContainer = document.getElementById("image-container");
        let image = imageContainer.appendChild(document.createElement("li"));
        image.innerHTML = "<li><input type=\"checkbox\" id=\"cb" + (i+1) + "\" /><label for=\"cb" +(i+1)+ "\"><img src=\"" + merchArray[i] +"\" /></label></li>";
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