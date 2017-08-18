module.exports = function(app){

    app.post('*/prototype-july2-2017/representation', function(req, res){
        if (req.body.representativeType.toString() === 'represent') {
            res.redirect('representatives-details')
        }
        else {
            res.redirect('not-supported')
        }
    });

    app.get('*/prototype-july2-2017/defendants-service-address', function(req, res){
        var defendants = req.session.defendants || [];

        res.render('prototype-july2-2017/defendants-service-address', { defendants: defendants })
    });

    app.get('*/prototype-july2-2017/defendant-type', function(req, res){
        var defendants = req.session.defendants || [];

        res.render('prototype-july2-2017/defendant-type', { defendants: defendants })
    });

    app.post('*/prototype-july2-2017/defendant-type', function(req, res){
        var defendants = req.session.defendants || [];

        if (!req.body.defendantType) {
            res.render('prototype-july2-2017/defendant-type', { defendants: defendants })
        }
        else {
            res.redirect('defendant-details')
        }
    });

    app.get('*/prototype-july2-2017/defendant-details', function(req, res){
        var defendants = req.session.defendants || [];

        res.render('prototype-july2-2017/defendant-details', { defendants: defendants })
    });

    app.post('*/prototype-july2-2017/defendant-represented', function(req, res){
        if (req.body.defendantRepresented === undefined) {
            res.render('prototype-july2-2017/defendant-represented')
        } else if (req.body.defendantRepresented.toString() === 'yes') {
            res.redirect('defendant-reps-address')
        }
        else {
            res.redirect('defendants-service-address')
        }
    });

    app.get('*/prototype-july2-2017/defendant-reps-address', function(req, res){
        var defendants = req.session.defendants || [];

        res.render('prototype-july2-2017/defendant-reps-address', { defendants: defendants })
    });

    app.post('*/prototype-july2-2017/defendant-reps-address', function(req, res){
        res.redirect('defendant-add')
    });

    app.get('*/prototype-july2-2017/defendants-service-address', function(req, res){
        var defendants = req.session.defendants || [];

        res.render('prototype-july2-2017/defendants-service-address', { defendants: defendants })
    });

    app.post('*/prototype-july2-2017/defendants-service-address', function(req, res){
        res.redirect('defendant-add')
    });

    app.get('*/prototype-july2-2017/defendant-add', function(req, res){
        var defendants = req.session.defendants || [];
        var defendantNo = defendants.length + 1;
        var defendantName = (req.session.data['defendant_name']) ? req.session.data['defendant_name'] : req.session.data['defendant_company_name']
        var defendantCompanyNumber = (req.session.data['defendant_company_number']) ? req.session.data['defendant_company_number'] : '-'
        var defendantSolicitorName = (req.session.data['defendant_rep_company']) ? req.session.data['defendant_rep_company'] : '-'
        var defendantAddress1 = (req.session.data['defendant_address1']) ? req.session.data['defendant_address1'] : '-'
        var defendantAddress2 = (req.session.data['defendant_address2']) ? req.session.data['defendant_address2'] : ''
        var defendantTown = (req.session.data['defendant_town']) ? req.session.data['defendant_town'] : ''
        var defendantPostcode = (req.session.data['defendant_postcode']) ? req.session.data['defendant_postcode'] : ''
        var defendantAddress = defendantAddress1 + ' ' + defendantAddress2 + ' ' + defendantTown + ' ' + defendantPostcode
        var defendantServiceAddress1 = (req.session.data['defendant_service_address1']) ? req.session.data['defendant_service_address1'] : req.session.data['defendant_address1']
        var defendantServiceAddress2 = (req.session.data['defendant_service_address2']) ? req.session.data['defendant_service_address2'] : req.session.data['defendant_address2']
        var defendantServiceTown = (req.session.data['defendant_service_city']) ? req.session.data['defendant_service_city'] : req.session.data['defendant_town']
        var defendantServicePostcode = (req.session.data['defendant_service_postcode']) ? req.session.data['defendant_service_postcode'] : req.session.data['defendant_postcode']
        var defendantServiceAddress = defendantServiceAddress1 + ' ' + defendantServiceAddress2 + ' ' + defendantServiceTown + ' ' + defendantServicePostcode
        defendants.push({'defendantNo': defendantNo, 'defendantName': defendantName, 'defendantCompanyNumber': defendantCompanyNumber, 'defendantAddress': defendantAddress, 'solicitor': defendantSolicitorName, 'serviceAddress': defendantServiceAddress})

        req.session.defendants = defendants
        res.render('prototype-july2-2017/defendant-add', { defendants: defendants })
    });

    app.post('*/prototype-july2-2017/defendant-add', function(req, res){
        if (req.body.addDefendant && req.body.addDefendant.toString() === 'yes') {
            req.session.data['defendant_name'] = req.session.data['defendant_rep_company'] = req.session.data['defendant_address1'] = req.session.data['defendant_address2'] = undefined
            req.session.data['defendant_town'] = req.session.data['defendant_postcode'] = req.session.data['defendant_service_address1'] = req.session.data['defendant_service_address2'] = undefined
            req.session.data['defendant_service_city'] = req.session.data['defendant_service_postcode'] = req.session.data['defendant_company_name'] = req.session.data['defendantType'] = undefined
            req.session.data['defendantRepresented'] = req.session.data['defendant_title'] = req.session.data['defendantService'] = req.session.data['accept-service'] = undefined

            res.redirect('defendant-type')
        }
        else {
            res.redirect('type-of-claim')
        }
    });

    app.post('*/prototype-july2-2017/type-of-claim', function(req, res){
        if (!req.body.typeOfClaim) {
            res.render('prototype-july2-2017/type-of-claim')
        }
        else if (req.body.typeOfClaim.toString() === 'specified') {
            res.redirect('fixed-claim-amount')
        }
        else {
            res.redirect('personal-injury')
        }
    });

    app.post('*/prototype-july2-2017/choose-how-to-pay', function (req, res) {
        if (!req.body.paymentType) {
            res.render('prototype-july2-2017/choose-how-to-pay')
        }
        else if (req.body.paymentType == 'card') {
            res.redirect('pay-by-card')
        } else {
            res.redirect('pay-by-account')
        }
    });

    app.post('*/prototype-july2-2017/defendant-represented', function(req, res){
        if (!req.body.defendantRepresented) {
            res.render('prototype-july2-2017/defendant-represented')
        }
        else if (req.body.defendantRepresented.toString() === 'yes') {
            res.redirect('defendant-reps-address')
        }
        else {
            res.redirect('defendants-service-address')
        }
    });

    app.post('*/prototype-july2-2017/fixed-claim-amount', function (req, res) {
        res.redirect('fixed-interest')
    });

    app.post('*/prototype-july2-2017/fixed-interest', function (req, res) {
        res.redirect('fixed-interest-date')
    });

    app.post('*/prototype-july2-2017/fixed-interest-date', function (req, res) {
        res.redirect('claim-details')
    });

    app.post('*/prototype-july2-2017/personal-injury', function (req, res) {
        res.redirect('housing-disrepair')
    });

    app.post('*/prototype-july2-2017/housing-disrepair', function (req, res) {
        res.redirect('claim-details')
    });

    app.post('*/prototype-july2-2017/claim-details', function (req, res) {
        console.log(req.session.data.typeOfClaim)
        if (req.session.data.typeOfClaim === 'specified') {
            res.redirect('claim-total')
        }
        else {
            res.redirect('claim-amount')
        }
    });

    app.post('*/prototype-july2-2017/claim-amount', function (req, res) {
        res.redirect('claim-total')
    });

    app.get('*/prototype-july2-2017/claim-total', function (req, res) {
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
                case (higherValue > 200000):
                    amount = 10000
                    break;
                default:
                    amount = 410
            }
        }
        var formatter = new Intl.NumberFormat('en-GB', {
            style: 'currency',
            currency: 'GBP',
            minimumFractionDigits: 2, /* this might not be necessary */
        });
        req.session.data.amount = amount;
        res.render('prototype-july2-2017/claim-total', { amount: formatter.format(amount) })
    });

    app.post('*/prototype-july2-2017/claim-total', function (req, res) {
        res.redirect('claim-details-summary')
    })

    app.get('*/prototype-july2-2017/claim-details-summary', function (req, res) {
        var defendants = req.session.defendants || [];
        res.render('prototype-july2-2017/claim-details-summary', { amount: req.session.data.amount, defendants: defendants })
    })

    app.get('*/prototype-july2-2017/claim-submitted', function (req, res) {
        var moment = require('moment');
        var formatter = new Intl.NumberFormat('en-GB', {
            style: 'currency',
            currency: 'GBP',
            minimumFractionDigits: 0, /* this might not be necessary */
        });
        res.render('prototype-july2-2017/claim-submitted', {today: moment().format('D MMMM YYYY'), amount: formatter.format(req.session.data.amount)  })
    })

    app.get('*/prototype-july2-2017/pay-by-card', function (req, res) {
        res.render('prototype-july2-2017/pay-by-card', {amount: req.session.data.amount })
    })

    app.get('*/prototype-july2-2017/pay-by-account', function (req, res) {
        res.render('prototype-july2-2017/pay-by-account', {amount: req.session.data.amount })
    })

}
