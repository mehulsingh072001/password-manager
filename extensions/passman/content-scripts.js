// console.log(pass)
function card(email, password) {
    const card = document.createElement("DIV")
    card.classList.add('card') 
    document.body.appendChild(card)

    card.style.position = "absolute"
    card.style.width = "200px"
    card.style.height = "200px"
    card.style.left = "88%"
    card.style.top = "0%"
    card.style.backgroundColor = "red"

    const form = document.createElement("FORM")
    form.classList.add('form')
    card.appendChild(form)
    form.style.position = "absolute"

    //Email Input
    const emailInput = document.createElement("INPUT")
    emailInput.type = "email"
    emailInput.placeholder = "Email"
    emailInput.classList.add('email')
    emailInput.value = email
    emailInput.innerText = email
    form.appendChild(emailInput)

    //Password Input
    const passwordInput = document.createElement("INPUT")
    passwordInput.type = "password"
    passwordInput.placeholder = "Password"
    passwordInput.classList.add('password')
    passwordInput.value = password
    passwordInput.innerText = password
    form.appendChild(passwordInput)

    const submitBtn = document.createElement("BUTTON")
    submitBtn.innerText = "Submit"
    submitBtn.addEventListener("click", function(e){
        e.preventDefault()
        console.log(email, password)
    })
    form.appendChild(submitBtn)
}

var ary = [];
var inputs = document.querySelectorAll("input");

for (var i=0; i<inputs.length; i++){
    if(inputs[i].type.toLowerCase() === "password"){
        let pass
        let em
        inputs[i-1].onchange = (e) => {
            console.log(e.target.value)
            em = e.target.value
        }
        inputs[i].onchange = (e) => {
            console.log(e.target.value)
            pass = e.target.value
            card(em, pass)
        }
    }
    // else if(inputs[i].type.toLowerCase() === "password"){
    //     inputs[i].onchange = (e) => {
    //         console.log(e.target.value)
    //     }
    // }
}
