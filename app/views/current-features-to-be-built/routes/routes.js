module.exports = function(app){

    app.get('*/current-features-to-be-built/claimant-name', function(req, res){
        var claimants = req.session.claimants || [];

        res.render('current-features-to-be-built/claimant-name', { claimants: claimants })
    });

    app.post('*/current-features-to-be-built/claimant-name', function(req, res){
        var claimants = req.session.claimants || [];

        if (!req.session.data['claimant_name'] ) {
            res.render('current-features-to-be-built/claimant-name', { claimants: claimants })
        }
        else {
            res.redirect('claimant-address')
        }
    });

    app.get('*/current-features-to-be-built/claimant-address', function(req, res){
        var claimants = req.session.claimants || [];

        res.render('current-features-to-be-built/claimant-address', { claimants: claimants })
    });


    app.post('*/current-features-to-be-built/claimant-add', function(req, res){

        if (req.body.addClaimant === undefined) {
            var claimants = req.session.claimants || [];
            var claimantNo = claimants.length + 1;
            var claimantName = (req.session.data['claimant_name']) ? req.session.data['claimant_name'] : req.session.data['claimant_company_name']
            var claimantCompanyNumber = (req.session.data['claimant_company_number']) ? req.session.data['claimant_company_number'] : '-'
            var claimantAddress1 = (req.session.data['claimant_AddressLine1']) ? req.session.data['claimant_AddressLine1'] : '-'
            var claimantAddress2 = (req.session.data['claimant_AddressLine2']) ? req.session.data['claimant_AddressLine2'] : ''
            var claimantTown = (req.session.data['claimant_city']) ? req.session.data['claimant_city'] : ''
            var claimantPostcode = (req.session.data['claimant_Postcode']) ? req.session.data['claimant_Postcode'] : ''
            var claimantAddress = claimantAddress1 + ' ' + claimantAddress2 + ' ' + claimantTown + ' ' + claimantPostcode
            claimants.push({'claimantNo': claimantNo, 'claimantName': claimantName, 'claimantCompanyNumber': claimantCompanyNumber, 'claimantAddress': claimantAddress})

            req.session.claimants = claimants
            res.render('current-features-to-be-built/claimant-add', { claimants: claimants })
        } else if (req.body.addClaimant && req.body.addClaimant.toString() === 'yes') {
            req.session.data['claimant_name'] = req.session.data['claimant_rep_company'] = req.session.data['claimant_AddressLine1'] = req.session.data['claimant_AddressLine2'] = undefined
            req.session.data['claimant_city'] = req.session.data['claimant_Postcode'] = req.session.data['claimant_company_name'] = req.session.data['claimantType'] = req.session.data['claimant_title'] = undefined

            res.redirect('claimant-name')
        } else {
            res.redirect('defendant-type');
        }

    });





 

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
        res.redirect('claimant-name')
    });

    app.post('*/current-features-to-be-built/claimant-name', function(req, res){
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
        if (req.body.addClaimant && req.body.addClaimant.toString() === 'yes') {
            req.session.data['claimant_name'] = req.session.data['claimant_title'] = req.session.data['claimant_company_name'] = req.session.data['claimant_AddressLine1'] = req.session.data['claimant_AddressLine2'] = undefined
            req.session.data['claimant_town'] = req.session.data['claimant_postcode'] = req.session.data['claimantType'] = undefined

            res.redirect('claimant-name')
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
            res.redirect('defendants-service-address')
        }
    });

    app.get('*/current-features-to-be-built/defendants-service-address', function(req, res){
        res.render('current-features-to-be-built/defendants-service-address')
    });

    app.post('*/current-features-to-be-built/defendants-service-address', function(req, res){
        res.redirect('defendant-add')
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
        if (req.body.addDefendant && req.body.addDefendant.toString() === 'yes') {
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

    app.post('*/current-features-to-be-built/choose-how-to-pay', function (req, res) {
        if (!req.body.paymentType) {
            res.render('current-features-to-be-built/choose-how-to-pay')
        }
        else if (req.body.paymentType == 'card') {
            res.redirect('pay-by-card')
        } else {
            res.redirect('pay-by-account')
        }
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



    app.get('*/current-features-to-be-built/certificate', function(req, res){

        var defendants = req.session.defendants || getDummyDefendants();
        req.session.uploads = [];

        //check if we've deleted any defs on a previous journey, and reset if so
        for (i=0; i<defendants.length; i++ ) {
            if (defendants[i].defendantNo != i+1) {
                defendants = getDummyDefendants();
                req.session.defendants = defendants;
                break;
            }
        }
        if (defendants[0].defendantName == 'Jan Clarke' && defendants.length < 3) {
            defendants = getDummyDefendants();
            req.session.defendants = defendants;
        }


        req.session.defendant = defendants[0];
        req.session.defendants = defendants;

        res.render('current-features-to-be-built/certificate/index', { defendant: req.session.defendant })
    });


    app.get('*/current-features-to-be-built/certificate/upload', function(req, res){
        var defendant = req.session.defendant || getDummyDefendant();
        req.session.documents = req.body.documents || getDummyDocuments();
        documents = req.session.documents;

        res.render('current-features-to-be-built/certificate/upload', { defendant: defendant, documents: documents, uploads: req.session.uploads });

    });


    app.post('*/current-features-to-be-built/certificate/upload', function(req, res){
        var defendant = req.session.defendant || getDummyDefendant();

        if ( req.body.documents ) {
            req.session.documents = req.body.documents;

            res.render('current-features-to-be-built/certificate/upload', { defendant: defendant, documents: req.session.documents, others: req.body['other-doc'] });
        } else if ( defendant.defendantType == 'company' && defendant.solicitor == '-' ) {
            res.render('current-features-to-be-built/certificate/who', { defendant: defendant })
        } else {
            res.render('current-features-to-be-built/certificate/how', { defendant: defendant })
        }

    });


    app.get('*/current-features-to-be-built/certificate/upload-js', function(req, res){
        var defendant = req.session.defendant || getDummyDefendant();
        req.session.documents = req.body.documents || getDummyDocuments();
        documents = req.session.documents;

        res.render('current-features-to-be-built/certificate/upload-js', { defendant: defendant, documents: documents, uploads: req.session.uploads });

    });


    app.get('*/current-features-to-be-built/certificate/who', function(req, res){

        if ( req.session.defendant) {
            defendant = req.session.defendant;
        } else {
            arrDummyDefendants = getDummyDefendants();
            defendant = arrDummyDefendants[2];
        }

        res.render('current-features-to-be-built/certificate/who', { defendant: defendant })
    });


    app.post('*/current-features-to-be-built/certificate/who', function(req, res){
        var defendant = req.session.defendant || getDummyDefendant();
        var defendants = req.session.defendants || getDummyDefendants();

        if ( req.body['addressed-to'] || req.body['addressed-role'] ) {
            defendant.addressedTo = req.body['addressed-to'];
            defendant.addressedRole = req.body['addressed-role'];
            req.session.defendants = updateDefendant(defendant, defendants);
        }
        res.render('current-features-to-be-built/certificate/how', { defendant: defendant })
    });


    app.get('*/current-features-to-be-built/certificate/how', function(req, res){
        var defendant = req.session.defendant || getDummyDefendant();

        res.render('current-features-to-be-built/certificate/how', { defendant: defendant })
    });

    app.post('*/current-features-to-be-built/certificate/how', function(req, res){
        var defendant = req.session.defendant || getDummyDefendant();
        if (req.body['files']) {
            req.session.files = req.body['files'].substring( 0, req.body['files'].length-1).split("|");
        } else {
            req.session.files = getDummyFiles();
        }

        if ( defendant.defendantType == 'company' && defendant.solicitor == '-' ) {
            res.render('current-features-to-be-built/certificate/who', { defendant: defendant })
        } else {
            res.render('current-features-to-be-built/certificate/how', { defendant: defendant })
        }
    });

    app.get('*/current-features-to-be-built/certificate/when', function(req, res){
        var defendant = req.session.defendant || getDummyDefendant();

        res.render('current-features-to-be-built/certificate/when', { defendant: defendant })
    });

    app.get('*/current-features-to-be-built/certificate/check-your-answers', function(req, res){
        var defendants = req.session.defendants || getDummyDefendants();
        var documents = req.session.documents || getDummyDocuments();
        var files = req.session.files || getDummyFiles();
        var orgName = req.session.orgName || 'My Solicitor Firm';

        res.render('current-features-to-be-built/certificate/check-your-answers', { documents: documents, defendants: defendants, files: files, orgName: orgName })
    });


    app.post('*/current-features-to-be-built/certificate/where', function(req, res){
        var defendant = req.session.defendant || getDummyDefendant();
        var defendants = req.session.defendants || getDummyDefendants();

        if ( req.body['how-served']) {
            defendant.howServed = req.body['how-served'];
            req.session.defendants = updateDefendant(defendant, defendants);
            res.render('current-features-to-be-built/certificate/where', { defendant: defendant, howServed: req.body['how-served'] });
        }

    });
    app.get('*/current-features-to-be-built/certificate/where', function(req, res){
        var defendants = req.session.defendants || getDummyDefendants();
        var defendant = req.session.defendant || defendants[0];

        res.render('current-features-to-be-built/certificate/where', { defendant: defendant, howServed: req.body['how-served'] });

    });

    app.post('*/current-features-to-be-built/certificate/when', function(req, res){

        var defendants = req.session.defendants || getDummyDefendants();
        var defendant = req.session.defendant || defendants[0];

        var documents = req.session.documents || getDummyDocuments();
        var files = req.session.files || getDummyFiles();
        var orgName = req.session.orgName || 'My Solicitor Firm';

        if ( req.body['destination'] || typeof req.body['email-address'] !== 'undefined') {

            if (req.body['left-with']) {
                defendant.leftWith = req.body['left-with'];
            } else if (req.body['dx-address']) {
                defendant.serviceDX = req.body['dx-address'];
            } else if (req.body['email-address']) {
                defendant.serviceEmail = req.body['email-address'];
            } else if (req.body['fax-number']) {
                defendant.serviceFax = req.body['fax-number'];
            } else {
                defendant.destination = req.body['destination'];
            }

            req.session.defendants = updateDefendant(defendant, defendants);

            blnShowTime = ( defendant.howServed == 'Email' || defendant.howServed == 'Fax' || defendant.howServed == 'Other electronic method' || defendant.howServed == 'Personally handed to or left with recipient');
            res.render('current-features-to-be-built/certificate/when', { defendant: defendant, blnShowTime: blnShowTime, howServed: defendant.howServed });
        } else {

            if ( req.body['day']) {
                defendant.serveDay = req.body['day'];
                defendant.serveMonth = req.body['month'];
                defendant.serveMonthWord = getMonth( req.body['month']-1 );
                defendant.serveYear = req.body['year'];
                defendant.serveDate = req.body['service-value-field'];

                if ( req.body['hour']) {
                    defendant.serveHour = req.body['hour'];
                    defendant.serveMinutes = req.body['minutes'];
                    defendant.amPm = req.body['am-pm'];
                } else {
                    defendant.serveHour = '';
                    defendant.serveMinutes = '';
                    defendant.amPm = '';
                }

                req.session.defendants = updateDefendant(defendant, defendants);
            }

            // last one
            if ( defendant.defendantNo == defendants[defendants.length-1].defendantNo ) {
                res.render('current-features-to-be-built/certificate/check-your-answers', { documents: documents, defendants: defendants, files: files, orgName: orgName });
            } else {

                //find the next one and go again
                var defendants = req.session.defendants || getDummyDefendants();

                for ( i=0; i<defendants.length; i++ ) {
                    if ( defendants[i].defendantNo == defendant.defendantNo ) {

                        req.session.defendant = defendants[i+1];

                        if ( req.session.defendant.defendantType == 'company' && req.session.defendant.solicitor == '-' ) {
                            res.render('current-features-to-be-built/certificate/who', { defendant: req.session.defendant })
                        } else {
                            res.render('current-features-to-be-built/certificate/how', { defendant: req.session.defendant })
                        }

                        break;
                    }
                }

            }
        }
    });

    app.post('*/current-features-to-be-built/certificate/submitted', function(req, res){
        var defendants = req.session.defendants || getDummyDefendants();

        res.render('current-features-to-be-built/certificate/submitted', { defendants: defendants })
    });

    app.get('*/current-features-to-be-built/certificate/submitted', function(req, res){
        var defendants = req.session.defendants || getDummyDefendants();

        res.render('current-features-to-be-built/certificate/submitted', { defendants: defendants })
    });

    app.get('*/current-features-to-be-built/certificate/view', function(req, res){
        var defendants = req.session.defendants || getDummyDefendants();
        var documents = req.session.documents || getDummyDocuments();
        var files = req.session.files || getDummyFiles();
        var orgName = req.session.orgName || 'My Solicitor Firm';

        res.render('current-features-to-be-built/certificate/view', { documents: documents, defendants: defendants, files: files, orgName: orgName })
    });

}


function getDummyDefendants() {

    var moment = require('moment');
    var today = moment();

    return [ { defendantNo: 1, defendantType: 'trader', defendantName: 'Jan Clarke trading as Clarke Construction', defendantAddress: '115 EASTWICK PARK AVENUE LEATHERHEAD KT23 3NW', solicitor: '-', serviceAddress: '115 EASTWICK PARK AVENUE\nLEATHERHEAD\nKT23 3NW', defendantCountry: 'England', howServed: 'First class post', destination: 'usual residence', serveDay: today.clone().subtract(2, 'days').format('D'), serveMonth: today.clone().subtract(2, 'days').format('MM'), serveMonthWord: today.clone().subtract(2, 'days').format('MMMM'), serveYear: today.clone().subtract(2, 'days').format('YYYY'), serveDate: today.clone().format('DD MMMM YYYY') }, { defendantNo: 2,  defendantType: 'company', defendantName: 'Goddard Plumbing', defendantAddress: '30 LONGBRIDGE ROAD\n HORLEY\n RH6 7EL', solicitor: 'Keoghs LLP', serviceAddress: '2 COLCHESTER STREET\n COVENTRY\n CV1 5NZ', defendantCountry: 'England', howServed: 'Fax', serviceFax: '01483 562742', destination: 'place of business', serveDay: today.clone().subtract(2, 'days').format('D'), serveMonth: today.clone().subtract(2, 'days').format('MM'), serveMonthWord: today.clone().subtract(2, 'days').format('MMMM'), serveYear: today.clone().subtract(2, 'days').format('YYYY'), serveDate: today.clone().subtract(1, 'days').format('DD MMMM YYYY'), serveHour: '6', serveMinutes: '23', amPm: 'PM' }, { defendantNo: 3,  defendantType: 'company', defendantName: 'Kingsley Building Ltd', defendantAddress: '31 TANGLEY LANE GUILDFORD GU3 3JU', solicitor: '-', serviceAddress: '31 TANGLEY LANE\n GUILDFORD\n GU3 3JU', defendantCountry: 'England', howServed: 'Personally handed to or left with with recipient', addressedTo: 'Jimmy Smith', addressedRole: 'Director', leftWith: 'Dave Smith', destination: 'principal place of business', serveDay: today.clone().subtract(2, 'days').format('D'), serveMonth: today.clone().subtract(2, 'days').format('MM'), serveMonthWord: today.clone().subtract(2, 'days').format('MMMM'), serveYear: today.clone().subtract(2, 'days').format('YYYY'), serveDate: today.clone().format('D MMMM YYYY') } ];
}

function getDummyDefendant() {
    var arrDummyDefendants = getDummyDefendants();
    return arrDummyDefendants[0];
}

function getDummyDocuments() {
    return [ 'Claim form', 'Particulars of claim', 'Response pack', 'Medical reports', 'Schedule of loss' ];
//    return [ 'Claim form', 'Particulars of claim', 'Response pack', 'Medical reports'  ];
}

function getDummyFiles() {
    return [ 'Particulars of claim.pdf', 'Medical report.jpg', 'Schedule of loss.xls' ];
}


function updateDefendant( defendant, defendants ) {

    if (defendants) {
        for ( i=0; defendants.length; i++ ) {
            if ( defendants[i].defendantNo == defendant.defendantNo ) {
                defendants[i] = defendant;
                break;
            }
        }
    }
    return defendants;
}

function getMonth( intMonth ) {
    var arrMonths = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];
    return arrMonths[ parseInt(intMonth, 10) ];
}

