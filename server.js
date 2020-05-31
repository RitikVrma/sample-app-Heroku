const express = require('express')

const { db, Tasks } = require('./db')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extenden: true}))

const PORT = process.env.PORT || 3434

app.get('/', (req, res) =>{
    res.send('Hello World')
})

app.get('/tasks', async (req, res) => {
    res.send(await Tasks.findAll())
})

app.post('/tasks', async (req, res) => {
    res.send(await Tasks.create(req.body))
})

db.sync({alter: true})
    .then(() => {

        app.listen(PORT, (req, res) => {
            console.log(`Server started on http://localhost:${PORT}`)
        }) 
    })