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
        return console.log( "Din potatis saknar namn, typ, färg och/eller bild")
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
    fetch(`http://localhost:3000/potatoes/${potatoID}`,{
        method: 'PUT',
        headers: {
            "Content-Type" : "application/json"
        },
        body: json
    })
    .then(response => response.json())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', JSON.stringify(response)))

    listPotatoes()
}