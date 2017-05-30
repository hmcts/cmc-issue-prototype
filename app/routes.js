var express = require('express')
var router = express.Router()

// Route index page
router.get('/', function (req, res) {
  res.render('index')
})

// add your routes here

router.post('*/choose-how-to-pay', function (req, res) {
  if (req.body.paymentType == 'card') {
    res.redirect('pay-by-card')
  } else {
    res.redirect('pay-by-account')
  }
})

router.post('*/claim-interest', function (req, res) {
    if (req.body.interestRate == 'No interest') {
        res.redirect('claim-total')
    } else {
        res.redirect('claim-interest-date')
    }
})

module.exports = router
