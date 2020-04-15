function removePotatoButton(potatoID){
    fetch(`/potatoes/${potatoID}`, {method:'DELETE'})
    listPotatoes()
}