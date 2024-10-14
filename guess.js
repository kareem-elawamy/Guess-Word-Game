// setting game name
let gameName = "Guess The Word"
document.title = gameName
document.querySelector("h1").innerHTML = gameName
document.querySelector("footer").innerHTML = `${gameName} Game Created By Kareem `
function guessword() {
    const lett = "abcdefghijklmnopqrstuvwxyz"
    return lett[Math.floor(Math.random() * lett.length)]
}
function randomWord() {
    let wordToGuess = ""
    for (let m = 0; m < numOfLeeters; m++)
        wordToGuess += guessword()
    return wordToGuess
}
// setting game Options
let numOfTries = 6;
let numOfLeeters = 6;
let currentTry = 1;
let massage = document.querySelector(".massage")
let numhint = 2
//let word = ["Creata", "Update", "Delete", "Master", "Branch", "Mainly", "Kareem", "Colors"]
//wordToGuess = word[Math.floor(Math.random() * word.length)].toLowerCase()
document.querySelector(".hint span").innerHTML = numhint
let renGuess = randomWord()
console.log(renGuess)
function generateInput() {
    const inpput = document.querySelector(".inputs")
    for (let i = 1; i <= numOfTries; i++) {
        const divin = document.createElement("div")
        divin.classList.add(`try-${i}`)
        divin.innerHTML = `<span>Try ${i}</span>`
        if (i !== 1) {
            divin.classList.add("notac")
        }
        for (let j = 1; j <= numOfLeeters; j++) {
            const input = document.createElement("input")
            input.type = "text"
            input.id = `guess-${i}-letter-${j}`
            input.setAttribute("maxlength", "1")
            divin.appendChild(input)

        }
        inpput.appendChild(divin)

    }
    inpput.children[0].children[1].focus();
    const inputsInDisabledDiv = document.querySelectorAll(".notac input")
    inputsInDisabledDiv.forEach((inpput) => {
        inpput.disabled = true
    })
    const inputs = document.querySelectorAll("input")
    inputs.forEach((input, index) => {
        input.addEventListener("input", function () {
            this.value = this.value.toLowerCase()
            // console.log(index)
            const nextInput = inputs[index + 1]
            if (nextInput) nextInput.focus()
        })
        input.addEventListener("keydown", function (event) {
            // console.log(event)
            const currentIndex = Array.from(inputs).indexOf(event.target)
            if (event.key === "ArrowRight") {
                const nextInput = currentIndex + 1
                if (nextInput < inputs.length) inputs[nextInput].focus()
            }
            if (event.key === "ArrowLeft") {
                const prevInput = currentIndex - 1
                if (prevInput >= 0) inputs[prevInput].focus()
            }

        })
    })
    const hintButton = document.querySelector(".hint")
    hintButton.addEventListener("click", gethint)
    function gethint() {
        if (numhint > 0) {
            numhint--

            document.querySelector(".hint span").innerHTML = numhint
        }
        if (numhint === 0) {
            hintButton.disabled = true

        }
        const eninput = document.querySelectorAll("input:not([disabled])")
        const empty = Array.from(eninput).filter((input) => input.value === "")
        if (empty.length > 0) {
            const random = Math.floor(Math.random() * empty.length)
            const randomInput = empty[random]
            const indexToFill = Array.from(eninput).indexOf(randomInput)
            if (indexToFill !== -1) {
                randomInput.value = renGuess[indexToFill].toLowerCase()
            }
        }
    }
    console.log(renGuess)
    const checkButton = document.querySelector(".check")
    checkButton.addEventListener("click", hendleGuesse)
    function hendleGuesse() {
        let successGuess = true;
        for (let i = 1; i <= numOfLeeters; i++) {
            const inputField = document.querySelector(`#guess-${currentTry}-letter-${i}`)
            const letter = inputField.value.toLowerCase()
            // console.log(letter)
            const actualLetter = renGuess[i - 1]
            if (letter === actualLetter) {
                inputField.classList.add("in-place")
            } else if (renGuess.includes(letter) && letter !== "") {
                inputField.classList.add("not-in")
                successGuess = false
            } else {
                inputField.classList.add("no")
                successGuess = false
            }

        }
        if (successGuess === true) {
            massage.innerHTML = `You Win After<span>${currentTry} tries</span>`
            if (numhint === 2) {
                massage.innerHTML = `<p>Congratulations you won without using a hint.</p>`
            }
            if (currentTry === 1 && numhint === 2) {
                massage.innerHTML = `<p>Congratulations, you won without using a hint and the first time.</p>`

            }
            let allTries = document.querySelectorAll(".inputs > div")
            allTries.forEach((divin) => divin.classList.add("notac"))
            checkButton.disabled = true
            hintButton.disabled = true
        } else {
            document.querySelector(`.try-${currentTry}`).classList.add("notac")
            const currentTryin = document.querySelectorAll(`.try-${currentTry} input`)
            currentTryin.forEach((input) => (input.disabled = true))
            currentTry++;
            const nextTry = document.querySelectorAll(`.try-${currentTry} input`)
            nextTry.forEach((inn) => (inn.disabled = false))
            let el = document.querySelector(`.try-${currentTry}`)
            if (el) {
                document.querySelector(`.try-${currentTry}`).classList.remove("notac")
                el.children[1].focus()
            } else {
                checkButton.disabled =
                    hintButton.disabled = true
                massage.innerHTML = `You Lose The Word Is <span>${renGuess}</span>Refresh and try again `
            }



        }
    }
}
function handleBacksace(event) {
    if (event.key === "Backspace") {
        const input = document.querySelectorAll("input:not([disabled])")
        const currentIndex = Array.from(input).indexOf(document.activeElement)
        if (currentIndex > 0) {
            const currentinput = input[currentIndex]
            const pre = input[currentIndex - 1]
            currentinput.value = ""
            pre.value = ""
            pre.focus();

        }
    }

}

document.addEventListener("keydown", handleBacksace)
window.onload = function () {
    generateInput()
}
