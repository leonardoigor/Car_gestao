const router = require('express').Router()
const mongoose = require('mongoose')
// Load models files
require('../models/User')

// Models from mongoose
const User = mongoose.model('users')
// gettes
router.get('/', (req, res) => {
    res.render('index', { connected: false, name: '' })
})
router.get('/login', (req, res) => {
    res.render('login_form')
})
router.get('/register', (req, res) => {
    res.render('user_form')
})
router.get('/cars', (req, res) => {
    res.render('car_form')
})

// posts
router.post('/register', (req, res) => {
    const { username, name, password } = req.body
    const newUser = {
        username: username,
        name: name,
        password: password
    }
    new User(newUser).save()
        .then(() => {
            req.flash('success', 'Usuario cadastrado com sucesso')
            res.redirect('/')
        })
        .catch(e => {
            console.log(e)
            req.flash('error', 'Houve algum erro do cadastrar usuario')
            res.redirect('/')
        })
})

module.exports = router