const express = require('express')
const app = express()
const Router = require('./routes/Router')
const RouterAdmin = require('./routes/Router')
const handlebars = require('express-handlebars')
const bodyparser = require('body-parser')
const path = require('path')
const mongoose = require('mongoose')
const flash = require('connect-flash')
const session = require('express-session')

// varibles
const PORT = 3000

// flash msg session
app.use(session({
    secret: "car_gestao",
    resave: true,
    saveUninitialized: true
}))
app.use(flash())
app.use((req, res, next) => {
    res.locals.success = req.flash('success')
    res.locals.error = req.flash('error')
    next()
})
// static files
app.use(express.static(path.join(__dirname, 'src')))

// mongoose
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/car_gestao', { useNewUrlParser: true })
    .then(() => {
        console.log('Connectado ao mongo')
    })
    .catch(e => {
        console.log(`Erro ao se conectar: ${e}`)
    })

// body parse
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())
// view engine
app.engine('handlebars', handlebars())
app.set('view engine', 'handlebars')
// ROUTES
app.use('/', Router)
app.use('/admin', RouterAdmin)

app.listen(PORT, () => console.log(` Server ON ${PORT}`))