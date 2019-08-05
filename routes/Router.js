const router = require('express').Router()

router.get('/', (req, res) => {
    res.render('index')
})
router.get('/cars', (req, res) => {
    res.render('car_form')
})

module.exports = router