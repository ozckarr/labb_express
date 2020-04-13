const express = require('express')
const Joi = require('joi')

const app = express()
//import potatoArray = from './potatoArray' require

app.use(express.json())
app.use(express.static('public'))

const potatoes = [
    {
        id: 1,
        name: "Asterix",
        potatoType: "Fast",
        color: "Röd",
        imgUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Asterix_%28potatis%29.JPG/2560px-Asterix_%28potatis%29.JPG"
        
    },{
        id: 2,
        name: "King Edward",
        potatoType: "Mittimellan",
        color: "Skiftar till rött",
        imgUrl: "https://upload.wikimedia.org/wikipedia/commons/9/9f/King_Edward.jpg"
        
    },{
        id: 3,
        name: "Blå Kongo",
        potatoType: "Mjölig",
        color: "Blå/lila",
        imgUrl: "https://www.klostra.se/media/catalog/product/_/m/_mg_6469_salad_blue.jpg"
        
    },{
        id: 4,
        name: "Bintje",
        potatoType: "Fast",
        color: "Potatisfärgad",
        imgUrl: "https://www.klostra.se/media/catalog/product/cache/1/image/300x300/9df78eab33525d08d6e5fb8d27136e95/v/i/visi_bintje_600.jpg"
        
    }
]


app.get('/', (req,res) => {
    res.send('potatoArray')
})

app.get('/potatoes', (req,res) => {
    res.send(potatoes)
})

app.get('/potatoes/:id', (req,res) => {
    const potato = potatoes.find(c => c.id === parseInt(req.params.id))
    if(!potato){
        return res.status(404).send('Potatisen med det ID:t fanns inte')
    }
    res.send(potato)
})

app.post('/potatoes', (req,res) => {
    const { error } = validatePotato(req.body)
    if(error){
        return res.status(400).send(error.details[0].message)
    }

    const potato = {
        id: potatoes.length+1,
        name: req.body.name,
        potatoType: req.body.potatoType,
        color: req.body.color,
        imgUrl: req.body.imgUrl
    }
    potatoes.push(potato)
    res.send(potato)
})

app.put('/potatoes/:id', (req,res) => {
    const potato = potatoes.find(c => c.id === parseInt(req.params.id))
    if(!potato){
        return res.status(404).send('Potatisen med det ID:t fanns inte')
    }

    const { error } = validatePotato(req.body)
    if(error){
        return res.status(400).send(error.details[0].message)
    }

    potato.name = req.body.name
    potato.potatoType = req.body.potatoType
    potato.color = req.body.color
    potato.imgUrl = req.body.imgUrl

    res.send(potato)
})

app.delete('/potatoes/:id', (req,res) => {
    const potato = potatoes.find(c => c.id === parseInt(req.params.id))
    if(!potato){
        return res.status(404).send('Potatisen med det ID:t fanns inte')
    }

    const index = potatoes.indexOf(potato)
    potatoes.splice(index, 1)

    res.send(potatoes)
})


function validatePotato(potato) {
    const schema = {
        name: Joi.string().min(3).required(),
        potatoType: Joi.string().min(3).required(),
        color: Joi.string().min(3).required(),
        imgUrl: Joi.string().min(3).required()
    }

    return Joi.validate(potato, schema)
}


const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Potatisarna finns ni i ${port}`))



