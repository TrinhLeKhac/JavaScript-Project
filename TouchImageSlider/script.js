
const sliderContainer = document.querySelector(".container");
const innerSlider = document.querySelector(".slider-inner");
let innerContainer = innerSlider.getBoundingClientRect();
let outerContainer = sliderContainer.getBoundingClientRect();

//Slider variables
let active = false,
  startX = 0;

const images = [
  "./images/slider-img-1-1024x683.jpeg",
  "./images/slider-img-2-1024x683.jpeg",
  "./images/slider-img-3-1024x683.jpeg",
  "./images/slider-img-4-1024x683.jpeg",
  "./images/slider-img-5-1024x683.jpeg",
  "./images/slider-img-6-1024x683.jpeg",
  "./images/slider-img-7-1024x683.jpeg",
];

let events = {
  mouse: {
    down: "mousedown",
    move: "mousemove",
    up: "mouseup",
  },
  touch: {
    down: "touchstart",
    move: "touchmove",
    up: "touchend",
  },
};

let deviceType = "";

const isTouchDevice = () => {
  try {
    document.createEvent("TouchEvent");
    deviceType = "touch";
    return true;
  } catch (e) {
    deviceType = "mouse";
    return false;
  }
};

//Generates Slides
const slideGenerator = () => {
  for (let i of images) {
    const div = document.createElement("div");
    div.classList.add("slide");
    div.innerHTML = `<img src='${i}' class='image'>`;
    innerSlider.appendChild(div);
  }
  innerSlider.style.gridTemplateColumns = `repeat(${images.length},1fr)`;
};

isTouchDevice();

//Mousedown
sliderContainer.addEventListener(events[deviceType].down, (e) => {
  active = true;
  startX =
    (!isTouchDevice()
      ? e.clientX
      : e.touches[0].clientX - outerContainer.left) - innerSlider.offsetLeft;
  sliderContainer.style.cursor = "grabbing";
});

//Mouseup
sliderContainer.addEventListener(events[deviceType].up, () => {
  sliderContainer.style.cursor = "grab";
  active = false;
});

//MouseMove
sliderContainer.addEventListener(events[deviceType].move, (e) => {
  if (active) {
    e.preventDefault();
    let currentX = !isTouchDevice()
      ? e.clientX
      : e.touches[0].clientX - outerContainer.left;
    innerSlider.style.left = `${currentX - startX}px`;
    checkBoundary();
  }
});

const checkBoundary = () => {
  innerContainer = innerSlider.getBoundingClientRect();
  outerContainer = sliderContainer.getBoundingClientRect();
  if (parseInt(innerSlider.style.left) >= 0) {
    innerSlider.style.left = "0px";
  } else if (innerContainer.right < outerContainer.right) {
    innerSlider.style.left = `-${
      innerContainer.width - outerContainer.width
    }px`;
  }
};

window.onload = () => {
  slideGenerator();
};