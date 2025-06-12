const express = require('express')
const app = express()
const {
    seed,
    client
} = require('./db')

const init = async () => {
    await client.connect()
    console.log('Connected to DATABASE')

    await seed()

    const PORT = 3000
    app.listen(PORT, () => {
        console.log(`Listening to PORT: ${PORT}`)
    })
}

init()