function changePotatoButton(potatoID){
    const updatePotatoName = document.getElementById("updatePotatoName").value	
    const updatePotatoType = document.getElementById("updatePotatoType").value	
    const updatePotatoColor = document.getElementById("updatePotatoColor").value	
    const updatePotatoImgUrl = document.getElementById("updatePotatoImgUrl").value	
    if (updatePotatoName === "" ||	
        updatePotatoType === "" ||	
        updatePotatoColor === "" ||
        updatePotatoImgUrl === ""
    ){	
        return console.log( "Din potatis saknar namn, typ och/eller färg")
    }	
    updatedPotato = {
        id: potatoID,
        name: updatePotatoName,
        potatoType: updatePotatoType,
        color: updatePotatoColor,
        imgUrl: updatePotatoImgUrl
    }

    const json = JSON.stringify(updatedPotato)
    console.log(json)
    fetch(`/potatoes/${potatoID}`,{
        method: 'PUT',
        headers: {
            "Content-Type" : "application/json"
        },
        body: json
    })
    .then(res => res.text())          // convert to plain text
    .then(text => console.log(text)) //remove
    .then(response => response.json())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', JSON.stringify(response)))

    listPotatoes()
}