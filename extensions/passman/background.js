var ary = [];
var inputs = document.querySelectorAll("input");

for (var i=0; i<inputs.length; i++){
    if(inputs[i].type.toLowerCase() === "password"){
        inputs[i-1].onchange = (e) => {
            console.log(e.target.value)
        }
        inputs[i].onchange = (e) => {
            console.log(e.target.value)

          chrome.runtime.onMessage.addListener((message, sender, response) => {
            // Do stuff in your document.
            document.body.style.backgroundColor = message.backgroundColor;
          });
        }
    }
    // else if(inputs[i].type.toLowerCase() === "password"){
    //     inputs[i].onchange = (e) => {
    //         console.log(e.target.value)
    //     }
    // }
}

// console.log(pass)
