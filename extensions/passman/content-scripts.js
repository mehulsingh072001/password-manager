function card() {
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
    form.appendChild(emailInput)

    //Email Input
    const passwordInput = document.createElement("INPUT")
    passwordInput.type = "password"
    passwordInput.placeholder = "Password"
    passwordInput.classList.add('password')
    form.appendChild(passwordInput)
}


card()
