// Variables to store the initial mouse coordinates
let mouseX = 0;
let mouseY = 0;

// Get the reference to the flashlight element by its ID
let flashlight = document.getElementById("flashlight");

// Function to check if the device supports touch events
const isTouchEvent = () => {
  try {
    document.createEvent("TouchEvent");
    return true;
  } catch (e) {
    return false;
  }
};

// Function to get the mouse or touch position and update the flashlight position
function getMousePosition(e) {
  // Determine the appropriate coordinates based on the device type (mouse or touch)
  mouseX = !isTouchEvent() ? e.pageX : e.touches[0].pageX;
  mouseY = !isTouchEvent() ? e.pageY : e.touches[0].pageY;

  // Set the custom properties in the CSS for the flashlight position
  flashlight.style.setProperty("--Xpos", mouseX + "px");
  flashlight.style.setProperty("--Ypos", mouseY + "px");
}

// Event listeners to call the getMousePosition function on mouse and touch movements
document.addEventListener("mousemove", getMousePosition);
document.addEventListener("touchmove", getMousePosition);