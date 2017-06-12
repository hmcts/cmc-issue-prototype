module.exports = function(app){

    app.post('*/prototype-june-2017/representation', function(req, res){
        if (req.body.representativeType.toString() === 'represent') {
            res.redirect('representatives-details')
        }
        else {
            res.redirect('not-supported')
        }
    });

    app.post('*/prototype-june-2017/what-type-of-claimant', function(req, res){
        if (!req.body.claimantType) {
            res.render('prototype-june-2017/what-type-of-claimant')
        }
        else if (req.body.claimantType.toString() === 'company') {
            res.redirect('claimant-company-reference')
        }
        else {
            res.redirect('claimant-individual-reference')
        }
    });

    app.post('*/prototype-june-2017/defendant-type', function(req, res){
        if (!req.body.defendantType) {
            res.render('prototype-june-2017/defendant-type')
        }
        else if (req.body.defendantType.toString() === 'company') {
            res.redirect('defendant-company-details')
        }
        else {
            res.redirect('defendant-details')
        }
    });

    app.post('*/prototype-june-2017/type-of-claim', function(req, res){
        if (!req.body.typeOfClaim) {
            res.render('prototype-june-2017/type-of-claim')
        }
        else if (req.body.typeOfClaim.toString() === 'specified') {
            res.redirect('not-supported')
        }
        else {
            res.redirect('claim-amount')
        }
    });

    app.post('*/prototype-june-2017/claim-interest', function (req, res) {
        if (!req.body.interestRate) {
            res.render('prototype-june-2017/claim-interest')
        }
        else if (req.body.interestRate == 'No interest') {
            res.redirect('claim-total')
        } else {
            res.redirect('claim-interest-date')
        }
    })

    app.post('*/prototype-june-2017/choose-how-to-pay', function (req, res) {
        if (!req.body.paymentType) {
            res.render('prototype-june-2017/choose-how-to-pay')
        }
        else if (req.body.paymentType == 'card') {
            res.redirect('pay-by-card')
        } else {
            res.redirect('pay-by-account')
        }
    });

    app.post('*/prototype-june-2017/claim-total', function (req, res) {
        var amount = 10000
        if (req.body.higherValue) {
            var higherValue = parseFloat(req.body.higherValue)
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

        res.render('prototype-june-2017/claim-total', { amount: amount})
    });

}