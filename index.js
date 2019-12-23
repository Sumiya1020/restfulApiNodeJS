const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})

const db = require('./queries')

app.get('/smartcar', db.getMedees)
app.get('/smartcar/:medee_id', db.getMedeeById)
app.post('/smartcar', db.createMedee)
app.put('/smartcar/:medee_id', db.updateMedee)
app.delete('/smartcar/:medee_id', db.deleteMedee)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})