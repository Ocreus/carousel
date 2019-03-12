let img = document.querySelector(".container img");
let container = document.querySelector(".image");
let rect = img.getBoundingClientRect();
let centerW = rect.right - (rect.width / 2);
let centerH = rect.bottom - (rect.height /  2);

//test function
const all = (event)=> {
    console.log(event.pageY - centerH);
}
//  rotate face.svg (First image)
const rotateImg = (event) => {
  const w = (event.pageX - centerW) * 0.1;
  const y = (event.pageY - centerH) * -0.1;
  img.style.transform = "rotateY("+w+"deg) rotateX("+y+"deg)"; 
};
const standardImg = (event) => {
    img.style.transform = "rotateY(0deg) rotateX(0deg)"
}
//eventListener for image rotation
container.addEventListener("mousemove", rotateImg);
container.addEventListener("mouseout", standardImg);


// Images

const labels = document.querySelectorAll(".label label");
const arrayLabel = Array.from(labels);
// const loadImg = (x)=> {
//   if(x.target.getAttribute("style") != "background-color: black;"){
//     //var
//     const nodeList = Array.from(x.target.parentElement.children);
//     //reset color
//     nodeList.forEach((item,index,array) => {item.style.backgroundColor = "whitesmoke";});
//     //change target color
//     x.target.style.backgroundColor = "black";
//     //load image
//     request(nodeList.indexOf(x.target));
//   } else {
//     return;
//   }
// }
//      DOESNT WORK

//prevBTN and nextBtn

btns = document.querySelectorAll(".btn");
Array.from(btns).forEach((item) => item.addEventListener("click",imageSlider));


// other functions and eventlistener for the dots

let prevIndex = 0;

arrayLabel.forEach((item) => item.addEventListener("click", imageSlider));

function imageSlider() {
  if(this.style.backgroundColor == "black"){
    return;
  } else {
    const value = this.value;
    if(value === "prevBtn") {
      prevIndex--;
      if(prevIndex <= 0) {
        prevIndex = 5;
        loadImage(prevIndex);
      } else {
        loadImage(prevIndex);
      }
    }
    else if(value === "nextBtn") {
      prevIndex++;
      if(prevIndex >= 6 ) {
        prevIndex = 1;
        loadImage(prevIndex);
      } else {
        loadImage(prevIndex);
      }
    }
    else if(this.className == "dotsJs") {
      prevIndex = (arrayLabel.indexOf(this)) + 1;
      loadImage(prevIndex);
    }
    setDots(prevIndex - 1);
  }
}

function setDots(index) {
  arrayLabel.forEach(item => item.style.backgroundColor = "whitesmoke");
  arrayLabel[index].style.backgroundColor = "black";
}
function loadImage(index) {
  let xhttp;
  if(window.XMLHttpRequest)
    {xhttp = new XMLHttpRequest();}
  else  
    {xhttp = new ActiveXObject("Microsoft.XMLHTTP");}

  xhttp.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200){
      text = JSON.parse(xhttp.responseText);
      const img = "img" + (index);
      const element = document.querySelector(".image img");
      element.animate([{opacity:0.1},{opacity:1.0}],{duration:1500,fill:"forwards"})
      element.setAttribute("src", text[img]);
    }
  }
  
  
  xhttp.open("GET", "img.json", true);
  xhttp.send();
}

