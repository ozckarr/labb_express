
document.querySelector(".addPotato").addEventListener("click", function(){

    let addedPotato = addedPotatoData()

    let userMessage = document.querySelector(".userMessage")	
    if (missingPotatoData(addedPotato)){	
        return userMessage.innerHTML = "Din potatis saknar namn, typ och/eller färg"	
    }	
    if (addedPotato.imgUrl === "") {	
        addedPotato.imgUrl = "https://www.worldanvil.com/uploads/images/18e110943b57da2ca398dcdf7df96817.png"	
    }	

        let newPotato = {	
            name: addedPotato.name,	
            potatoType: addedPotato.type,	
            color: addedPotato.color,	
            imgUrl: addedPotato.imgUrl	
        }
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPotato)
        }
        
        fetch("/potatoes", options)
        .then(function(response) {
            return response.json();
        })
            .then(data => {
            console.log(data);
        })

        listPotatoes()
        document.getElementById("addPotatoName").value = ""	
        document.getElementById("addPotatoType").value = ""
        document.getElementById("addPotatoColor").value	= ""
        document.getElementById("addPotatoImgUrl").value = ""
        userMessage.innerHTML = "Din potatis är tillagd"
})

function addedPotatoData(){
    let addedPotato = {
        name: document.getElementById("addPotatoName").value,	
        type: document.getElementById("addPotatoType").value,	
        color: document.getElementById("addPotatoColor").value,	
        imgUrl: document.getElementById("addPotatoImgUrl").value	
    }
    return addedPotato
}

function missingPotatoData(potato){
    if(
        potato.name === "" ||	
        potato.type === "" ||	
        potato.color === ""
    ){
        return true
    }
}