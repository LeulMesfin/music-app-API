/* Express API for music finder app */
require('dotenv').config() // for env vars
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const User = require('./models/userModel')
// var cors = require('cors')
const port = process.env.PORT || 3000

app.use(express.json()) // express middleware, my app can now access json data type
// app.use(cors())

// routes
app.get('/', (req, res) => {
    res.send('Hello NODE API')
})

// GET endpoint to GET all USERS from the DB
app.get('/users', async(req, res) => {
    try {
        const users = await User.find({})
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// GET endpoint to GET a USER based on email
app.get('/users/:email', async(req, res) => {
    try {
        const { email } = req.params;
        // console.log("email: ", email);
        const user = await User.find({email: `${email}`});
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// POST endpoint to CREATE a USER in the DB
app.post('/users', async(req, res) => {
    try {
        const user = await User.create(req.body)
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// DELETE endpoint to DELETE a USER in the DB
app.delete('/users/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({message: `cannot find any product with ID ${id}`});

        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

mongoose.connect(`mongodb+srv://admin:${process.env.MONGO_DB_PASS}@cluster0.hrkns.mongodb.net/Node-API?retryWrites=true&w=majority&appName=Cluster0`)
.then(() => {
    console.log('connected to MongoDB')
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
}).catch((error) => {
    console.log(error)
})

module.exports = app;
//export default app