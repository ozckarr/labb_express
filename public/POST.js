
document.querySelector(".addPotato").addEventListener("click", function(){	
    const addPotatoName = document.getElementById("addPotatoName").value	
    const addPotatoType = document.getElementById("addPotatoType").value	
    const addPotatoColor = document.getElementById("addPotatoColor").value	
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

        let newPotato = {	
            name: addPotatoName,	
            potatoType: addPotatoType,	
            color: addPotatoColor,	
            imgUrl: addPotatoImgUrl	
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
        userMessage.innerHTML = "Din potatis är tillagd"
})