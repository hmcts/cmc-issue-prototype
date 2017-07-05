module.exports = function(app){

    app.post('*/prototype-july-2017/representation', function(req, res){
        if (req.body.representativeType.toString() === 'represent') {
            res.redirect('representatives-details')
        }
        else {
            res.redirect('not-supported')
        }
    });

    app.post('*/prototype-july-2017/type-of-claim', function(req, res){
        if (!req.body.typeOfClaim) {
            res.render('prototype-july-2017/type-of-claim')
        }
        else if (req.body.typeOfClaim.toString() === 'specified') {
            res.redirect('not-supported')
        }
        else {
            res.redirect('personal-injury')
        }
    });

    app.post('*/prototype-july-2017/choose-how-to-pay', function (req, res) {
        if (!req.body.paymentType) {
            res.render('prototype-july-2017/choose-how-to-pay')
        }
        else if (req.body.paymentType == 'card') {
            res.redirect('pay-by-card')
        } else {
            res.redirect('pay-by-account')
        }
    });

    app.get('*/prototype-july-2017/claim-total', function (req, res) {
        var amount = 10000
        if (req.session.data["higher_value"]) {
            var higherValue = parseFloat(req.session.data["higher_value"])
            switch(true) {
                case (higherValue <= 300):
                    amount = 25
                    break;
                case (higherValue <= 500):
                    amount = 35
                    break;
                case (higherValue <= 1000):
                    amount = 60
                    break;
                case (higherValue <= 1500):
                    amount = 70
                    break;
                case (higherValue <= 3000):
                    amount = 105
                    break;
                case (higherValue <= 5000):
                    amount = 185
                    break;
                case (higherValue <= 10000):
                    amount = 410
                    break;
                case (higherValue > 10000):
                    amount = higherValue * .045
                    break;
                default:
                    amount = 410
            }
        }
        req.session.data.amount = amount;
        res.render('prototype-july-2017/claim-total', { amount: amount})
    });

    app.get('*/prototype-july-2017/claim-submitted', function (req, res) {
        var today = new Date();
        var date = today.toDateString();
        var time = today.toLocaleTimeString();
        res.render('prototype-july-2017/claim-submitted', {today: date, time: time, amount: req.session.data.amount })
    })

    app.get('*/prototype-july-2017/pay-by-card', function (req, res) {
        var today = new Date().toDateString();
        res.render('prototype-july-2017/pay-by-card', {amount: req.session.data.amount })
    })

    app.get('*/prototype-july-2017/pay-by-account', function (req, res) {
        var today = new Date().toDateString();
        res.render('prototype-july-2017/pay-by-account', {amount: req.session.data.amount })
    })

    app.get('*/prototype-july-2017/claim-details-summary', function (req, res) {
        var today = new Date().toDateString();
        res.render('prototype-july-2017/claim-details-summary', {amount: req.session.data.amount })
    })

}
