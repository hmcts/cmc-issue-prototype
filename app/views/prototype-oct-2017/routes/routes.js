module.exports = function(app){


    app.get('*/prototype-oct-2017/what-type-of-claimant', function(req, res){
        var claimants = req.session.claimants || [];

        res.render('prototype-oct-2017/what-type-of-claimant', { claimants: claimants })
    });

    app.post('*/prototype-oct-2017/what-type-of-claimant', function(req, res){
        var claimants = req.session.claimants || [];

        if (!req.body.claimantType) {
            res.render('prototype-oct-2017/what-type-of-claimant', { claimants: claimants })
        }
        else {
            res.redirect('claimant-address')
        }
    });

    app.get('*/prototype-oct-2017/claimant-address', function(req, res){
        var claimants = req.session.claimants || [];

        res.render('prototype-oct-2017/claimant-address', { claimants: claimants })
    });


    app.post('*/prototype-oct-2017/claimant-add', function(req, res){

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
            res.render('prototype-oct-2017/claimant-add', { claimants: claimants })
        } else if (req.body.addClaimant && req.body.addClaimant.toString() === 'yes') {
            req.session.data['claimant_name'] = req.session.data['claimant_rep_company'] = req.session.data['claimant_AddressLine1'] = req.session.data['claimant_AddressLine2'] = undefined
            req.session.data['claimant_city'] = req.session.data['claimant_Postcode'] = req.session.data['claimant_company_name'] = req.session.data['claimantType'] = req.session.data['claimant_title'] = undefined

            res.redirect('what-type-of-claimant')
        } else {
            res.redirect('defendant-type');
        }

    });

    app.post('*/prototype-oct-2017/representation', function(req, res){
        if (req.body.representativeType.toString() === 'represent') {
            res.redirect('representatives-details')
        }
        else {
            res.redirect('not-supported')
        }
    });

    app.get('*/prototype-oct-2017/defendants-service-address', function(req, res){
        var defendants = req.session.defendants || [];

        res.render('prototype-oct-2017/defendants-service-address', { defendants: defendants })
    });

    app.get('*/prototype-oct-2017/defendant-type', function(req, res){
        var defendants = req.session.defendants || [];

        res.render('prototype-oct-2017/defendant-type', { defendants: defendants })
    });

    app.post('*/prototype-oct-2017/defendant-type', function(req, res){
        var defendants = req.session.defendants || [];

        if (!req.body.defendantType) {
            res.render('prototype-oct-2017/defendant-type', { defendants: defendants })
        }
        else {
            res.redirect('defendant-details')
        }
    });

    app.get('*/prototype-oct-2017/defendant-details', function(req, res){
        var defendants = req.session.defendants || [];

        res.render('prototype-oct-2017/defendant-details', { defendants: defendants })
    });

    app.post('*/prototype-oct-2017/defendant-represented', function(req, res){
        if (req.body.defendantRepresented === undefined) {
            res.render('prototype-oct-2017/defendant-represented')
        } else if (req.body.defendantRepresented.toString() === 'yes') {
            res.redirect('defendant-reps-address')
        }
        else {
            res.redirect('defendants-service-address')
        }
    });

    app.get('*/prototype-oct-2017/defendant-reps-address', function(req, res){
        var defendants = req.session.defendants || [];

        res.render('prototype-oct-2017/defendant-reps-address', { defendants: defendants })
    });

    app.post('*/prototype-oct-2017/defendant-reps-address', function(req, res){



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

    app.get('*/prototype-oct-2017/defendants-service-address', function(req, res){
        var defendants = req.session.defendants || [];

        res.render('prototype-oct-2017/defendants-service-address', { defendants: defendants })
    });

    app.post('*/prototype-oct-2017/defendants-service-address', function(req, res){
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


    app.post('*/prototype-oct-2017/defendants-service-address-other', function(req, res){

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


    app.get('*/prototype-oct-2017/defendant-add', function(req, res){
        var defendants = req.session.defendants || [];
        var defendantNo = defendants.length + 1;
        var defendantName = (req.session.data['defendant_name']) ? req.session.data['defendant_name'] : req.session.data['defendant_company_name']
        var defendantFirstName = req.session.data['defendant_company_name'] || req.session.data['defendant_name'].substring(0, (req.session.data['defendant_name'].indexOf(' ') > 0 ? req.session.data['defendant_name'].indexOf(' ') : req.session.data['defendant_name'].length ) );
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
        var defendantCountry = (req.session.data['defendant_country']) ? req.session.data['defendant_country'] : ''
        defendants.push({'defendantNo': defendantNo, 'defendantName': defendantName, 'defendantFirstName': defendantFirstName, 'defendantCompanyNumber': defendantCompanyNumber, 'defendantAddress': defendantAddress, 'solicitor': defendantSolicitorName, 'serviceAddress': defendantServiceAddress, 'defendantCountry': defendantCountry})

        req.session.defendants = defendants
        res.render('prototype-oct-2017/defendant-add', { defendants: defendants })
    });


    app.post('*/prototype-oct-2017/defendant-add', function(req, res){


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




    app.post('*/prototype-oct-2017/jurisdiction-statements', function(req, res){
        res.redirect('defendant-add');
    });

    app.post('*/prototype-oct-2017/jurisdiction-statements-2', function(req, res){
        res.redirect('defendant-add');
    });

    app.post('*/prototype-oct-2017/type-of-claim', function(req, res){
        if (!req.body.typeOfClaim) {
            res.render('prototype-oct-2017/type-of-claim')
        }
        else if (req.body.typeOfClaim.toString() === 'specified') {
            res.redirect('spec-claim-amount-type')
        }
        else {
            res.redirect('personal-injury')
        }
    });

    // REPEATED BLOCK - delete?
    app.post('*/prototype-oct-2017/defendant-represented', function(req, res){
        if (req.body.defendantRepresented === undefined) {
            res.render('prototype-oct-2017/defendant-represented')
        } else if (req.body.defendantRepresented.toString() === 'yes') {
            res.redirect('defendant-reps-address')
        }
        else {
            res.redirect('defendants-service-address')
        }
    });

    app.post('*/prototype-oct-2017/spec-claim-amount-type', function(req, res){
        if (!req.body.interestTotal) {
            res.render('prototype-oct-2017/spec-claim-amount-type')
        }
        else if (req.body.interestTotal.toString() === 'no') {
            res.redirect('fixed-claim-amount')
        }
        else {
            res.redirect('fixed-claim-amount-total')
        }
    });

    app.post('*/prototype-oct-2017/fixed-claim-amount-total', function(req, res){
        req.session.data.total = Number(req.body.spec_claim_total_amount)
        req.session.data.interestTotal = Number(req.body.spec_claim_total_interest)
        res.redirect('claim-details')
    });

    app.post('*/prototype-oct-2017/choose-how-to-pay', function (req, res) {
        if (!req.body.paymentType) {
            res.render('prototype-oct-2017/choose-how-to-pay')
        }
        else if (req.body.paymentType == 'card') {
            res.redirect('pay-by-card')
        } else {
            res.redirect('pay-by-account')
        }
    });

    // REPEATED BLOCK - delete?
    app.post('*/prototype-oct-2017/defendant-represented', function(req, res){
        if (!req.body.defendantRepresented) {
            res.render('prototype-oct-2017/defendant-represented')
        }
        else if (req.body.defendantRepresented.toString() === 'yes') {
            res.redirect('defendant-reps-address')
        }
        else {
            res.redirect('defendants-service-address')
        }
    });

    app.post('*/prototype-oct-2017/fixed-claim-amount', function (req, res) {
        var moment = require('moment');
        req.session.data.total = Number(req.body.timeline_amount_1) + Number(req.body.timeline_amount_2) + Number(req.body.timeline_amount_3) + Number(req.body.timeline_amount_4);
        var interest_1 = parseFloat(((Number(req.body.timeline_amount_1) * Number(moment().diff(moment(req.body.timeline_date_1), 'days')) * Number(req.body.timeline_interest_1)) / (365 * 100)).toFixed(2));
        var interest_2 = parseFloat(((Number(req.body.timeline_amount_2) * Number(moment().diff(moment(req.body.timeline_date_2), 'days')) * Number(req.body.timeline_interest_2)) / (365 * 100)).toFixed(2));
        var interest_3 = parseFloat(((Number(req.body.timeline_amount_3) * Number(moment().diff(moment(req.body.timeline_date_3), 'days')) * Number(req.body.timeline_interest_3)) / (365 * 100)).toFixed(2));
        var interest_4 = parseFloat(((Number(req.body.timeline_amount_4) * Number(moment().diff(moment(req.body.timeline_date_4), 'days')) * Number(req.body.timeline_interest_4)) / (365 * 100)).toFixed(2));

        req.session.data.interestTotal = interest_1 + interest_2 + interest_3 + interest_4;
        res.redirect('claim-details')
    });

    app.post('*/prototype-oct-2017/personal-injury', function (req, res) {
        res.redirect('housing-disrepair')
    });

    app.post('*/prototype-oct-2017/housing-disrepair', function (req, res) {
        res.redirect('claim-details')
    });

    app.post('*/prototype-oct-2017/claim-details', function (req, res) {
        if (req.session.data.typeOfClaim === 'specified') {
            res.redirect('claim-total')
        }
        else {
            res.redirect('claim-amount')
        }
    });

    app.post('*/prototype-oct-2017/claim-amount', function (req, res) {
        res.redirect('claim-total')
    });

    app.get('*/prototype-oct-2017/claim-total', function (req, res) {
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

            res.render('prototype-oct-2017/claim-total', { issueFeeAmount: formatter.format(issueFeeAmount), claimType: req.session.data.typeOfClaim, total: formatter.format(value), fee: formatter.format(fee)})
        }
        else {
            res.render('prototype-oct-2017/claim-total', { issueFeeAmount: formatter.format(issueFeeAmount) })
        }
    });

    app.post('*/prototype-oct-2017/claim-total', function (req, res) {
        res.redirect('claim-details-summary')
    })

    app.get('*/prototype-oct-2017/claim-details-summary', function (req, res) {
        var defendants = req.session.defendants || [];
        var claimants = req.session.claimants || [];
        var formatter = new Intl.NumberFormat('en-GB', {
            style: 'currency',
            currency: 'GBP',
            minimumFractionDigits: 2, /* this might not be necessary */
        });
        res.render('prototype-oct-2017/claim-details-summary', { issueFeeAmount: req.session.data.issueFeeAmount, defendants: defendants, claimants: claimants, value: formatter.format(req.session.data.value), claimType: req.session.data.typeOfClaim })
    })

    app.get('*/prototype-oct-2017/claim-submitted', function (req, res) {
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
        res.render('prototype-oct-2017/claim-submitted', {today: moment().format('D MMMM YYYY'), claimType: req.session.data.typeOfClaim, issueDate: moment(issueDate).format('D MMMM YYYY'), issueFeeAmount: formatter.format(req.session.data.issueFeeAmount), value: formatter.format(req.session.data.value)  })
    })

    app.get('*/prototype-oct-2017/pay-by-card', function (req, res) {
        res.render('prototype-oct-2017/pay-by-card')
    })

    app.get('*/prototype-oct-2017/pay-by-account', function (req, res) {
        res.render('prototype-oct-2017/pay-by-account')
    })

    app.get('*/prototype-oct-2017/email', function (req, res) {
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
        res.render('prototype-oct-2017/email', {issueDate: moment(issueDate).format('D MMMM YYYY'), issueFeeAmount: formatter.format(req.session.data.issueFeeAmount)})
    })


    app.get('*/prototype-oct-2017/logout', function (req, res) {
        req.session.destroy()
        res.redirect('login')
    })

    app.post('*/prototype-oct-2017/certificate/documents', function(req, res){

        req.session.defendantsServed = req.session.data['defendants-served'];
        
        var defendants = req.session.defendants || getDummyDefendants();

        // remove defendants not served to
        for ( i=0; i<defendants.length; i++ ) {
            if (req.session.data['defendants-served'].indexOf( defendants[i].defendantNo.toString()) == -1)  {
                defendants.splice(i, 1);
                i--;
            }
        }

        req.session.defendant = defendants[0];
        req.session.defendants = defendants;

        res.render('prototype-oct-2017/certificate/documents', { defendant: req.session.defendant })
    });

    app.get('*/prototype-oct-2017/certificate', function(req, res){
        var defendants = req.session.defendants || getDummyDefendants();

        //check if we've deleted any defs on a previous journey, and reset if so
        for (i=0; i<defendants.length; i++ ) {
            if (defendants[i].defendantNo != i+1) {
                defendants = getDummyDefendants();
                break;
            }
        }
        res.render('prototype-oct-2017/certificate/index', { defendants: defendants })
    });


    app.get('*/prototype-oct-2017/certificate/documents', function(req, res){
        var defendant = req.session.defendant || getDummyDefendant();
        res.render('prototype-oct-2017/certificate/documents', { defendant: defendant })
    });

    app.post('*/prototype-oct-2017/certificate/upload', function(req, res){
        var defendant = req.session.defendant || getDummyDefendant();
        req.session.documents = req.body.documents;

        res.render('prototype-oct-2017/certificate/upload', { defendant: defendant, documents: req.body.documents })
    });

    app.get('*/prototype-oct-2017/certificate/upload', function(req, res){
        var defendant = req.session.defendant || getDummyDefendant();
        documents = req.body.documents || req.session.docuements || getDummyDocuments();

        res.render('prototype-oct-2017/certificate/upload', { defendant: defendant, documents: documents })
    });

    app.get('*/prototype-oct-2017/certificate/how', function(req, res){
        var defendant = req.session.defendant || getDummyDefendant();

        res.render('prototype-oct-2017/certificate/how', { defendant: defendant })
    });

    app.post('*/prototype-oct-2017/certificate/how', function(req, res){
        var defendant = req.session.defendant || getDummyDefendant();
        req.session.files = req.body['files'].substring( 0, req.body['files'].length-1).split("|");

        res.render('prototype-oct-2017/certificate/how', { defendant: defendant })
    });

    app.get('*/prototype-oct-2017/certificate/when', function(req, res){
        var defendant = req.session.defendant || getDummyDefendant();

        res.render('prototype-oct-2017/certificate/when', { defendant: defendant })
    });

    app.get('*/prototype-oct-2017/certificate/check-your-answers', function(req, res){
        var defendants = req.session.defendants || getDummyDefendants();
        var documents = req.session.documents || getDummyDocuments();
        var files = req.session.files || getDummyFiles();

        res.render('prototype-oct-2017/certificate/check-your-answers', { documents: documents, defendants: defendants, files: files })
    });


    app.post('*/prototype-oct-2017/certificate/when', function(req, res){
        var defendant = req.session.defendant || getDummyDefendant();
        var defendants = req.session.defendants || getDummyDefendants();
        var documents = req.session.documents || getDummyDocuments();
        var files = req.session.files || getDummyFiles();


        if ( req.body['how-served']) {

            defendant.howServed = req.body['how-served'];
            defendant.destination = req.body['destination'];
            req.session.defendants = updateDefendant(defendant, defendants);

            blnShowTime = ( req.body['how-served'] == 'Email' || req.body['how-served'] == 'Fax' || req.body['how-served'] == 'Other electronic method' );
            res.render('prototype-oct-2017/certificate/when', { defendant: defendant, blnShowTime: blnShowTime, howServed: req.body['how-served'] })
        } else {
            
            if ( req.body['day']) {
                defendant.serveDay = req.body['day'];
                defendant.serveMonth = req.body['month'];
                arrMonths = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];
                defendant.serveMonthWord = arrMonths[req.body['month']-1];
                defendant.serveYear = req.body['year'];
                defendant.serveDate = req.body['service-value-field'];

                if ( req.body['hour']) {
                    defendant.serveHour = req.body['hour'];
                    defendant.serveMinutes = req.body['minutes'];
                    defendant.amPm = req.body['am-pm'];
                }
                req.session.defendants = updateDefendant(defendant, defendants);
            }

            // last one
            if ( !req.session.defendantsServed || defendant.defendantNo == req.session.defendantsServed[req.session.defendantsServed.length-1] ) {
                res.render('prototype-oct-2017/certificate/check-your-answers', { documents: documents, defendants: defendants, files: files });
            } else {

                //find the next one and go again
                var defendants = req.session.defendants || getDummyDefendants();

                for ( i=0; i<defendants.length; i++ ) {
                    if ( defendants[i].defendantNo == defendant.defendantNo ) {

                        req.session.defendant = defendants[i+1];
                        res.render('prototype-oct-2017/certificate/how', { defendant: req.session.defendant });
                        break;
                    }
                }

            }  
        }
    });

    app.post('*/prototype-oct-2017/certificate/submitted', function(req, res){
        var defendants = req.session.defendants || getDummyDefendants();

        res.render('prototype-oct-2017/certificate/submitted', { defendants: defendants })
    });

    app.get('*/prototype-oct-2017/certificate/submitted', function(req, res){
        var defendants = req.session.defendants || getDummyDefendants();

        res.render('prototype-oct-2017/certificate/submitted', { defendants: defendants })
    });

}

function getDummyDefendants() {
    return [ { defendantNo: 1, defendantName: 'Jan Clarke', defendantFirstName: 'Jan', defendantCompanyNumber: '-', defendantAddress: '115 EASTWICK PARK AVENUE LEATHERHEAD KT23 3NW', solicitor: '-', serviceAddress: '115 EASTWICK PARK AVENUE LEATHERHEAD KT23 3NW', defendantCountry: 'England', howServed: 'First class post or other next-day service', destination: 'usual residence', serveDay: '11', serveMonth: '10', serveMonthWord: 'Oct', serveYear: '2017', serveDate: '13 Oct 2017' }, { defendantNo: 2, defendantName: 'Bob Goddard', defendantFirstName: 'Bob', defendantCompanyNumber: '-', defendantAddress: '30 LONGBRIDGE ROAD HORLEY RH6 7EL', solicitor: 'Keoghs', serviceAddress: '2 COLCHESTER STREET COVENTRY CV1 5NZ', defendantCountry: 'England', howServed: 'Fax', destination: 'place of business', serveDay: '08', serveMonth: '10', serveMonthWord: 'Oct', serveYear: '2017', serveDate: '9 Oct 2017', serveHour: '6', serveMinutes: '23', amPm: 'PM' }, { defendantNo: 3, defendantName: 'Chris Kingsley', defendantFirstName: 'Chris', defendantCompanyNumber: '-', defendantAddress: '31 TANGLEY LANE GUILDFORD GU3 3JU', solicitor: '-', serviceAddress: '31 TANGLEY LANE GUILDFORD GU3 3JU', defendantCountry: 'England', howServed: 'Personally handed to or left with with recipient', destination: 'principal place of business', serveDay: '09', serveMonth: '10', serveMonthWord: 'Oct', serveYear: '2017', serveDate: '9 Oct 2017' } ];
}

function getDummyDefendant() {
    var arrDummyDefendants = getDummyDefendants();
    return arrDummyDefendants[0];
}

function getDummyDocuments() {
    return [ 'Claim form', 'Particulars of claim', 'Response pack', 'Schedule of loss', 'Medical report' ];
}

function getDummyFiles() {
    return [ 'Particulars of claim.pdf', 'Schedule of loss.xls', 'Medical report.jpg' ];
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
