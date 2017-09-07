module.exports = function(app){

    app.post('*/current-features-to-be-built/login', function(req, res){
        res.redirect('start')
    });

    app.post('*/current-features-to-be-built/representative-name', function(req, res){
        res.redirect('representative-address')
    });

    app.post('*/current-features-to-be-built/representative-address', function(req, res){
        res.redirect('representative-contact')
    });

    app.post('*/current-features-to-be-built/representative-contact', function(req, res){
        res.redirect('claimant-individual-reference')
    });

    app.post('*/current-features-to-be-built/claimant-individual-reference', function(req, res){
        res.redirect('preferred-court')
    });

    app.post('*/current-features-to-be-built/preferred-court', function(req, res){
        res.redirect('what-type-of-claimant')
    });

    app.post('*/current-features-to-be-built/what-type-of-claimant', function(req, res){
        res.redirect('claimant-address')
    });

    app.post('*/current-features-to-be-built/claimant-address', function(req, res){
        res.redirect('claimant-add')
    });

    app.get('*/current-features-to-be-built/claimant-add', function(req, res){
        var claimants = req.session.claimants || [];
        var claimantNo = claimants.length + 1 || 1;
        var claimantName = (req.session.data['claimant_name']) ? req.session.data['claimant_name'] : req.session.data['claimant_company_name']
        var claimantCompanyNumber = (req.session.data['claimant_company_number']) ? req.session.data['claimant_company_number'] : '-'
        var claimantAddress1 = (req.session.data['claimant_AddressLine1']) ? req.session.data['claimant_AddressLine1'] : '-'
        var claimantAddress2 = (req.session.data['claimant_AddressLine2']) ? req.session.data['claimant_AddressLine2'] : ''
        var claimantTown = (req.session.data['claimant_town']) ? req.session.data['claimant_town'] : ''
        var claimantPostcode = (req.session.data['claimant_postcode']) ? req.session.data['claimant_postcode'] : ''
        var claimantAddress = claimantAddress1 + ' ' + claimantAddress2 + ' ' + claimantTown + ' ' + claimantPostcode
        claimants.push({'claimantNo': claimantNo, 'claimantName': claimantName, 'claimantCompanyNumber': claimantCompanyNumber, 'claimantAddress': claimantAddress})

        req.session.claimants = claimants
        res.render('current-features-to-be-built/claimant-add', { claimants: claimants })
    });

    app.post('*/current-features-to-be-built/claimant-add', function(req, res){
        if (req.body.addClaimant.toString() === 'yes') {
            req.session.data['claimant_name'] = req.session.data['claimant_title'] = req.session.data['claimant_company_name'] = req.session.data['claimant_AddressLine1'] = req.session.data['claimant_AddressLine2'] = undefined
            req.session.data['claimant_town'] = req.session.data['claimant_postcode'] = req.session.data['claimantType'] = undefined

            res.redirect('what-type-of-claimant')
        }
        else {
            res.redirect('defendant-type')
        }
    });

    app.get('*/current-features-to-be-built/defendant-type', function(req, res){
        var defendants = req.session.defendants || [];

        res.render('current-features-to-be-built/defendant-type', { defendants: defendants })
    });

    app.post('*/current-features-to-be-built/defendant-type', function(req, res){
        res.redirect('defendant-details')
    });

    app.get('*/current-features-to-be-built/defendant-details', function(req, res){
        var defendants = req.session.defendants || [];

        res.render('current-features-to-be-built/defendant-details', { defendants: defendants })
    });

    app.post('*/current-features-to-be-built/defendant-details', function(req, res){
        res.redirect('defendant-represented')
    });

    app.post('*/current-features-to-be-built/defendant-represented', function(req, res){
        if (req.body.defendantRepresented && req.body.defendantRepresented.toString() === 'yes') {
            res.redirect('defendant-reps-address')
        }
        else {
            res.redirect('defendant-add')
        }
    });

    app.get('*/current-features-to-be-built/defendant-reps-address', function(req, res){
        var defendants = req.session.defendants || [];

        res.render('current-features-to-be-built/defendant-reps-address', { defendants: defendants })
    });

    app.post('*/current-features-to-be-built/defendant-reps-address', function(req, res){
        res.redirect('defendant-add')
    });


    app.get('*/current-features-to-be-built/defendant-add', function(req, res){
        var defendants = req.session.defendants || [];
        var defendantNo = defendants.length + 1 || 1;
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
        res.render('current-features-to-be-built/defendant-add', { defendants: defendants })
    });

    app.post('*/current-features-to-be-built/defendant-add', function(req, res){
        if (req.body.addDefendant.toString() === 'yes') {
            req.session.data['defendant_name'] = req.session.data['defendant_rep_company'] = req.session.data['defendant_address1'] = req.session.data['defendant_address2'] = undefined
            req.session.data['defendant_town'] = req.session.data['defendant_postcode'] = req.session.data['defendant_service_address1'] = req.session.data['defendant_service_address2'] = undefined
            req.session.data['defendant_service_city'] = req.session.data['defendant_service_postcode'] = req.session.data['defendant_company_name'] = req.session.data['defendantType'] = undefined
            req.session.data['defendantRepresented'] = req.session.data['defendant_title'] = req.session.data['defendantService'] = req.session.data['accept-service'] = undefined

            res.redirect('defendant-type')
        }
        else {
            res.redirect('personal-injury')
        }
    });

    app.post('*/current-features-to-be-built/personal-injury', function(req, res){
        res.redirect('housing-disrepair')
    });

    app.post('*/current-features-to-be-built/housing-disrepair', function(req, res){
        res.redirect('claim-details')
    });

    app.post('*/current-features-to-be-built/claim-details', function(req, res){
        res.redirect('claim-amount')
    });

    app.post('*/current-features-to-be-built/claim-amount', function(req, res){
        res.redirect('claim-total')
    });

    app.get('*/current-features-to-be-built/claim-total', function (req, res) {
        var amount = 10000
        if (req.session.data["higher_value"]) {
            var higherValue = parseFloat(req.session.data["higher_value"])
            switch(true) {
                case (higherValue <= 300):
                    amount = 35
                    break;
                case (higherValue <= 500):
                    amount = 50
                    break;
                case (higherValue <= 1000):
                    amount = 70
                    break;
                case (higherValue <= 1500):
                    amount = 80
                    break;
                case (higherValue <= 3000):
                    amount = 115
                    break;
                case (higherValue <= 5000):
                    amount = 205
                    break;
                case (higherValue <= 10000):
                    amount = 455
                    break;
                case (higherValue > 10000):
                    amount = higherValue * .05
                    break;
                case (higherValue > 200000):
                    amount = 10000
                    break;
                default:
                    amount = 410
            }
        }
        req.session.data.amount = amount;
        res.render('current-features-to-be-built/claim-total', { amount: amount})
    });

    app.post('*/current-features-to-be-built/claim-total', function (req, res) {
        res.redirect('claim-details-summary')
    })

    app.get('*/current-features-to-be-built/claim-details-summary', function (req, res) {
        var defendants = req.session.defendants || [];
        var claimants = req.session.claimants || [];
        res.render('current-features-to-be-built/claim-details-summary', { amount: req.session.data.amount, claimants: claimants, defendants: defendants })
    })

    app.post('*/current-features-to-be-built/claim-details-summary', function (req, res) {
        res.redirect('statement-of-truth')
    })

    app.post('*/current-features-to-be-built/statement-of-truth', function(req, res){
        res.redirect('pay-by-account')
    });

    app.post('*/current-features-to-be-built/pay-by-account', function(req, res){
        res.redirect('claim-submitted')
    });

    app.get('*/current-features-to-be-built/claim-submitted', function (req, res) {
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
        res.render('current-features-to-be-built/claim-submitted', {today: moment().format('D MMMM YYYY'), issueDate: moment(issueDate).format('D MMMM YYYY'), amount: formatter.format(req.session.data.amount) })
    })

    app.get('*/current-features-to-be-built/pay-by-card', function (req, res) {
        res.render('current-features-to-be-built/pay-by-card', {amount: req.session.data.amount })
    })

    app.get('*/current-features-to-be-built/pay-by-account', function (req, res) {
        res.render('current-features-to-be-built/pay-by-account', {amount: req.session.data.amount })
    })

    app.get('*/current-features-to-be-built/logout', function (req, res) {
        req.session.destroy()
        res.redirect('login')
    })

}
