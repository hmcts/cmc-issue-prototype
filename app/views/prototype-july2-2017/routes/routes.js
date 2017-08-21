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
        req.session.data.total = Number(req.body.amount_1) + Number(req.body.amount_2) + Number(req.body.amount_3) + Number(req.body.amount_4);
        res.redirect('fixed-interest')
    });

    app.post('*/prototype-july2-2017/fixed-interest', function (req, res) {
        var rate = 8;
        if (req.body.interest_rate === 'no_interest') {
            rate = 0;
        } else if (req.body.interest_rate === 'different_rate') {
            rate = Number(req.session.data.different_rate_value);
        }
        req.session.data.interest_rate = rate;
        res.redirect('fixed-interest-date')
    });

    app.post('*/prototype-july2-2017/fixed-interest-date', function (req, res) {
        var moment = require('moment');
        var date = moment(req.body.interest_year + '-' + req.body.interest_month + '-' + req.body.interest_day).toString();
        req.session.data.date_from = date;
        res.redirect('claim-details')
    });

    app.post('*/prototype-july2-2017/personal-injury', function (req, res) {
        res.redirect('housing-disrepair')
    });

    app.post('*/prototype-july2-2017/housing-disrepair', function (req, res) {
        res.redirect('claim-details')
    });

    app.post('*/prototype-july2-2017/claim-details', function (req, res) {
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
        var moment = require('moment');
        var value = 0;
        var total = Number(req.session.data.total);
        var interest = 0;
        if (req.session.data.typeOfClaim === 'specified') {
            if (req.session.data.date_from) {
                var days = moment().diff(moment(req.session.data.date_from), 'days');
                interest = parseFloat(((Number(req.session.data.total) * Number(days) * Number(req.session.data.interest_rate)) / (365 * 100)).toFixed(2));
            }
            value = Number(req.session.data.total) + interest;
        } else {
            value = Number(req.session.data.higher_value)
        }

        var issueFeeamount = 10000
        switch (true) {
            case (value <= 300):
                issueFeeamount = 25
                break;
            case (value <= 500):
                issueFeeamount = 35
                break;
            case (value <= 1000):
                issueFeeamount = 60
                break;
            case (value <= 1500):
                issueFeeamount = 70
                break;
            case (value <= 3000):
                issueFeeamount = 105
                break;
            case (value <= 5000):
                issueFeeamount = 185
                break;
            case (value <= 10000):
                issueFeeamount = 410
                break;
            case (value > 10000):
                issueFeeamount = value * .045
                break;
            case (value > 200000):
                issueFeeamount = 10000
                break;
            default:
                issueFeeamount = 410
        }

        req.session.data.issueFeeamount = issueFeeamount;
        req.session.data.value = value;

        var formatter = new Intl.NumberFormat('en-GB', {
            style: 'currency',
            currency: 'GBP',
            minimumFractionDigits: 2, /* this might not be necessary */
        });
        if (req.session.data.typeOfClaim === 'specified') {
            var fee = 80;
            switch (true) {
                case (total >25 && total <= 500):
                    fee = 50
                    break;
                case (total > 500 && total <= 1000):
                    fee = 70
                    break;
                case (total > 1000 && total <= 5000):
                    fee = 80
                    break;
                case (total > 5000):
                    fee = 100
                    break;
            }

            req.session.data.fee = fee;

            res.render('prototype-july2-2017/claim-total', { issueFeeamount: formatter.format(issueFeeamount), total: formatter.format(total), interest: formatter.format(interest), claimType: req.session.data.typeOfClaim, fee: formatter.format(fee)})
        }
        else {
            res.render('prototype-july2-2017/claim-total', { issueFeeamount: formatter.format(issueFeeamount) })
        }
    });

    app.post('*/prototype-july2-2017/claim-total', function (req, res) {
        res.redirect('claim-details-summary')
    })

    app.get('*/prototype-july2-2017/claim-details-summary', function (req, res) {
        var defendants = req.session.defendants || [];
        res.render('prototype-july2-2017/claim-details-summary', { issueFeeamount: req.session.data.issueFeeamount, defendants: defendants })
    })

    app.get('*/prototype-july2-2017/claim-submitted', function (req, res) {
        var moment = require('moment');
        var issueDate = moment();

        if (moment().isAfter(moment('16:00', 'HH:mm'))) {
            if (moment().add('1', 'day').day() == 5) {
                issueDate = moment().add('3', 'days');
            } else if (moment().add('1', 'day').day() == 6) {
                issueDate = moment().add('2', 'days');
            } else {
                issueDate = moment().add('1', 'days');
            }
        }

        var formatter = new Intl.NumberFormat('en-GB', {
            style: 'currency',
            currency: 'GBP',
            minimumFractionDigits: 0, /* this might not be necessary */
        });
        res.render('prototype-july2-2017/claim-submitted', {today: moment().format('D MMMM YYYY'), issueDate: moment(issueDate).format('D MMMM YYYY'), issueFeeamount: formatter.format(req.session.data.issueFeeamount), value: formatter.format(req.session.data.value)  })
    })

    app.get('*/prototype-july2-2017/pay-by-card', function (req, res) {
        res.render('prototype-july2-2017/pay-by-card')
    })

    app.get('*/prototype-july2-2017/pay-by-account', function (req, res) {
        res.render('prototype-july2-2017/pay-by-account')
    })

    app.get('*/prototype-july2-2017/email', function (req, res) {
        var moment = require('moment');
        var issueDate = moment();

        if (moment().isAfter(moment('16:00', 'HH:mm'))) {
            if (moment().add('1', 'day').day() == 5) {
                issueDate = moment().add('3', 'days');
            } else if (moment().add('1', 'day').day() == 6) {
                issueDate = moment().add('2', 'days');
            } else {
                issueDate = moment().add('1', 'days');
            }
        }

        var formatter = new Intl.NumberFormat('en-GB', {
            style: 'currency',
            currency: 'GBP',
            minimumFractionDigits: 0, /* this might not be necessary */
        });
        res.render('prototype-july2-2017/email', {issueDate: moment(issueDate).format('D MMMM YYYY'), issueFeeamount: formatter.format(req.session.data.issueFeeamount)})
    })

}
