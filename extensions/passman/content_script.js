// Put all the javascript code here, that you want to execute after page load.

inputs = document.getElementsByTagName('INPUT');

// Iterate over the form controls
for (i = 0; i < inputs.length; i++) {
  // Disable all form controls
  inputs[i].setAttribute("disabled", "");
}

