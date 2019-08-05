const express = require('express')
const app = express()
const Router = require('./routes/Router')
const RouterAdmin = require('./routes/Router')
const handlebars = require('express-handlebars')
const bodyparser = require('body-parser')
const path = require('path')

// varibles
const PORT = 3000

// static files
app.use(express.static(path.join(__dirname, 'src')))

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