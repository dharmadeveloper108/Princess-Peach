const holographicElement = document.querySelector(".holographic");
const title = document.querySelector(".title");
const scrollContent = document.querySelector('.scroll-up');
const innerMirror = document.querySelector('.content3'); 
const buttonShow = document.querySelector('.show-btn');
const holo2 = document.querySelector('.holographic2');

const modal = document.getElementById("one-last-thing");
const lastBtn = document.getElementById("last-btn");
const closeX = document.getElementsByClassName("close")[0];

function updateHolographicBackground(valueX, valueY) {
  const percentageX = valueX;
  const percentageY = valueY * 2.5;
  holographicElement.style.backgroundPositionX = `${percentageX}px`;
  holographicElement.style.backgroundPositionY = `${percentageY}px`;

  holo2.style.backgroundPositionX = `${percentageX * 5}px`;
  holo2.style.backgroundPositionY = `${percentageY * 5}px`;
}

function handleMouseMove(event) {
  const x = event.clientX;
  const y =  event.clientY;
  const width = document.documentElement.clientWidth;
  const height = document.documentElement.clientHeight;
  const valueX = (x / width) * 25;
  const valueY = (y / height) * 50;
  updateHolographicBackground(valueX, valueY);
}

function handleOrientation(event) {
    var x = event.beta;  // In degree in the range [-180,180)
    var y = event.gamma; // In degree in the range [-90,90)
  
    // Because we don't want to have the device upside down
    // We constrain the x value to the range [-90,90]
    if (x >  90) { x =  90};
    if (x < -90) { x = -90};
  
    // To make computation easier we shift the range of
    // x and y to [0,180]
    x += 90;
    y += 90;
  
    updateHolographicBackground(x, y);
}

// Safari compatibility
function requestOrientationPermission(){
  DeviceOrientationEvent.requestPermission()
  .then(response => {
      if (response == 'granted') {
        window.addEventListener('deviceorientation', handleOrientation);
      }
  })
  .catch(console.error)
}

window.addEventListener('deviceorientation', handleOrientation);

document.getElementById('main').addEventListener('click', function() {
  requestOrientationPermission();
})

document.addEventListener("DOMContentLoaded", requestOrientationPermission);

function displayImages() {
  images.forEach((img, i) => {
    let image = document.createElement('img');
    image.src = img.link;
    image.alt = img.author;
    image.classList.add("illustr");
    image.setAttribute("loading", "lazy"); 

    let descr = document.createElement('span');
    descr.classList.add("photodescr");

    if(i % 2 == 1) {
      descr.setAttribute("style", "text-align: right;");
    } else {
      descr.setAttribute("style", "text-align: left;");
    }
    image.setAttribute("data-aos", "fade-up"); 
   
    descr.textContent = `by ${img.author}`;
    document.querySelector('.grid').appendChild(image)
    document.querySelector('.grid').appendChild(descr)
  })
}

displayImages();

buttonShow.addEventListener('click', function() {
  innerMirror.classList.add('mirror');
  holo2.classList.add('holovisible');
  document.querySelector('.message').classList.add('invisible');
  buttonShow.classList.add('invisible');
  document.getElementById('last-btn').classList.remove('invisible');
  document.getElementById('last-btn').classList.add('visible');
});

// modal
lastBtn.onclick = function() {
  modal.style.display = "block";
}
closeX.onclick = function() {
  modal.style.display = "none";
}
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
} 

const responseMess = document.getElementById("response");
document.getElementById("no").checked = false;
document.getElementById("yes").checked = false;

function clickYes() {
	if (document.getElementById("no").checked) {
		document.getElementById("no").checked = false;
	}
  responseMess.innerHTML = "Wow, awesome! You can write me an email if you want! My email: dharmadeveloper108@gmail.com"
}

function clickNo() {
	if (document.getElementById("yes").checked) {
		document.getElementById("yes").checked = false;
	}
  responseMess.innerHTML = " Oh ok, no worries! If you ever change your mind, you can write me and email: dharmadeveloper108@gmail.com"
}

document.getElementById("yes").onchange = clickYes;
document.getElementById("no").onchange = clickNo;