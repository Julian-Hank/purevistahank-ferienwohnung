function nextImg(){
  let currentImg = document.getElementById('currentImg');
  document.getElementById('currentImg').id = "";
  let nextImageElement = currentImg.nextElementSibling;
  if (nextImageElement.id != "") {
    nextImageElement = currentImg.parentElement.firstElementChild.nextElementSibling;
  }
  nextImageElement.id = 'currentImg';
  clearInterval(imageSwapInterval);
  imageSwapInterval = setInterval(nextImg, 5000);
}

function prevImg(){
  let currentImg = document.getElementById('currentImg');
  document.getElementById('currentImg').id = "";
  let nextImageElement = currentImg.previousElementSibling;
  if (nextImageElement.id != "") {
    nextImageElement = currentImg.parentElement.lastElementChild.previousElementSibling;
  }
  nextImageElement.id = 'currentImg';
  clearInterval(imageSwapInterval);
  imageSwapInterval = setInterval(nextImg, 5000);
}

let imageSwapInterval = setInterval(nextImg, 5000);

const images = document.getElementsByClassName("displayedImg");

for (let i = 0; i < images.length; i++){
  images[i].addEventListener('click', function(){
    clearInterval(imageSwapInterval)
    let overlay = document.createElement("div");
    overlay.id = "overlay";
    overlay.addEventListener('click', function(){
      img.style.scale = 0;
      overlay.style.opacity = 0;
      overlay.addEventListener('transitionend', function(){
        overlay.remove();
      });
      imageSwapInterval = setInterval(nextImg, 5000);
    });
    let img = document.createElement("img");
    img.id = "overlayImg";
    img.src = this.src;
    overlay.appendChild(img);
    document.body.appendChild(overlay);
    setTimeout(function(){
      overlay.style.opacity = 1;
      img.style.scale = 1;
    },10);
  });
}



// document.getElementById("sw").innerHTML += " " + screen.width + "px";