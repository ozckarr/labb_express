const express = require('express')
const Joi = require('joi')
const fs = require('fs')
const app = express()

app.use(express.json())
app.use(express.static('public'))

const data = fs.readFileSync('./potatoArray.json')
const potatoes = JSON.parse(data)

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
        id: potatoes.length + 1,
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



