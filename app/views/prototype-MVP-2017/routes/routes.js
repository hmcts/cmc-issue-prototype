function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
module.exports = function(app){

    app.post('*/prototype-MVP-2017/login', function(req, res){
        res.redirect('start')
    });

    app.post('*/prototype-MVP-2017/representative-name', function(req, res){
        res.redirect('representative-address')
    });

    app.post('*/prototype-MVP-2017/representative-address', function(req, res){
        res.redirect('representative-contact')
    });

    app.post('*/prototype-MVP-2017/representative-contact', function(req, res){
        res.redirect('claimant-individual-reference')
    });

    app.post('*/prototype-MVP-2017/claimant-individual-reference', function(req, res){
        res.redirect('preferred-court')
    });

    app.post('*/prototype-MVP-2017/preferred-court', function(req, res){
        res.redirect('what-type-of-claimant')
    });

    app.post('*/prototype-MVP-2017/what-type-of-claimant', function(req, res){
        res.redirect('claimant-address')
    });

    app.post('*/prototype-MVP-2017/claimant-address', function(req, res){
        res.redirect('defendant-type')
    });

    app.get('*/prototype-MVP-2017/defendant-type', function(req, res){
        var defendants = req.session.defendants || [];

        res.render('prototype-MVP-2017/defendant-type', { defendants: defendants })
    });

    app.post('*/prototype-MVP-2017/defendant-type', function(req, res){
        res.redirect('defendant-details')
    });

    app.get('*/prototype-MVP-2017/defendant-details', function(req, res){
        var defendants = req.session.defendants || [];

        res.render('prototype-MVP-2017/defendant-details', { defendants: defendants })
    });

    app.post('*/prototype-MVP-2017/defendant-details', function(req, res){
        res.redirect('defendant-represented')
    });

    app.post('*/prototype-MVP-2017/defendant-represented', function(req, res){
        if (req.body.defendantRepresented && req.body.defendantRepresented.toString() === 'yes') {
            res.redirect('defendant-reps-address')
        }
        else {
            res.redirect('defendant-add')
        }
    });

    app.get('*/prototype-MVP-2017/defendant-reps-address', function(req, res){
        var defendants = req.session.defendants || [];

        res.render('prototype-MVP-2017/defendant-reps-address', { defendants: defendants })
    });

    app.post('*/prototype-MVP-2017/defendant-reps-address', function(req, res){
        res.redirect('defendant-add')
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

    app.post('*/prototype-MVP-2017/personal-injury', function(req, res){
        res.redirect('housing-disrepair')
    });

    app.post('*/prototype-MVP-2017/housing-disrepair', function(req, res){
        res.redirect('claim-details')
    });

    app.post('*/prototype-MVP-2017/claim-details', function(req, res){
        res.redirect('claim-amount')
    });

    app.post('*/prototype-MVP-2017/claim-amount', function(req, res){
        res.redirect('claim-total')
    });

    app.get('*/prototype-MVP-2017/claim-total', function (req, res) {
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
        res.redirect('pay-by-account')
    });

    app.post('*/prototype-MVP-2017/pay-by-account', function(req, res){
        res.redirect('claim-submitted')
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

    app.get('*/prototype-MVP-2017/logout', function (req, res) {
        req.session.destroy()
        res.redirect('login')
    })

}
