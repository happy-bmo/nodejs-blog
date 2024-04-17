const path = require('path')
const express = require('express')
const morgan = require('morgan')
const methodOverride = require('method-override')
const exps = require('express-handlebars')
const app = express()
const port = 3000

const route = require('./routes')
const db = require('./config/db')

// connect db
db.connect()

app.use(express.static(path.join(__dirname, 'public')))
// Http logger
app.use(morgan('combined'))
// Template engine
app.engine('.hbs',
    exps.engine({ 
    defaultLayout: 'main',
    extname: '.hbs',
    helpers: {
        sum: (a, b) => a + b
    } 
}))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'resources','views'))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(methodOverride('_method'))

app.get('/middleware',
    function(req,res,next) {
        if(['vethuong, vevip'].includes(req.query.ve)) {
            req.face = 'ggg'
            return next();
        }
        res.status(403).json({
            message: 'Access denied'
        })
    },

    function(req,res,next) {
    res.json({
        message: 'Succesfully !',
        face: req.face
    })
})
// Route
route(app)

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})
