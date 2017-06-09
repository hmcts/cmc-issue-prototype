module.exports = function(app){

    app.post('*/prototype-may-2017/representation', function(req, res){
        if (req.body.representativeType.toString() === 'represent') {
            res.redirect('representatives-details')
        }
        else {
            res.redirect('not-supported')
        }
    });

    app.post('*/prototype-may-2017/what-type-of-claimant', function(req, res){
        if (req.body.claimantType.toString() === 'company') {
            res.redirect('claimant-company-reference')
        }
        else {
            res.redirect('claimant-individual-reference')
        }
    });

    app.post('*/prototype-may-2017/defendant-type', function(req, res){

        if (req.body.defendantType.toString() === 'company') {
            res.redirect('defendant-company-details')
        }
        else {
            res.redirect('defendant-details')
        }
    });

    app.post('*/prototype-may-2017/type-of-claim', function(req, res){

        if (req.body.typeOfClaim.toString() === 'specified') {
            res.redirect('not-supported')
        }
        else {
            res.redirect('claim-amount')
        }
    });

    app.post('*/prototype-may-2017/choose-how-to-pay', function (req, res) {
        if (req.body.paymentType == 'card') {
            res.redirect('pay-by-card')
        } else {
            res.redirect('pay-by-account')
        }
    });

    app.post('*/prototype-may-2017/claim-interest', function (req, res) {
        if (!req.body.interestRate) {
            res.render('prototype-june-2017/claim-interest')
        }
        else if (req.body.interestRate == 'No interest') {
            res.redirect('claim-total')
        } else {
            res.redirect('claim-interest-date')
        }
    })


}