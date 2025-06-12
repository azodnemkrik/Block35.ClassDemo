const express = require('express')
const app = express.Router()
const {
    fetchUsers,
    fetchProducts,
    fetchFavorites,
    createFavorite,
    deleteFavorite
} = require('./db.js')

// CREATE
app.post('/favorites', async(req,res,next) => {
    try {
        res.send(await createFavorite(req.body))
    } catch (error) {
        next(error)
    }
})

// READ
app.get('/users', async(req,res,next) => {
    try {
        res.send(await fetchUsers())
    } catch (error) {
        next(error)
    }
})

app.get('/products', async(req,res,next) => {
    try {
        res.send(await fetchProducts())
    } catch (error) {
        next(error)
    }
})

app.get('/favorites', async(req,res,next) => {
    try {
        res.send(await fetchFavorites())
    } catch (error) {
        next(error)
    }
})

// UPDATE (NONE)
// DELETE
app.delete('/favorites/:id/user/:user_id', async(req,res,next) => {
    try {
        await deleteFavorite({id: req.params.id , user_id: req.params.user_id})
        res.sendStatus(204)
    } catch (error) {
        next(error)
    }
})

module.exports = app 