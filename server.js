const express = require('express')
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
    if(!req.body.name || !req.body.potatoType || !req.body.color || !req.body.imgUrl){
        return res.status(400).send('You missed something in your input.')
    }

    //new ID. Checks for the highest Id and add 1
    let allIDs = []
    let newID
    for (let i = 0; i < potatoes.length; i++) {
        allIDs.push(potatoes[i].id)
    }
    newID = Math.max(...allIDs) + 1

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

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Potatisarna finns ni i ${port}`))



