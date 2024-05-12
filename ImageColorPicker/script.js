// Initial references to DOM elements
let pickColor = document.getElementById("pick-color");
let error = document.getElementById("error");
let fileInput = document.getElementById("file");
let image = document.getElementById("image");
let hexValRef = document.getElementById("hex-val-ref");
let rgbValRef = document.getElementById("rgb-val-ref");
let customAlert = document.getElementById("custom-alert");
let pickedColorRef = document.getElementById("picked-color-ref");
let eyeDropper;

// Function executed when the window loads
window.onload = () => {
  // Check if the browser supports the EyeDropper API
  if ("EyeDropper" in window) {
    // If supported, remove hide class from pickColor element
    pickColor.classList.remove("hide");
    // Create a new EyeDropper object
    eyeDropper = new EyeDropper();
  } else {
    // If not supported, display error message and hide pickColor element
    error.classList.remove("hide");
    error.innerText = "Your browser doesn't support Eyedropper API";
    pickColor.classList.add("hide");
    return false; // exit function
  }
};

// Function to handle color selection using EyeDropper
const colorSelector = async () => {
  const color = await eyeDropper
    .open()
    .then((colorValue) => {
      error.classList.add("hide"); // Hide error message if any
      // Get the hex color code
      let hexValue = colorValue.sRGBHex;
      // Convert Hex Value To RGB
      let rgbArr = [];
      for (let i = 1; i < hexValue.length; i += 2) {
        rgbArr.push(parseInt(hexValue[i] + hexValue[i + 1], 16));
        console.log(rgbArr);
      }
      let rgbValue = "rgb(" + rgbArr + ")";
      console.log(hexValue, rgbValue);
      // Display color information
      result.style.display = "grid";
      hexValRef.value = hexValue;
      rgbValRef.value = rgbValue;
      pickedColorRef.style.backgroundColor = hexValue;
    })
    .catch((err) => {
      error.classList.remove("hide"); // Show error message
      // If user closes the eyedropper using escape key
      if (err.toString().includes("AbortError")) {
        error.innerText = "";
      } else {
        error.innerText = err;
      }
    });
};

// Event listener for pickColor button click
pickColor.addEventListener("click", colorSelector);

// Allow user to choose image of their own choice
fileInput.onchange = () => {
  result.style.display = "none"; // Hide result
  let reader = new FileReader(); // Create a FileReader object
  reader.readAsDataURL(fileInput.files[0]); // Read the contents of the file
  reader.onload = () => {
    image.setAttribute("src", reader.result); // Set image src attribute
  };
};

// Function to copy the color code
let copy = (textId) => {
  document.getElementById(textId).select(); // Select the text in the input element
  document.execCommand("copy"); // Copy the selected text to clipboard
  // Display alert
  customAlert.style.transform = "scale(1)";
  setTimeout(() => {
    customAlert.style.transform = "scale(0)";
  }, 2000); // Hide alert after 2 seconds
};