window.addEventListener('load', listPotatoes);

function listPotatoes(){
    fetch("http://localhost:3000/potatoes").then((response) => {
    return response.json()
    }).then((potatoes) => {
        console.log(potatoes)
        let potatoListContainer = document.querySelector(".potatoList")
        potatoListContainer.innerHTML = ""
        potatoes.forEach(potato => {
            let potatoName = document.createElement("h2")
            potatoName.innerHTML = potato.name
            let potatoType = document.createElement("p")
            potatoType.innerHTML = "Typ: " + potato.potatoType
            let potatoColor = document.createElement("p")
            potatoColor.innerHTML = "Färg: " + potato.color
            let potatoImg = document.createElement("div")
            potatoImg.style.backgroundImage = `url("${potato.imgUrl}")`
            potatoImg.setAttribute("class", "potatoImage")
            
            let potatoDiv = document.createElement("div")
            potatoDiv.setAttribute("class", "potatoDiv")
            potatoDiv.setAttribute("class", "potatoDiv")
            potatoDiv.appendChild(potatoName) 
            potatoDiv.appendChild(potatoType)
            potatoDiv.appendChild(potatoColor)
            potatoDiv.appendChild(potatoImg)
            potatoListContainer.appendChild(potatoDiv)
        })
    })
}

document.querySelector(".findPotato").addEventListener("click", function(){
    const potatoID = document.querySelector(".potatoSearchBar").value

    fetch(`http://localhost:3000/potatoes/${potatoID}`).then((response) => {
        if(response.status === 404){
            printFoundPotato()
        } else {
            return response.json()
        }
        }).then((potatoes) => {
        printFoundPotato(potatoes)
     })
})

function printFoundPotato(potato){
    let foundPotatoContainer = document.querySelector(".foundPotato")
    foundPotatoContainer.innerHTML = ""

    if (potato) {
        let searchResult = document.createElement("h2")
        searchResult.innerText = "Sökresultat för: " + potato.id
        let potatoNameLabel = document.createElement("label")
        potatoNameLabel.setAttribute("for", "updatePotatoName")
        potatoNameLabel.innerHTML = "Namn: "
        let potatoNameInput = document.createElement("input")
        potatoNameInput.setAttribute("value", potato.name)
        potatoNameInput.setAttribute("id", "updatePotatoName")

        let potatoTypeLabel = document.createElement("label")
        potatoTypeLabel.setAttribute("for", "updatePotatoType")
        potatoTypeLabel.innerHTML = "Typ: "
        let potatoTypeInput = document.createElement("input")
        potatoTypeInput.setAttribute("value", potato.potatoType)
        potatoTypeInput.setAttribute("id", "updatePotatoType")
        
        let potatoColorLabel = document.createElement("label")
        potatoColorLabel.setAttribute("for", "updatePotatoColor")
        potatoColorLabel.innerHTML = "Färg: "
        let potatoColorInput = document.createElement("input")
        potatoColorInput.setAttribute("value", potato.color)
        potatoColorInput.setAttribute("id", "updatePotatoColor")

        let potatoImgUrlLabel = document.createElement("label")
        potatoImgUrlLabel.setAttribute("for", "updatePotatoImgUrl")
        potatoImgUrlLabel.innerHTML = "Bild Url: "
        let potatoImgUrlInput = document.createElement("input")
        potatoImgUrlInput.setAttribute("value", potato.imgUrl)
        potatoImgUrlInput.setAttribute("id", "updatePotatoImgUrl")

        let potatoImg = document.createElement("div")
        potatoImg.style.backgroundImage = `url("${potato.imgUrl}")`
        potatoImg.setAttribute("class", "potatoImage")
        let potatoRemoveButton = document.createElement("button")
        potatoRemoveButton.innerHTML = "Ta Bort"
        potatoRemoveButton.setAttribute("onClick", `removePotatoButton(${potato.id})`)
        let potatoChangeButton = document.createElement("button")
        potatoChangeButton.innerHTML = "Uppdatera"
        potatoChangeButton.setAttribute("onClick", `changePotatoButton(${potato.id})`)

        let potatoDiv = document.createElement("div")
        potatoDiv.setAttribute("class", "updatePotato")
        potatoDiv.appendChild(searchResult)
        potatoDiv.appendChild(potatoNameLabel)
        potatoDiv.appendChild(potatoNameInput)
        potatoDiv.appendChild(potatoTypeLabel)
        potatoDiv.appendChild(potatoTypeInput)
        potatoDiv.appendChild(potatoColorLabel)
        potatoDiv.appendChild(potatoColorInput)
        potatoDiv.appendChild(potatoImgUrlLabel)
        potatoDiv.appendChild(potatoImgUrlInput)
        potatoDiv.appendChild(potatoRemoveButton)
        potatoDiv.appendChild(potatoChangeButton)
        potatoDiv.appendChild(potatoImg)

        foundPotatoContainer.appendChild(potatoDiv)
    } else {
        let errorMessage = document.createElement("h2")
        errorMessage.innerText = "Den potatisen fanns inte..."
        foundPotatoContainer.appendChild(errorMessage)
    }
}
