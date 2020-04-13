
fetch("http://localhost:3000/potatoes").then((response) => {
    return response.json()
}).then((potatoes) => {
    console.log(potatoes)

})

function listPotatoes(){
    let potatoListContainer = document.querySelector(".potatoList")
}