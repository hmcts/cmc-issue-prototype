function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
module.exports = function(app){

    app.post('*/prototype-MVP-2017/login', function(req, res){
        var form = req.body;
        var errors = [];

        if (form.username != 'username' || form.password != 'password') {
            errors.push({fieldName: 'username', message: "Incorrect username or password" });
            res.render('prototype-MVP-2017/login', { errors: errors })
        } else if (form.username.length > 255) {
            errors.push({fieldName: 'username', message: "You’ve entered too many characters" });
            res.render('prototype-MVP-2017/login', { errors: errors })
        }
        else {
            res.redirect('start')
        }
    });

    app.post('*/prototype-MVP-2017/representative-name', function(req, res){
        var form = req.body;
        var errors = [];

        if (form.rep_company_name === undefined || form.rep_company_name === '') {
            errors.push({fieldName: 'rep_company_name', message: "Enter your company name" });
            res.render('prototype-MVP-2017/representative-name', { errors: errors })
        } else if (form.rep_company_name.length > 255) {
            errors.push({fieldName: 'username', message: "You’ve entered too many characters" });
            res.render('prototype-MVP-2017/representative-name', { errors: errors })
        }
        else {
            res.redirect('representative-address')
        }
    });

    app.post('*/prototype-MVP-2017/representative-address', function(req, res){
        var form = req.body;
        var errors = [];

        if (form.rep_AddressLine1 === undefined || form.rep_AddressLine1 === '') {
            errors.push({fieldName: 'rep_AddressLine1', message: "Enter address line 1" });
        } else if (form.rep_AddressLine1.length > 100) {
            errors.push({fieldName: 'rep_AddressLine1', message: "You’ve entered too many characters" });
        }

        if (form.rep_AddressLine2.length > 100) {
            errors.push({fieldName: 'rep_AddressLine2', message: "You’ve entered too many characters" });
        }

        if (form.rep_city.length > 100) {
            errors.push({fieldName: 'rep_city', message: "You’ve entered too many characters" });
        }

        if (form.rep_Postcode === undefined || form.rep_Postcode === '') {
            errors.push({fieldName: 'rep_Postcode', message: "Enter a postcode" });
        } else if (form.rep_Postcode.length > 8) {
            errors.push({fieldName: 'rep_Postcode', message: "You’ve entered too many characters" });
        }

        if (errors.length === 0) {
            res.redirect('representative-contact')
        } else {
            res.render('prototype-MVP-2017/representative-address', { errors: errors })
        }
    });

    app.post('*/prototype-MVP-2017/representative-contact', function(req, res){
        var form = req.body;
        var errors = [];

        var value = form.rep_phone_number.replace(/\(|\)| |-|\+/g, '').replace(/^(00)?44/, '').replace(/^0/, '').replace(/[^0-9.]/g, '')
        var firstChar = value.charAt(0)

        if (form.rep_phone_number === '' || (firstChar <= '9' && firstChar > '0' && ( value.length === 10 || value.length === 9 || value.length === 7))) {
        } else {
            errors.push({fieldName: 'rep_phone_number', message: "Enter a valid phone number" });
        }

        if (form.rep_email !== '' && !validateEmail(form.rep_email)) {
            errors.push({fieldName: 'rep_email', message: "Enter a valid email address" });
        }

        if (form.rep_dx_number.length > 255) {
            errors.push({fieldName: 'rep_dx_number', message: "You’ve entered too many characters" });
        }

        if (errors.length === 0) {
            res.redirect('claimant-individual-reference')
        } else {
            res.render('prototype-MVP-2017/representative-contact', { errors: errors })
        }
    });

    app.post('*/prototype-MVP-2017/claimant-individual-reference', function(req, res){
        var form = req.body;
        var errors = [];

        if (form.claimant_individual_reference.length > 25) {
            errors.push({fieldName: 'claimant_individual_reference', message: "You’ve entered too many characters" });
        }

        if (errors.length === 0) {
            res.redirect('preferred-court')
        } else {
            res.render('prototype-MVP-2017/claimant-individual-reference', { errors: errors })
        }
    });

    app.post('*/prototype-MVP-2017/preferred-court', function(req, res){
        var form = req.body;
        var errors = [];

        if (form.county_court.length > 80) {
            errors.push({fieldName: 'county_court', message: "You’ve entered too many characters" });
        }

        if (errors.length === 0) {
            res.redirect('what-type-of-claimant')
        } else {
            res.render('prototype-MVP-2017/preferred-court', { errors: errors })
        }
    });

    app.post('*/prototype-MVP-2017/what-type-of-claimant', function(req, res){
        var form = req.body;
        var errors = [];

        if (form.claimantType === undefined) {
            errors.push({fieldName: 'claimantType', message: "Choose a type of claimant" });
        }

        if (form.claimantType === 'company' && form.claimant_company_name === '') {
            errors.push({fieldName: 'claimant_company_name', message: "Enter an organisation name" });
        } else if (form.claimantType === 'company' && form.claimant_company_name.length > 255) {
            errors.push({fieldName: 'claimant_company_name', message: "You’ve entered too many characters" });
        }

        if (form.claimantType === 'company' && form.claimant_company_number.length > 8) {
            errors.push({fieldName: 'claimant_company_number', message: "You’ve entered too many characters" });
        }

        if (form.claimantType === 'individual' && form.claimant_title === '') {
            errors.push({fieldName: 'claimant_title', message: "Enter a title" });
        } else if (form.claimantType === 'individual' && form.claimant_title.length > 35) {
            errors.push({fieldName: 'claimant_title', message: "You’ve entered too many characters" });
        }

        if (form.claimantType === 'individual' && form.claimant_name === '') {
            errors.push({fieldName: 'claimant_name', message: "Enter a full name" });
        } else if (form.claimantType === 'individual' && form.claimant_name.length > 70) {
            errors.push({fieldName: 'claimant_name', message: "You’ve entered too many characters" });
        }

        if (errors.length === 0) {
            res.redirect('claimant-address')
        } else {
            res.render('prototype-MVP-2017/what-type-of-claimant', { errors: errors })
        }
    });

    app.post('*/prototype-MVP-2017/claimant-address', function(req, res){
        var form = req.body;
        var errors = [];

        if (form.claimant_AddressLine1 === undefined || form.claimant_AddressLine1 === '') {
            errors.push({fieldName: 'claimant_AddressLine1', message: "Enter address line 1" });
        } else if (form.claimant_AddressLine1.length > 100) {
            errors.push({fieldName: 'claimant_AddressLine1', message: "You’ve entered too many characters" });
        }

        if (form.claimant_AddressLine2.length > 100) {
            errors.push({fieldName: 'claimant_AddressLine2', message: "You’ve entered too many characters" });
        }

        if (form.claimant_city.length > 100) {
            errors.push({fieldName: 'claimant_city', message: "You’ve entered too many characters" });
        }

        if (form.claimant_Postcode === undefined || form.claimant_Postcode === '') {
            errors.push({fieldName: 'claimant_Postcode', message: "Enter a postcode" });
        } else if (form.claimant_Postcode.length > 8) {
            errors.push({fieldName: 'claimant_Postcode', message: "You’ve entered too many characters" });
        }

        if (errors.length === 0) {
            res.redirect('defendant-type')
        } else {
            res.render('prototype-MVP-2017/claimant-address', { errors: errors })
        }
    });

    app.get('*/prototype-MVP-2017/defendant-type', function(req, res){
        var defendants = req.session.defendants || [];

        res.render('prototype-MVP-2017/defendant-type', { defendants: defendants })
    });

    app.post('*/prototype-MVP-2017/defendant-type', function(req, res){
        var form = req.body;
        var defendants = req.session.defendants || [];
        var errors = [];

        if (form.defendantType === undefined) {
            errors.push({fieldName: 'defendantType', message: "Choose a type of defendant" });
        }

        if (form.defendantType === 'company' && form.defendant_company_name === '') {
            errors.push({fieldName: 'defendant_company_name', message: "Enter an organisation name" });
        } else if (form.defendantType === 'company' && form.defendant_company_name.length > 255) {
            errors.push({fieldName: 'defendant_company_name', message: "You’ve entered too many characters" });
        }

        if (form.defendantType === 'company' && form.defendant_company_number.length > 8) {
            errors.push({fieldName: 'defendant_company_number', message: "You’ve entered too many characters" });
        }

        if (form.defendantType === 'individual' && form.defendant_title === '') {
            errors.push({fieldName: 'defendant_title', message: "Enter a title" });
        } else if (form.defendantType === 'individual' && form.defendant_title.length > 35) {
            errors.push({fieldName: 'defendant_title', message: "You’ve entered too many characters" });
        }

        if (form.defendantType === 'individual' && form.defendant_name === '') {
            errors.push({fieldName: 'defendant_name', message: "Enter a full name" });
        } else if (form.defendantType === 'individual' && form.defendant_name.length > 70) {
            errors.push({fieldName: 'defendant_name', message: "You’ve entered too many characters" });
        }

        if (errors.length === 0) {
            res.redirect('defendant-details')
        } else {
            res.render('prototype-MVP-2017/defendant-type', { errors: errors, defendants: defendants })
        }
    });

    app.get('*/prototype-MVP-2017/defendant-details', function(req, res){
        var defendants = req.session.defendants || [];

        res.render('prototype-MVP-2017/defendant-details', { defendants: defendants })
    });

    app.post('*/prototype-MVP-2017/defendant-details', function(req, res){
        var form = req.body;
        var defendants = req.session.defendants || [];
        var errors = [];

        if (form.defendant_address1 === undefined || form.defendant_address1 === '') {
            errors.push({fieldName: 'defendant_address1', message: "Enter address line 1" });
        } else if (form.defendant_address1.length > 100) {
            errors.push({fieldName: 'defendant_address1', message: "You’ve entered too many characters" });
        }

        if (form.defendant_address2.length > 100) {
            errors.push({fieldName: 'defendant_address2', message: "You’ve entered too many characters" });
        }

        if (form.defendant_town.length > 100) {
            errors.push({fieldName: 'defendant_town', message: "You’ve entered too many characters" });
        }

        if (form.defendant_postcode === undefined || form.defendant_postcode === '') {
            errors.push({fieldName: 'defendant_postcode', message: "Enter a postcode" });
        } else if (form.defendant_postcode.length > 8) {
            errors.push({fieldName: 'defendant_postcode', message: "You’ve entered too many characters" });
        }

        if (errors.length === 0) {
            res.redirect('defendant-represented')
        } else {
            res.render('prototype-MVP-2017/defendant-details', { errors: errors, defendants: defendants })
        }
    });

    app.post('*/prototype-MVP-2017/defendant-represented', function(req, res){
        var form = req.body;
        var errors = [];

        if (form.defendantRepresented === undefined) {
            errors.push({fieldName: 'defendantRepresented', message: "Choose yes if defendant is represented" });
        }

        if (errors.length === 0) {
            if (req.body.defendantRepresented.toString() === 'yes') {
                res.redirect('defendant-reps-address')
            }
            else {
                res.redirect('defendant-add')
            }
        } else {
            res.render('prototype-MVP-2017/defendant-represented', { errors: errors })
        }
    });


    app.get('*/prototype-MVP-2017/defendant-reps-address', function(req, res){
        var defendants = req.session.defendants || [];

        res.render('prototype-MVP-2017/defendant-reps-address', { defendants: defendants })
    });

    app.post('*/prototype-MVP-2017/defendant-reps-address', function(req, res){
        var form = req.body;
        var defendants = req.session.defendants || [];
        var errors = [];

        if (form.defendant_rep_company === undefined || form.defendant_rep_company === '') {
            errors.push({fieldName: 'defendant_rep_company', message: "Enter defendant representative company name" });
        } else if (form.defendant_rep_company.length > 255) {
            errors.push({fieldName: 'defendant_rep_company', message: "You’ve entered too many characters" });
        }

        if (form.defendant_service_address1 === undefined || form.defendant_service_address1 === '') {
            errors.push({fieldName: 'defendant_service_address1', message: "Enter address line 1" });
        } else if (form.defendant_service_address1.length > 100) {
            errors.push({fieldName: 'defendant_service_address1', message: "You’ve entered too many characters" });
        }

        if (form.defendant_service_address2.length > 100) {
            errors.push({fieldName: 'defendant_service_address2', message: "You’ve entered too many characters" });
        }

        if (form.defendant_service_city.length > 100) {
            errors.push({fieldName: 'defendant_service_city', message: "You’ve entered too many characters" });
        }

        if (form.defendant_service_postcode === undefined || form.defendant_service_postcode === '') {
            errors.push({fieldName: 'defendant_service_postcode', message: "Enter a postcode" });
        } else if (form.defendant_service_postcode.length > 8) {
            errors.push({fieldName: 'defendant_service_postcode', message: "You’ve entered too many characters" });
        }

        if (errors.length === 0) {
            res.redirect('defendant-add')
        } else {
            res.render('prototype-MVP-2017/defendant-reps-address', { errors: errors, defendants: defendants })
        }
    });


    app.get('*/prototype-MVP-2017/defendant-add', function(req, res){
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
        res.render('prototype-MVP-2017/defendant-add', { defendants: defendants })
    });

    app.post('*/prototype-MVP-2017/defendant-add', function(req, res){
        var defendants = req.session.defendants || [];
        var form = req.body;
        var errors = [];

        if (form.addDefendant === undefined) {
            errors.push({fieldName: 'addDefendant', message: "Choose yes to add another defendant" });
        }

        if (errors.length > 0) {
            res.render('prototype-MVP-2017/defendant-add', { errors: errors, defendants: defendants })
        }
        else if (req.body.addDefendant.toString() === 'yes') {
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

    app.post('*/prototype-MVP-2017/personal-injury', function(req, res){
        var form = req.body;
        var errors = [];

        if (form.personal_injury === undefined) {
            errors.push({fieldName: 'personal_injury', message: "Choose yes if it’s a personal injury claim" });
        }

        if (form.personal_injury === 'yes' && form.pain_value === undefined) {
            errors.push({fieldName: 'pain_value', message: "Choose an amount" });
        }

        if (errors.length === 0) {
            res.redirect('housing-disrepair')
        } else {
            res.render('prototype-MVP-2017/personal-injury', { errors: errors })
        }
    });

    app.post('*/prototype-MVP-2017/housing-disrepair', function(req, res){
        var form = req.body;
        var errors = [];

        if (form.housing_disrepair === undefined) {
            errors.push({fieldName: 'housing_disrepair', message: "Choose yes if the claim is for housing disrepair" });
        }

        if (form.housing_disrepair === 'yes' && form.general_damages === undefined) {
            errors.push({fieldName: 'general_damages', message: "Choose an amount for general damages" });
        }

        if (form.housing_disrepair === 'yes' && form.other_damages === undefined) {
            errors.push({fieldName: 'other_damages', message: "Choose an amount for other damages" });
        }

        if (errors.length === 0) {
            res.redirect('claim-details')
        } else {
            res.render('prototype-MVP-2017/housing-disrepair', { errors: errors })
        }
    });

    app.post('*/prototype-MVP-2017/claim-details', function(req, res){
        var form = req.body;
        var errors = [];

        if (form.claim_details === '') {
            errors.push({fieldName: 'claim_details', message: "Enter a brief description of the claim" });
        } else if (form.claim_details.length > 700) {
            errors.push({fieldName: 'claim_details', message: "You’ve entered too many characters" });
        }

        if (errors.length === 0) {
            res.redirect('claim-amount')
        } else {
            res.render('prototype-MVP-2017/claim-details', { errors: errors })
        }
    });

    app.post('*/prototype-MVP-2017/claim-amount', function(req, res){
        var form = req.body;
        var errors = [];

        if (form.higher_value === '' && form.claim_amount_checkbox[0] !== 'cannot') {
            errors.push({fieldName: 'higher_value', message: "Enter valid higher value" });
        } else if (isNaN(form.higher_value)) {
            errors.push({fieldName: 'higher_value', message: "Enter a maximum two decimal places" });
        }

        if (form.lower_value !== '' && isNaN(form.lower_value) && form.claim_amount_checkbox !== 'cannot') {
            errors.push({fieldName: 'lower_value', message: "Enter a maximum two decimal places" });
        }

        if (form.claim_amount_checkbox[0] === 'cannot' && parseFloat(form.higher_value) > 0) {
            errors.push({fieldName: 'claim_amount_checkbox', message: "Enter a value or choose ‘I can’t state the value’" });
        }

        if (errors.length === 0) {
            res.redirect('claim-total')
        } else {
            res.render('prototype-MVP-2017/claim-amount', { errors: errors })
        }
    });

    app.get('*/prototype-MVP-2017/claim-total', function (req, res) {
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
        req.session.data.amount = amount;
        res.render('prototype-MVP-2017/claim-total', { amount: amount})
    });

    app.post('*/prototype-MVP-2017/claim-total', function (req, res) {
        res.redirect('claim-details-summary')
    })

    app.get('*/prototype-MVP-2017/claim-details-summary', function (req, res) {
        var defendants = req.session.defendants || [];
        res.render('prototype-MVP-2017/claim-details-summary', { amount: req.session.data.amount, defendants: defendants })
    })

    app.post('*/prototype-MVP-2017/claim-details-summary', function (req, res) {
        res.redirect('statement-of-truth')
    })

    app.post('*/prototype-MVP-2017/statement-of-truth', function(req, res){
        var form = req.body;
        var errors = [];

        if (form.signer_name === '') {
            errors.push({fieldName: 'signer_name', message: "Enter the name of the person signing the statement" });
        } else if (form.signer_name.length > 70) {
            errors.push({fieldName: 'signer_name', message: "You’ve entered too many characters" });
        }

        if (form.signer_role === '') {
            errors.push({fieldName: 'signer_role', message: "Enter the role of the person signing the statement" });
        } else if (form.signer_role.length > 255) {
            errors.push({fieldName: 'signer_role', message: "You’ve entered too many characters" });
        }

        if (errors.length === 0) {
            res.redirect('pay-by-account')
        } else {
            res.render('prototype-MVP-2017/statement-of-truth', { errors: errors })
        }
    });

    app.post('*/prototype-MVP-2017/pay-by-account', function(req, res){
        var form = req.body;
        var errors = [];

        if (form.fee_account === '') {
            errors.push({fieldName: 'fee_account', message: "Enter your Fee Account number" });
        } else if (form.fee_account.length != 10) {
            errors.push({fieldName: 'fee_account', message: "Enter a valid Fee Account number" });
        }

        if (errors.length === 0) {
            res.redirect('claim-submitted')
        } else {
            res.render('prototype-MVP-2017/pay-by-account', { errors: errors })
        }
    });

    app.get('*/prototype-MVP-2017/claim-submitted', function (req, res) {
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
        res.render('prototype-MVP-2017/claim-submitted', {today: moment().format('D MMMM YYYY'), issueDate: moment(issueDate).format('D MMMM YYYY'), amount: formatter.format(req.session.data.amount) })
    })

    app.get('*/prototype-MVP-2017/pay-by-card', function (req, res) {
        res.render('prototype-MVP-2017/pay-by-card', {amount: req.session.data.amount })
    })

    app.get('*/prototype-MVP-2017/pay-by-account', function (req, res) {
        res.render('prototype-MVP-2017/pay-by-account', {amount: req.session.data.amount })
    })

}
