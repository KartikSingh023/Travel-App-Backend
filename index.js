const express = require('express')
const cors = require('cors')
const { authRouter } = require('./router/authRouter')
const { adminRouter } = require('./router/adminRouter')
const { userRouter } = require('./router/userRouter')
const { checkRole } = require('./MiddleWare/checkRole/checkRole')
const { verifyJWT } = require('./MiddleWare/jwtToken/verifyJWT')
const { port, mongoDbUrl } = require('./config/configuration')

const path = require('path')
const mongoose = require('mongoose')

require('dotenv').config()
const app = express()

// Configure Mongoose to Connect to MongoDB
mongoose
    .connect(mongoDbUrl, { useNewUrlParser: true })
    .then((response) => {
        console.log('MongoDB Connected Successfully.')
    })
    .catch((err) => {
        console.log('Database connection failed.')
    })

/* Configure express*/
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(cors())

/* Routes */
app.use(authRouter)

app.use('/admin', verifyJWT, checkRole,  adminRouter)

app.use((req, res, next) => {
    console.log('Middle Ware')
    next()
})

app.use((err, req, res, next) => {
    const { status = 500 } = err
    if (!err.message) err.message = 'Oh No, Something went wrong!'
    res.status(status).render('error', { err })
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
