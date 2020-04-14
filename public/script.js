fetch("http://localhost:3000/potatoes").then((response) => {
    return response.json()
}).then((potatoes) => {
    listPotatoes(potatoes)
})


function listPotatoes(potatoes){
    let potatoListContainer = document.querySelector(".potatoList")

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
        potatoDiv.appendChild(potatoName)
        potatoDiv.appendChild(potatoType)
        potatoDiv.appendChild(potatoColor)
        potatoDiv.appendChild(potatoImg)
        potatoListContainer.appendChild(potatoDiv)
    });
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
        potatoDiv.appendChild(searchResult)
        potatoDiv.appendChild(potatoName)
        potatoDiv.appendChild(potatoType)
        potatoDiv.appendChild(potatoColor)
        potatoDiv.appendChild(potatoImg)

        foundPotatoContainer.appendChild(potatoDiv)
    } else {
        let errorMessage = document.createElement("h2")
        errorMessage.innerText = "Den potatisen fanns inte..."
        foundPotatoContainer.appendChild(errorMessage)
    }
}


document.querySelector(".addPotato").addEventListener("click", function(){
    let addPotatoName = document.getElementById("addPotatoName").value
    let addPotatoType = document.getElementById("addPotatoType").value
    let addPotatoColor = document.getElementById("addPotatoColor").value
    let addPotatoImgUrl = document.getElementById("addPotatoImgUrl").value
    let userMessage = document.querySelector(".userMessage")
    if (addPotatoName === "" ||
        addPotatoType === "" ||
        addPotatoColor === ""
    ){
        return userMessage.innerHTML = "Din potatis saknar namn, typ och/eller färg"
    }

    if (addPotatoImgUrl === "") {
        addPotatoImgUrl = "https://www.worldanvil.com/uploads/images/18e110943b57da2ca398dcdf7df96817.png"
    }

    fetch("http://localhost:3000/potatoes").then((response) => {
        return response.json()
    }).then((potatoes) => {
        let allIDs = []
        let newID
        for (let i = 0; i < potatoes.length; i++) {
            allIDs.push(potatoes[i].id)
        }
        newID = Math.max(...allIDs) + 1
        let newPotato = {
            id: newID,
            name: addPotatoName,
            potatoType: addPotatoType,
            color: addPotatoColor,
            imgUrl: addPotatoImgUrl
        }
        potatoes.push(newPotato)
        console.log(potatoes)
        userMessage.innerHTML = "Din potatis är tillagd"
        
    })
})


