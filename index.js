const express = require('express')
const mongoose = require('mongoose')
const authRouter = require('./authRouter')
const PORT = process.env.PORT || 5000
const app = express()

app.use(express.json())
app.use('/auth', authRouter)


const start = async () => {
    try {
        await mongoose.connect(`mongodb+srv://polorion1:Kobold1993rus@cluster0.lq9k3ly.mongodb.net/`)
        app.listen(PORT, () => {
            console.log(`server start,port${PORT}`)
        })

    } catch (e) {
        console.log(e)
    }
}
start()