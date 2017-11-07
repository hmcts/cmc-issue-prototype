module.exports = function(app){

    app.post('*/prototype-nov-2017/representative-address', function(req, res){
        req.session.orgName = req.body['rep_company_name'];

        res.render('prototype-nov-2017/representative-address');
    });

    app.get('*/prototype-nov-2017/what-type-of-claimant', function(req, res){
        var claimants = req.session.claimants || [];

        res.render('prototype-nov-2017/what-type-of-claimant', { claimants: claimants })
    });

    app.post('*/prototype-nov-2017/what-type-of-claimant', function(req, res){
        var claimants = req.session.claimants || [];

        if (!req.body.claimantType) {
            res.render('prototype-nov-2017/what-type-of-claimant', { claimants: claimants })
        }
        else {
            res.redirect('claimant-address')
        }
    });

    app.get('*/prototype-nov-2017/claimant-address', function(req, res){
        var claimants = req.session.claimants || [];

        res.render('prototype-nov-2017/claimant-address', { claimants: claimants })
    });


    app.post('*/prototype-nov-2017/claimant-add', function(req, res){

        if (req.body.addClaimant === undefined) {
            var claimants = req.session.claimants || [];
            var claimantNo = claimants.length + 1;
            var claimantName = (req.session.data['claimant_name']) ? req.session.data['claimant_name'] : req.session.data['claimant_company_name']
            var claimantAddress1 = (req.session.data['claimant_AddressLine1']) ? req.session.data['claimant_AddressLine1'] : '-'
            var claimantAddress2 = (req.session.data['claimant_AddressLine2']) ? req.session.data['claimant_AddressLine2'] : ''
            var claimantTown = (req.session.data['claimant_city']) ? req.session.data['claimant_city'] : ''
            var claimantPostcode = (req.session.data['claimant_Postcode']) ? req.session.data['claimant_Postcode'] : ''
            var claimantAddress = claimantAddress1 + ' ' + claimantAddress2 + ' ' + claimantTown + ' ' + claimantPostcode
            claimants.push({'claimantNo': claimantNo, 'claimantName': claimantName, 'claimantAddress': claimantAddress})

            req.session.claimants = claimants
            res.render('prototype-nov-2017/claimant-add', { claimants: claimants })
        } else if (req.body.addClaimant && req.body.addClaimant.toString() === 'yes') {
            req.session.data['claimant_name'] = req.session.data['claimant_rep_company'] = req.session.data['claimant_AddressLine1'] = req.session.data['claimant_AddressLine2'] = undefined
            req.session.data['claimant_city'] = req.session.data['claimant_Postcode'] = req.session.data['claimant_company_name'] = req.session.data['claimantType'] = req.session.data['claimant_title'] = undefined

            res.redirect('what-type-of-claimant')
        } else {
            res.redirect('defendant-type');
        }

    });

    app.post('*/prototype-nov-2017/representation', function(req, res){
        if (req.body.representativeType.toString() === 'represent') {
            res.redirect('representatives-details')
        }
        else {
            res.redirect('not-supported')
        }
    });

    app.get('*/prototype-nov-2017/defendants-service-address', function(req, res){
        var defendants = req.session.defendants || [];

        res.render('prototype-nov-2017/defendants-service-address', { defendants: defendants })
    });

    app.get('*/prototype-nov-2017/defendant-type', function(req, res){
        var defendants = req.session.defendants || [];

        res.render('prototype-nov-2017/defendant-type', { defendants: defendants })
    });

    app.post('*/prototype-nov-2017/defendant-type', function(req, res){
        var defendants = req.session.defendants || [];

        if (!req.body.defendantType) {
            res.render('prototype-nov-2017/defendant-type', { defendants: defendants })
        }
        else {
            res.redirect('defendant-details')
        }
    });

    app.get('*/prototype-nov-2017/defendant-details', function(req, res){
        var defendants = req.session.defendants || [];

        res.render('prototype-nov-2017/defendant-details', { defendants: defendants })
    });

    app.post('*/prototype-nov-2017/defendant-represented', function(req, res){
        if (req.body.defendantRepresented === undefined) {
            res.render('prototype-nov-2017/defendant-represented')
        } else if (req.body.defendantRepresented.toString() === 'yes') {
            res.redirect('defendant-reps-address')
        }
        else {
            res.redirect('defendants-service-address')
        }
    });

    app.get('*/prototype-nov-2017/defendant-reps-address', function(req, res){
        var defendants = req.session.defendants || [];

        res.render('prototype-nov-2017/defendant-reps-address', { defendants: defendants })
    });

    app.post('*/prototype-nov-2017/defendant-reps-address', function(req, res){



        if (req.session.data.defendant_service_country ) { 

            if ( req.session.data.defendant_service_country == 'England' || req.session.data.defendant_service_country == 'Wales' )  {
                res.redirect('defendant-add')
            } else if ( req.session.data.defendant_service_country == 'Scotland' || req.session.data.defendant_service_country.toLowerCase() == 'northern ireland' || req.session.data.defendant_service_country.toLowerCase() == 'ni' ||  req.session.data.defendant_service_country.toLowerCase().indexOf('bt') === 0 )  {
                res.redirect('jurisdiction-statements')
            } else {
                res.redirect('jurisdiction-statements-2')
            }


        } else {
             res.redirect('defendant-add')
        }



    });

    app.get('*/prototype-nov-2017/defendants-service-address', function(req, res){
        var defendants = req.session.defendants || [];

        res.render('prototype-nov-2017/defendants-service-address', { defendants: defendants })
    });

    app.post('*/prototype-nov-2017/defendants-service-address', function(req, res){
        if (req.body.defendantService === 'other') {
            res.redirect('defendants-service-address-other')
        }
        else {


                if (req.session.data.defendant_country ) {

                    if ( req.session.data.defendant_country == 'England' || req.session.data.defendant_country == 'Wales' )  {
                        res.redirect('defendant-add')
                    } else if ( req.session.data.defendant_country == 'Scotland' || req.session.data.defendant_country.toLowerCase() == 'northern ireland' || req.session.data.defendant_country.toLowerCase() == 'ni' ||  req.session.data.defendant_Postcode.toLowerCase().indexOf('bt') === 0 )  {
                        res.redirect('jurisdiction-statements')
                    } else {
                        res.redirect('jurisdiction-statements-2')
                    }


                } else {
                     res.redirect('defendant-add')
                }

        }
    });


    app.post('*/prototype-nov-2017/defendants-service-address-other', function(req, res){

        if (req.session.data.defendant_service_country ) {

            if ( req.session.data.defendant_service_country == 'England' || req.session.data.defendant_service_country == 'Wales' )  {
                res.redirect('defendant-add')
            } else if ( req.session.data.defendant_service_country == 'Scotland' || req.session.data.defendant_service_country.toLowerCase() == 'northern ireland' || req.session.data.defendant_service_country.toLowerCase() == 'ni' ||  req.session.data.defendant_service_Postcode.toLowerCase().indexOf('bt') === 0 )  {
                res.redirect('jurisdiction-statements')
            } else {
                res.redirect('jurisdiction-statements-2')
            }


        } else {
             res.redirect('defendant-add')
        }


    });


    app.get('*/prototype-nov-2017/defendant-add', function(req, res){

        if ( req.session.data['defendantType'] == 'trader' ) {
            req.session.data['defendant_name'] = req.session.data['defendant_name2'] + ' trading as ' + req.session.data['defendant_company_name2'];
        }
        var defendants = req.session.defendants || [];
        var defendantNo = defendants.length + 1;
        var defendantType = (req.session.data['defendantType']) ? req.session.data['defendantType'] : ''
        var defendantName = (req.session.data['defendant_name']) ? req.session.data['defendant_name'] : req.session.data['defendant_company_name'];

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
        var defendantCountry = (req.session.data['defendant_country']) ? req.session.data['defendant_country'] : ''
        defendants.push({'defendantNo': defendantNo, 'defendantType': defendantType,  'defendantName': defendantName, 'defendantAddress': defendantAddress, 'solicitor': defendantSolicitorName, 'serviceAddress': defendantServiceAddress, 'defendantCountry': defendantCountry});

        req.session.defendants = defendants;
        res.render('prototype-nov-2017/defendant-add', { defendants: defendants })
    });


    app.post('*/prototype-nov-2017/defendant-add', function(req, res){


        if (req.body.addDefendant && req.body.addDefendant.toString() === 'yes') {
            req.session.data['defendant_name'] = req.session.data['defendant_rep_company'] = req.session.data['defendant_AddressLine1'] = req.session.data['defendant_AddressLine2'] = undefined
            req.session.data['defendant_city'] = req.session.data['defendant_Postcode'] = req.session.data['defendant_service_AddressLine1'] = req.session.data['defendant_service_AddressLine2'] = undefined
            req.session.data['defendant_service_city'] = req.session.data['defendant_service_Postcode'] = req.session.data['defendant_company_name'] = req.session.data['defendantType'] = undefined
            req.session.data['defendantRepresented'] = req.session.data['defendant_title'] = req.session.data['defendantService'] = req.session.data['accept-service'] = undefined

            res.redirect('defendant-type')
        } else {
            res.redirect('type-of-claim');
        }

    });




    app.post('*/prototype-nov-2017/jurisdiction-statements', function(req, res){
        res.redirect('defendant-add');
    });

    app.post('*/prototype-nov-2017/jurisdiction-statements-2', function(req, res){
        res.redirect('defendant-add');
    });

    app.post('*/prototype-nov-2017/type-of-claim', function(req, res){
        if (!req.body.typeOfClaim) {
            res.render('prototype-nov-2017/type-of-claim')
        }
        else if (req.body.typeOfClaim.toString() === 'specified') {
            res.redirect('spec-claim-amount-type')
        }
        else {
            res.redirect('personal-injury')
        }
    });

    // REPEATED BLOCK - delete?
    app.post('*/prototype-nov-2017/defendant-represented', function(req, res){
        if (req.body.defendantRepresented === undefined) {
            res.render('prototype-nov-2017/defendant-represented')
        } else if (req.body.defendantRepresented.toString() === 'yes') {
            res.redirect('defendant-reps-address')
        }
        else {
            res.redirect('defendants-service-address')
        }
    });

    app.post('*/prototype-nov-2017/spec-claim-amount-type', function(req, res){
        if (!req.body.interestTotal) {
            res.render('prototype-nov-2017/spec-claim-amount-type')
        }
        else if (req.body.interestTotal.toString() === 'no') {
            res.redirect('fixed-claim-amount')
        }
        else {
            res.redirect('fixed-claim-amount-total')
        }
    });

    app.post('*/prototype-nov-2017/fixed-claim-amount-total', function(req, res){
        req.session.data.total = Number(req.body.spec_claim_total_amount)
        req.session.data.interestTotal = Number(req.body.spec_claim_total_interest)
        res.redirect('claim-details')
    });

    app.post('*/prototype-nov-2017/choose-how-to-pay', function (req, res) {
        if (!req.body.paymentType) {
            res.render('prototype-nov-2017/choose-how-to-pay')
        }
        else if (req.body.paymentType == 'card') {
            res.redirect('pay-by-card')
        } else {
            res.redirect('pay-by-account')
        }
    });

    // REPEATED BLOCK - delete?
    app.post('*/prototype-nov-2017/defendant-represented', function(req, res){
        if (!req.body.defendantRepresented) {
            res.render('prototype-nov-2017/defendant-represented')
        }
        else if (req.body.defendantRepresented.toString() === 'yes') {
            res.redirect('defendant-reps-address')
        }
        else {
            res.redirect('defendants-service-address')
        }
    });

    app.post('*/prototype-nov-2017/fixed-claim-amount', function (req, res) {
        var moment = require('moment');
        req.session.data.total = Number(req.body.timeline_amount_1) + Number(req.body.timeline_amount_2) + Number(req.body.timeline_amount_3) + Number(req.body.timeline_amount_4);
        var interest_1 = parseFloat(((Number(req.body.timeline_amount_1) * Number(moment().diff(moment(req.body.timeline_date_1), 'days')) * Number(req.body.timeline_interest_1)) / (365 * 100)).toFixed(2));
        var interest_2 = parseFloat(((Number(req.body.timeline_amount_2) * Number(moment().diff(moment(req.body.timeline_date_2), 'days')) * Number(req.body.timeline_interest_2)) / (365 * 100)).toFixed(2));
        var interest_3 = parseFloat(((Number(req.body.timeline_amount_3) * Number(moment().diff(moment(req.body.timeline_date_3), 'days')) * Number(req.body.timeline_interest_3)) / (365 * 100)).toFixed(2));
        var interest_4 = parseFloat(((Number(req.body.timeline_amount_4) * Number(moment().diff(moment(req.body.timeline_date_4), 'days')) * Number(req.body.timeline_interest_4)) / (365 * 100)).toFixed(2));

        req.session.data.interestTotal = interest_1 + interest_2 + interest_3 + interest_4;
        res.redirect('claim-details')
    });

    app.post('*/prototype-nov-2017/personal-injury', function (req, res) {
        res.redirect('housing-disrepair')
    });

    app.post('*/prototype-nov-2017/housing-disrepair', function (req, res) {
        res.redirect('claim-details')
    });

    app.post('*/prototype-nov-2017/claim-details', function (req, res) {
        if (req.session.data.typeOfClaim === 'specified') {
            res.redirect('claim-total')
        }
        else {
            res.redirect('claim-amount')
        }
    });

    app.post('*/prototype-nov-2017/claim-amount', function (req, res) {
        res.redirect('claim-total')
    });

    app.get('*/prototype-nov-2017/claim-total', function (req, res) {
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

            res.render('prototype-nov-2017/claim-total', { issueFeeAmount: formatter.format(issueFeeAmount), claimType: req.session.data.typeOfClaim, total: formatter.format(value), fee: formatter.format(fee)})
        }
        else {
            res.render('prototype-nov-2017/claim-total', { issueFeeAmount: formatter.format(issueFeeAmount) })
        }
    });

    app.post('*/prototype-nov-2017/claim-total', function (req, res) {
        res.redirect('claim-details-summary')
    })

    app.get('*/prototype-nov-2017/claim-details-summary', function (req, res) {
        var defendants = req.session.defendants || [];
        var claimants = req.session.claimants || [];
        var formatter = new Intl.NumberFormat('en-GB', {
            style: 'currency',
            currency: 'GBP',
            minimumFractionDigits: 2, /* this might not be necessary */
        });
        res.render('prototype-nov-2017/claim-details-summary', { issueFeeAmount: req.session.data.issueFeeAmount, defendants: defendants, claimants: claimants, value: formatter.format(req.session.data.value), claimType: req.session.data.typeOfClaim })
    })

    app.get('*/prototype-nov-2017/claim-submitted', function (req, res) {
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

        var objDueDate = moment().add('4', 'months');
        var objConfirmDueDate = moment().add('21', 'days');

        res.render('prototype-nov-2017/claim-submitted', {today: moment().format('D MMMM YYYY'), dueDate: objDueDate.format('D MMMM YYYY'), confirmDueDate: objConfirmDueDate.format('D MMMM YYYY'), claimType: req.session.data.typeOfClaim, issueDate: moment(issueDate).format('D MMMM YYYY'), issueFeeAmount: formatter.format(req.session.data.issueFeeAmount), value: formatter.format(req.session.data.value)  })
    })

    app.get('*/prototype-nov-2017/pay-by-card', function (req, res) {
        res.render('prototype-nov-2017/pay-by-card')
    })

    app.get('*/prototype-nov-2017/pay-by-account', function (req, res) {
        res.render('prototype-nov-2017/pay-by-account')
    })

    app.get('*/prototype-nov-2017/email', function (req, res) {
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
        res.render('prototype-nov-2017/email', {issueDate: moment(issueDate).format('D MMMM YYYY'), issueFeeAmount: formatter.format(req.session.data.issueFeeAmount)})
    })


    app.get('*/prototype-nov-2017/logout', function (req, res) {
        req.session.destroy()
        res.redirect('login')
    })

    app.get('*/prototype-nov-2017/certificate', function(req, res){

        var defendants = req.session.defendants || getDummyDefendants();

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

        res.render('prototype-nov-2017/certificate/index', { defendant: req.session.defendant })
    });

    app.post('*/prototype-nov-2017/certificate/upload', function(req, res){
        var defendant = req.session.defendant || getDummyDefendant();

        req.session.documents = req.body.documents;

        res.render('prototype-nov-2017/certificate/upload', { defendant: defendant, documents: req.body.documents })
    });

    app.get('*/prototype-nov-2017/certificate/upload', function(req, res){
        var defendant = req.session.defendant || getDummyDefendant();
        documents = req.body.documents || req.session.docuements || getDummyDocuments();

        res.render('prototype-nov-2017/certificate/upload', { defendant: defendant, documents: documents })
    });

    app.get('*/prototype-nov-2017/certificate/who', function(req, res){

        if ( req.session.defendant) { 
            defendant = req.session.defendant;
        } else {
            arrDummyDefendants = getDummyDefendants();
            defendant = arrDummyDefendants[2];
        }

        res.render('prototype-nov-2017/certificate/who', { defendant: defendant })
    });


    app.post('*/prototype-nov-2017/certificate/who', function(req, res){
        var defendant = req.session.defendant || getDummyDefendant();
        var defendants = req.session.defendants || getDummyDefendants();

        if ( req.body['addressed-to'] || req.body['addressed-role'] ) {
            defendant.addressedTo = req.body['addressed-to'];
            defendant.addressedRole = req.body['addressed-role'];
            req.session.defendants = updateDefendant(defendant, defendants);
        }
        res.render('prototype-nov-2017/certificate/how', { defendant: defendant })
    });


    app.get('*/prototype-nov-2017/certificate/how', function(req, res){
        var defendant = req.session.defendant || getDummyDefendant();

        res.render('prototype-nov-2017/certificate/how', { defendant: defendant })
    });

    app.post('*/prototype-nov-2017/certificate/how', function(req, res){
        var defendant = req.session.defendant || getDummyDefendant();
        if (req.body['files']) {
            req.session.files = req.body['files'].substring( 0, req.body['files'].length-1).split("|");            
        } else {
            req.session.files = getDummyFiles();
        }

        if ( defendant.defendantType == 'company' && defendant.solicitor == '-' ) {
            res.render('prototype-nov-2017/certificate/who', { defendant: defendant })
        } else {
            res.render('prototype-nov-2017/certificate/how', { defendant: defendant })
        }
    });

    app.get('*/prototype-nov-2017/certificate/when', function(req, res){
        var defendant = req.session.defendant || getDummyDefendant();

        res.render('prototype-nov-2017/certificate/when', { defendant: defendant })
    });

    app.get('*/prototype-nov-2017/certificate/check-your-answers', function(req, res){
        var defendants = req.session.defendants || getDummyDefendants();
        var documents = req.session.documents || getDummyDocuments();
        var files = req.session.files || getDummyFiles();
        var orgName = req.session.orgName || 'My Solicitor Firm';

        res.render('prototype-nov-2017/certificate/check-your-answers', { documents: documents, defendants: defendants, files: files, orgName: orgName })
    });


    app.post('*/prototype-nov-2017/certificate/where', function(req, res){
        var defendant = req.session.defendant || getDummyDefendant();
        var defendants = req.session.defendants || getDummyDefendants();

        if ( req.body['how-served']) {
            defendant.howServed = req.body['how-served'];
            req.session.defendants = updateDefendant(defendant, defendants);
            res.render('prototype-nov-2017/certificate/where', { defendant: defendant, howServed: req.body['how-served'] });
        }

    });
    app.get('*/prototype-nov-2017/certificate/where', function(req, res){
        var defendant = req.session.defendant || getDummyDefendant();
        var defendants = req.session.defendants || getDummyDefendants();

        res.render('prototype-nov-2017/certificate/where', { defendant: defendant, howServed: req.body['how-served'] });

    });

    app.post('*/prototype-nov-2017/certificate/when', function(req, res){

        var defendant = req.session.defendant || getDummyDefendant();
        var defendants = req.session.defendants || getDummyDefendants();
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
            res.render('prototype-nov-2017/certificate/when', { defendant: defendant, blnShowTime: blnShowTime, howServed: defendant.howServed });
        } else {
            
            if ( req.body['day']) {
                defendant.serveDay = req.body['day'];
                defendant.serveMonth = req.body['month'];
                arrMonths = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];
                defendant.serveMonthWord = arrMonths[req.body['month']-1];
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
                    res.render('prototype-nov-2017/certificate/check-your-answers', { documents: documents, defendants: defendants, files: files, orgName: orgName });
            } else {

                //find the next one and go again
                var defendants = req.session.defendants || getDummyDefendants();

                for ( i=0; i<defendants.length; i++ ) {
                    if ( defendants[i].defendantNo == defendant.defendantNo ) {

                        req.session.defendant = defendants[i+1];

                        if ( req.session.defendant.defendantType == 'company' && req.session.defendant.solicitor == '-' ) {
                            res.render('prototype-nov-2017/certificate/who', { defendant: req.session.defendant })
                        } else {
                            res.render('prototype-nov-2017/certificate/how', { defendant: req.session.defendant })
                        }

                        break;
                    }
                }

            }  
        }
    });

    app.post('*/prototype-nov-2017/certificate/submitted', function(req, res){
        var defendants = req.session.defendants || getDummyDefendants();

        res.render('prototype-nov-2017/certificate/submitted', { defendants: defendants })
    });

    app.get('*/prototype-nov-2017/certificate/submitted', function(req, res){
        var defendants = req.session.defendants || getDummyDefendants();

        res.render('prototype-nov-2017/certificate/submitted', { defendants: defendants })
    });


    app.get('*/prototype-nov-2017/certificateOfService', function(req, res){
        //var claimants  = [{ name: 'Jimmy Smith1' },{ name: 'Jimmy Smith2' },{ name: 'Jimmy Smith3' },{ name: 'Jimmy Smith4' }];
        var claimants  = [{ name: 'Jimmy Smith1' }];
        var defendant = { defendantNo: 2, defendantTitle: 'Mr', defendantName: 'Bob Goddard', defendantAddress: '30 LONGBRIDGE ROAD\n HORLEY\n RH6 7EL', solicitor: 'Keoghs LLP', serviceAddress: '2 COLCHESTER STREET\n COVENTRY\n CV1 5NZ', defendantCountry: 'England', howServed: 'Fax', serviceMethod: 'fax', serviceFax: '01483 562742', destination: 'place of business', serveDay: '8', serveMonth: '10', serveMonthWord: 'October', serveYear: '2017', serveDate: '9 October 2017', serveHour: '6', serveMinutes: '23', serveAmPm: 'PM' };
//        var defendant = { defendantNo: 2, defendantTitle: 'Mr', defendantName: 'Bob Goddard', defendantFirstName: 'Bob', defendantCompanyNumber: '-', address: { line1: '31 Old Farm Road', line2: '', city: 'Guildford', postcode: 'GU3 3QP'}, solicitor: 'Keoghs', serviceAddress: '2 COLCHESTER STREET\n COVENTRY\n CV1 5NZ', defendantCountry: 'England', howServed: 'First class post or other next-day service', serviceMethod: 'post', serviceFax: '01483 562742', destination: 'place of business', serveDay: '8', serveMonth: '10', serveMonthWord: 'Oct', serveYear: '2017', serveDate: '9 October 2017', serveHour: '6', serveMinutes: '23', serveAmPm: 'PM' };

        var arrMonths = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];
        serviceSentDate = defendant.serveDay + ' ' + arrMonths[defendant.serveMonth] + ' ' + defendant.serveYear;
        
        res.render('prototype-nov-2017/certificateOfService', { defendant: defendant, claimants: claimants, documents: getDummyDocuments(), signerName: 'Robert Wagner', signerCompany: 'Wagner & Co Legal', signerRole: 'Senior solicitor', signerDate: '14 October 2017', serviceSentDate: serviceSentDate, serviceDate: defendant.serveDate, claimReferenceNumber: '123ML143' });
    });

}


function getDummyDefendants() {
    return [ { defendantNo: 1, defendantType: 'trader', defendantName: 'Jan Clarke trading as Clarke Construction', defendantAddress: '115 EASTWICK PARK AVENUE LEATHERHEAD KT23 3NW', solicitor: '-', serviceAddress: '115 EASTWICK PARK AVENUE\nLEATHERHEAD\nKT23 3NW', defendantCountry: 'England', howServed: 'First class post or other next-day service', destination: 'usual residence', serveDay: '11', serveMonth: '10', serveMonthWord: 'October', serveYear: '2017', serveDate: '13 October 2017' }, { defendantNo: 2,  defendantType: 'company', defendantName: 'Goddard Plumbing', defendantAddress: '30 LONGBRIDGE ROAD\n HORLEY\n RH6 7EL', solicitor: 'Keoghs LLP', serviceAddress: '2 COLCHESTER STREET\n COVENTRY\n CV1 5NZ', defendantCountry: 'England', howServed: 'Fax', serviceFax: '01483 562742', destination: 'place of business', serveDay: '8', serveMonth: '10', serveMonthWord: 'October', serveYear: '2017', serveDate: '9 Oct 2017', serveHour: '6', serveMinutes: '23', amPm: 'PM' }, { defendantNo: 3,  defendantType: 'company', defendantName: 'Kingsley Building Ltd', defendantAddress: '31 TANGLEY LANE GUILDFORD GU3 3JU', solicitor: '-', serviceAddress: '31 TANGLEY LANE\n GUILDFORD\n GU3 3JU', defendantCountry: 'England', howServed: 'Personally handed to or left with with recipient', addressedTo: 'Jimmy Smith', addressedRole: 'Director', leftWith: 'Dave Smith', destination: 'principal place of business', serveDay: '9', serveMonth: '10', serveMonthWord: 'October', serveYear: '2017', serveDate: '9 Oct 2017' } ];
}

function getDummyDefendant() {
    var arrDummyDefendants = getDummyDefendants();
    return arrDummyDefendants[0];
}

function getDummyDocuments() {
    return [ 'Claim form', 'Particulars of claim', 'Response pack', 'Medical reports', 'Schedule of loss' ];
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
