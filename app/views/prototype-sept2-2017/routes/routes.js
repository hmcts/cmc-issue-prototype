module.exports = function(app){

    app.post('*/prototype-sept2-2017/representation', function(req, res){
        if (req.body.representativeType.toString() === 'represent') {
            res.redirect('representatives-details')
        }
        else {
            res.redirect('not-supported')
        }
    });

    app.get('*/prototype-sept2-2017/defendants-service-address', function(req, res){
        var defendants = req.session.defendants || [];

        res.render('prototype-sept2-2017/defendants-service-address', { defendants: defendants })
    });

    app.get('*/prototype-sept2-2017/defendant-type', function(req, res){
        var defendants = req.session.defendants || [];

        res.render('prototype-sept2-2017/defendant-type', { defendants: defendants })
    });

    app.post('*/prototype-sept2-2017/defendant-type', function(req, res){
        var defendants = req.session.defendants || [];

        if (!req.body.defendantType) {
            res.render('prototype-sept2-2017/defendant-type', { defendants: defendants })
        }
        else {
            res.redirect('defendant-details')
        }
    });

    app.get('*/prototype-sept2-2017/defendant-details', function(req, res){
        var defendants = req.session.defendants || [];

        res.render('prototype-sept2-2017/defendant-details', { defendants: defendants })
    });

    app.post('*/prototype-sept2-2017/defendant-represented', function(req, res){
        if (req.body.defendantRepresented === undefined) {
            res.render('prototype-sept2-2017/defendant-represented')
        } else if (req.body.defendantRepresented.toString() === 'yes') {
            res.redirect('defendant-reps-address')
        }
        else {
            res.redirect('defendants-service-address')
        }
    });

    app.get('*/prototype-sept2-2017/defendant-reps-address', function(req, res){
        var defendants = req.session.defendants || [];

        res.render('prototype-sept2-2017/defendant-reps-address', { defendants: defendants })
    });

    app.post('*/prototype-sept2-2017/defendant-reps-address', function(req, res){
        res.redirect('defendant-add')
    });

    app.get('*/prototype-sept2-2017/defendants-service-address', function(req, res){
        var defendants = req.session.defendants || [];

        res.render('prototype-sept2-2017/defendants-service-address', { defendants: defendants })
    });

    app.post('*/prototype-sept2-2017/defendants-service-address', function(req, res){
        if (req.body.defendantService === 'other') {
            res.redirect('defendants-service-address-other')
        }
        else {
            res.redirect('defendant-add')
        }
    });

    app.get('*/prototype-sept2-2017/defendant-add', function(req, res){
        var defendants = req.session.defendants || [];
        var defendantNo = defendants.length + 1;
        var defendantName = (req.session.data['defendant_name']) ? req.session.data['defendant_name'] : req.session.data['defendant_company_name']
        var defendantCompanyNumber = (req.session.data['defendant_company_number']) ? req.session.data['defendant_company_number'] : '-'
        var defendantSolicitorName = (req.session.data['defendant_rep_company']) ? req.session.data['defendant_rep_company'] : '-'
        var defendantAddress1 = (req.session.data['defendant_AddressLine1']) ? req.session.data['defendant_AddressLine1'] : '-'
        var defendantAddress2 = (req.session.data['defendant_AddressLine2']) ? req.session.data['defendant_AddressLine2'] : ''
        var defendantTown = (req.session.data['defendant_city']) ? req.session.data['defendant_city'] : ''
        var defendantPostcode = (req.session.data['defendant_Postcode']) ? req.session.data['defendant_Postcode'] : ''
        var defendantAddress = defendantAddress1 + ' ' + defendantAddress2 + ' ' + defendantTown + ' ' + defendantPostcode
        var defendantServiceAddress1 = (req.session.data['defendant_service_AddressLine1']) ? req.session.data['defendant_service_AddressLine1'] : req.session.data['defendant_AddressLine1']
        var defendantServiceAddress2 = (req.session.data['defendant_service_AddressLine2']) ? req.session.data['defendant_service_AddressLine2'] : req.session.data['defendant_AddressLine2']
        var defendantServiceTown = (req.session.data['defendant_service_city']) ? req.session.data['defendant_service_city'] : req.session.data['defendant_city']
        var defendantServicePostcode = (req.session.data['defendant_service_Postcode']) ? req.session.data['defendant_service_Postcode'] : req.session.data['defendant_Postcode']
        var defendantServiceAddress = defendantServiceAddress1 + ' ' + defendantServiceAddress2 + ' ' + defendantServiceTown + ' ' + defendantServicePostcode
        defendants.push({'defendantNo': defendantNo, 'defendantName': defendantName, 'defendantCompanyNumber': defendantCompanyNumber, 'defendantAddress': defendantAddress, 'solicitor': defendantSolicitorName, 'serviceAddress': defendantServiceAddress})

        req.session.defendants = defendants
        res.render('prototype-sept2-2017/defendant-add', { defendants: defendants })
    });

    app.post('*/prototype-sept2-2017/defendant-add', function(req, res){
        if (req.body.addDefendant && req.body.addDefendant.toString() === 'yes') {
            req.session.data['defendant_name'] = req.session.data['defendant_rep_company'] = req.session.data['defendant_AddressLine1'] = req.session.data['defendant_AddressLine2'] = undefined
            req.session.data['defendant_city'] = req.session.data['defendant_Postcode'] = req.session.data['defendant_service_AddressLine1'] = req.session.data['defendant_service_AddressLine2'] = undefined
            req.session.data['defendant_service_city'] = req.session.data['defendant_service_Postcode'] = req.session.data['defendant_company_name'] = req.session.data['defendantType'] = undefined
            req.session.data['defendantRepresented'] = req.session.data['defendant_title'] = req.session.data['defendantService'] = req.session.data['accept-service'] = undefined

            res.redirect('defendant-type')
        }
        else {
            res.redirect('jurisdiction')
        }
    });


    app.post('*/prototype-sept2-2017/type-of-claim', function(req, res){
        if (!req.body.typeOfClaim) {
            res.render('prototype-sept2-2017/type-of-claim')
        }
        else if (req.body.typeOfClaim.toString() === 'specified') {
            res.redirect('spec-claim-amount-type')
        }
        else {
            res.redirect('personal-injury')
        }
    });
    
    app.post('*/prototype-sept2-2017/defendant-represented', function(req, res){
        if (req.body.defendantRepresented === undefined) {
            res.render('prototype-sept2-2017/defendant-represented')
        } else if (req.body.defendantRepresented.toString() === 'yes') {
            res.redirect('defendant-reps-address')
        }
        else {
            res.redirect('defendants-service-address')
        }
    });

    app.post('*/prototype-sept2-2017/jurisdiction', function(req, res){

        if (!req.body.serviceLocation) {
            res.render('prototype-sept2-2017/jurisdiction')
        }
        else if (req.body.serviceLocation.toString() === 'in-uk') {
            res.redirect('jurisdiction-statements')
        }
        else if (req.body.serviceLocation.toString() === 'out-uk') {
            res.redirect('jurisdiction-statements-2')
        }
        else {
            res.redirect('type-of-claim')
        }
    });

    app.post('*/prototype-sept2-2017/spec-claim-amount-type', function(req, res){
        if (!req.body.interestTotal) {
            res.render('prototype-sept2-2017/spec-claim-amount-type')
        }
        else if (req.body.interestTotal.toString() === 'no') {
            res.redirect('fixed-claim-amount')
        }
        else {
            res.redirect('fixed-claim-amount-total')
        }
    });

    app.post('*/prototype-sept2-2017/fixed-claim-amount-total', function(req, res){
        req.session.data.total = Number(req.body.spec_claim_total_amount)
        req.session.data.interestTotal = Number(req.body.spec_claim_total_interest)
        res.redirect('claim-details')
    });

    app.post('*/prototype-sept2-2017/choose-how-to-pay', function (req, res) {
        if (!req.body.paymentType) {
            res.render('prototype-sept2-2017/choose-how-to-pay')
        }
        else if (req.body.paymentType == 'card') {
            res.redirect('pay-by-card')
        } else {
            res.redirect('pay-by-account')
        }
    });

    app.post('*/prototype-sept2-2017/defendant-represented', function(req, res){
        if (!req.body.defendantRepresented) {
            res.render('prototype-sept2-2017/defendant-represented')
        }
        else if (req.body.defendantRepresented.toString() === 'yes') {
            res.redirect('defendant-reps-address')
        }
        else {
            res.redirect('defendants-service-address')
        }
    });

    app.post('*/prototype-sept2-2017/fixed-claim-amount', function (req, res) {
        var moment = require('moment');
        req.session.data.total = Number(req.body.timeline_amount_1) + Number(req.body.timeline_amount_2) + Number(req.body.timeline_amount_3) + Number(req.body.timeline_amount_4);
        var interest_1 = parseFloat(((Number(req.body.timeline_amount_1) * Number(moment().diff(moment(req.body.timeline_date_1), 'days')) * Number(req.body.timeline_interest_1)) / (365 * 100)).toFixed(2));
        var interest_2 = parseFloat(((Number(req.body.timeline_amount_2) * Number(moment().diff(moment(req.body.timeline_date_2), 'days')) * Number(req.body.timeline_interest_2)) / (365 * 100)).toFixed(2));
        var interest_3 = parseFloat(((Number(req.body.timeline_amount_3) * Number(moment().diff(moment(req.body.timeline_date_3), 'days')) * Number(req.body.timeline_interest_3)) / (365 * 100)).toFixed(2));
        var interest_4 = parseFloat(((Number(req.body.timeline_amount_4) * Number(moment().diff(moment(req.body.timeline_date_4), 'days')) * Number(req.body.timeline_interest_4)) / (365 * 100)).toFixed(2));

        req.session.data.interestTotal = interest_1 + interest_2 + interest_3 + interest_4;
        res.redirect('claim-details')
    });

    app.post('*/prototype-sept2-2017/personal-injury', function (req, res) {
        res.redirect('housing-disrepair')
    });

    app.post('*/prototype-sept2-2017/housing-disrepair', function (req, res) {
        res.redirect('claim-details')
    });

    app.post('*/prototype-sept2-2017/claim-details', function (req, res) {
        if (req.session.data.typeOfClaim === 'specified') {
            res.redirect('claim-total')
        }
        else {
            res.redirect('claim-amount')
        }
    });

    app.post('*/prototype-sept2-2017/claim-amount', function (req, res) {
        res.redirect('claim-total')
    });

    app.get('*/prototype-sept2-2017/claim-total', function (req, res) {
        var value = 0;
        var total = Number(req.session.data.total);
        if (req.session.data.typeOfClaim === 'specified') {
            value = Number(req.session.data.total) + req.session.data.interestTotal;
        } else {
            value = Number(req.session.data.higher_value)
        }

        var issueFeeAmount = 10000
        switch (true) {
            case (value <= 300):
                issueFeeAmount = 35
                break;
            case (value <= 500):
                issueFeeAmount = 50
                break;
            case (value <= 1000):
                issueFeeAmount = 70
                break;
            case (value <= 1500):
                issueFeeAmount = 80
                break;
            case (value <= 3000):
                issueFeeAmount = 115
                break;
            case (value <= 5000):
                issueFeeAmount = 205
                break;
            case (value <= 10000):
                issueFeeAmount = 455
                break;
            case (value > 10000):
                issueFeeAmount = value * .05
                break;
            case (value > 200000):
                issueFeeAmount = 10000
                break;
            default:
                issueFeeAmount = 410
        }

        req.session.data.issueFeeAmount = issueFeeAmount;
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

            res.render('prototype-sept2-2017/claim-total', { issueFeeAmount: formatter.format(issueFeeAmount), claimType: req.session.data.typeOfClaim, total: formatter.format(value), fee: formatter.format(fee)})
        }
        else {
            res.render('prototype-sept2-2017/claim-total', { issueFeeAmount: formatter.format(issueFeeAmount) })
        }
    });

    app.post('*/prototype-sept2-2017/claim-total', function (req, res) {
        res.redirect('claim-details-summary')
    })

    app.get('*/prototype-sept2-2017/claim-details-summary', function (req, res) {
        var defendants = req.session.defendants || [];
        var formatter = new Intl.NumberFormat('en-GB', {
            style: 'currency',
            currency: 'GBP',
            minimumFractionDigits: 2, /* this might not be necessary */
        });
        res.render('prototype-sept2-2017/claim-details-summary', { issueFeeAmount: req.session.data.issueFeeAmount, defendants: defendants, value: formatter.format(req.session.data.value), claimType: req.session.data.typeOfClaim })
    })

    app.get('*/prototype-sept2-2017/claim-submitted', function (req, res) {
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
        res.render('prototype-sept2-2017/claim-submitted', {today: moment().format('D MMMM YYYY'), claimType: req.session.data.typeOfClaim, issueDate: moment(issueDate).format('D MMMM YYYY'), issueFeeAmount: formatter.format(req.session.data.issueFeeAmount), value: formatter.format(req.session.data.value)  })
    })

    app.get('*/prototype-sept2-2017/pay-by-card', function (req, res) {
        res.render('prototype-sept2-2017/pay-by-card')
    })

    app.get('*/prototype-sept2-2017/pay-by-account', function (req, res) {
        res.render('prototype-sept2-2017/pay-by-account')
    })

    app.get('*/prototype-sept2-2017/email', function (req, res) {
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
        res.render('prototype-sept2-2017/email', {issueDate: moment(issueDate).format('D MMMM YYYY'), issueFeeAmount: formatter.format(req.session.data.issueFeeAmount)})
    })


    app.get('*/prototype-sept2-2017/logout', function (req, res) {
        req.session.destroy()
        res.redirect('login')
    })

}
