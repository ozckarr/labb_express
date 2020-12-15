function removePotato(potatoID){
    fetch(`/potatoes/${potatoID}`, {method:'DELETE'})
    let foundPotatoContainer = document.querySelector(".foundPotato")
    let userFindMessage = document.querySelector(".userFindMessage")
    foundPotatoContainer.innerHTML = ""
    userFindMessage.innerHTML = "Potatis med ID:" + potatoID + " är raderad"
    listPotatoes()
}