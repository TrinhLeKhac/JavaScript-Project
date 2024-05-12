// Event listener attached to a button with the id "btn"
document.getElementById("btn").addEventListener("click", function () {
    // Get the value of the text input with the id "input-text"
    let txt = document.getElementById("input-text").value;
  
    // Call the checkPalindrome function with the input text
    checkPalindrome(txt);
});
  
// Function to check if a given text is a palindrome
function checkPalindrome(txt) {
    // Remove non-alphanumeric characters and convert to lowercase
    let txt_new = txt.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
  
    // Get the length of the modified text
    let len = txt_new.length;
  
    // Calculate the half-length of the text
    let halfLen = Math.floor(len / 2);
  
    // Get the result element by id
    let result = document.getElementById("result");
  
    // Loop through the first half of the text
    for (let i = 0; i < halfLen; i++) {
        // Check if the characters from the beginning and end match
        if (txt_new[i] !== txt_new[len - 1 - i]) {
            // If a mismatch is found, set the result text and return from the function
            result.textContent = "Nope! Not a palindrome";
            return;
        }
        // If no mismatch is found, set the result text to indicate it's a palindrome
        result.textContent = "Yes! It's a palindrome";
    }
}