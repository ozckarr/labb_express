function updatePotato(potatoID){
    const updatePotatoName = document.getElementById("updatePotatoName").value	
    const updatePotatoType = document.getElementById("updatePotatoType").value	
    const updatePotatoColor = document.getElementById("updatePotatoColor").value	
    const updatePotatoImgUrl = document.getElementById("updatePotatoImgUrl").value	
    let userFindMessage = document.querySelector(".userFindMessage")
    if (updatePotatoName === "" ||	
        updatePotatoType === "" ||	
        updatePotatoColor === "" ||
        updatePotatoImgUrl === ""
    ){	
        userFindMessage.innerHTML = "Din potatis saknar namn, typ, färg och/eller bild"
        return
    }	
    updatedPotato = {
        id: potatoID,
        name: updatePotatoName,
        potatoType: updatePotatoType,
        color: updatePotatoColor,
        imgUrl: updatePotatoImgUrl
    }

    fetch(`http://localhost:3000/potatoes/${potatoID}`,{
        method: 'PUT',
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(updatedPotato)
    })
    .then(response => response.json())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', JSON.stringify(response)))
    userFindMessage.innerHTML = potatoID + " är uppdaterad"
    listPotatoes()
}