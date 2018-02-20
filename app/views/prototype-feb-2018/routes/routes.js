module.exports = function(app){


    app.post('*/prototype-feb-2018/representative-address', function(req, res){
        req.session.orgName = req.body['rep_company_name'];

        res.render('prototype-feb-2018/representative-address');
    });

    app.get('*/prototype-feb-2018/claimant-name', function(req, res){
        var claimants = req.session.claimants || [];

        res.render('prototype-feb-2018/claimant-name', { claimants: claimants })
    });

    app.post('*/prototype-feb-2018/claimant-name', function(req, res){
        var claimants = req.session.claimants || [];

        if (!req.session.data['claimant_name'] ) {
            res.render('prototype-feb-2018/claimant-name', { claimants: claimants })
        }
        else {
            res.redirect('claimant-address')
        }
    });

    app.get('*/prototype-feb-2018/claimant-address', function(req, res){
        var claimants = req.session.claimants || [];
        res.render('prototype-feb-2018/claimant-address', { claimants: claimants })
    });

    app.post('*/prototype-feb-2018/claimant-suitability', function(req, res){
        var claimants = req.session.claimants || [];

        if ( req.body['claimant_protected'] ) {

            if ( req.body['claimant_protected'] == 'yes' ) {
                res.redirect('litigation-friend-name');
            } else {
                res.redirect('claimant-add');
            }

        } else {
            res.render('prototype-feb-2018/claimant-suitability', { claimants: claimants })
        }

    });

    app.post('*/prototype-feb-2018/litigation-friend-address-same', function(req, res){
        var claimants = req.session.claimants || [];

        if ( req.body['friend_address_same'] ) {

            if ( req.body['friend_address_same'] == 'yes' ) {
                res.redirect('claimant-add');
            } else {
                res.redirect('litigation-friend-address');
            }

        } else {
            res.render('prototype-feb-2018/litigation-friend-address-same', { claimants: claimants })
        }

    });


    app.get('*/prototype-feb-2018/claimant-add', function(req, res){
        checkClaimantAdd( req, res );
    });

    app.post('*/prototype-feb-2018/claimant-add', function(req, res){
        checkClaimantAdd( req, res );
    });

    function checkClaimantAdd( req, res ) {

        if (req.body.addClaimant === undefined) {
            var claimants = req.session.claimants || [];
            var claimantNo = claimants.length + 1;
            var claimantName = (req.session.data['claimant_name']) ? req.session.data['claimant_name'] : ''
            var claimantAddress1 = (req.session.data['claimant_AddressLine1']) ? req.session.data['claimant_AddressLine1'] : '-'
            var claimantAddress2 = (req.session.data['claimant_AddressLine2']) ? req.session.data['claimant_AddressLine2'] : ''
            var claimantTown = (req.session.data['claimant_city']) ? req.session.data['claimant_city'] : ''
            var claimantPostcode = (req.session.data['claimant_Postcode']) ? req.session.data['claimant_Postcode'] : ''
            var claimantAddress = claimantAddress1 + ' ' + claimantAddress2 + ' ' + claimantTown + ' ' + claimantPostcode
            var friendName = (req.session.data['friend_name']) ? req.session.data['friend_name'] : ''

            if ( req.session.data['friend_address_same'] == 'yes' ) {
                var friendAddress = claimantAddress;
            } else {

                var friendAddress1 = (req.session.data['friend_AddressLine1']) ? req.session.data['friend_AddressLine1'] : '-'
                var friendAddress2 = (req.session.data['friend_AddressLine2']) ? req.session.data['friend_AddressLine2'] : ''
                var friendTown = (req.session.data['friend_city']) ? req.session.data['friend_city'] : ''
                var friendPostcode = (req.session.data['friend_Postcode']) ? req.session.data['friend_Postcode'] : ''
                var friendAddress = (req.session.data['friend_AddressLine1']) ? friendAddress1 + ' ' + friendAddress2 + ' ' + friendTown + ' ' + friendPostcode : ''
            }

            claimants.push({'claimantNo': claimantNo, 'claimantName': claimantName, 'claimantAddress': claimantAddress, 'friendName': friendName, 'friendAddress': friendAddress})

            req.session.claimants = claimants
            res.render('prototype-feb-2018/claimant-add', { claimants: claimants })
        } else if (req.body.addClaimant && req.body.addClaimant.toString() === 'yes') {
            req.session.data['claimant_name'] = req.session.data['claimant_rep_company'] = req.session.data['claimant_AddressLine1'] = req.session.data['claimant_AddressLine2'] = undefined
            req.session.data['claimant_city'] = req.session.data['claimant_Postcode'] = req.session.data['claimant_company_name'] = undefined
            req.session.data['friend_name'] = req.session.data['friend_rep_company'] = req.session.data['friend_Address'] = req.session.data['friend_AddressLine1'] = req.session.data['friend_AddressLine2'] = undefined
            req.session.data['friend_city'] = req.session.data['friend_Postcode'] = req.session.data['friend_company_name'] = undefined

            res.redirect('claimant-name')
        } else {
            res.redirect('defendant-type');
        }

    }

    app.post('*/prototype-feb-2018/representation', function(req, res){
        if (req.body.representativeType.toString() === 'represent') {
            res.redirect('representatives-details')
        }
        else {
            res.redirect('not-supported')
        }
    });

    app.get('*/prototype-feb-2018/defendants-service-address', function(req, res){
        var defendants = req.session.defendants || [];

        res.render('prototype-feb-2018/defendants-service-address', { defendants: defendants })
    });

    app.get('*/prototype-feb-2018/defendant-type', function(req, res){
        var defendants = req.session.defendants || [];

        res.render('prototype-feb-2018/defendant-type', { defendants: defendants })
    });

    app.post('*/prototype-feb-2018/defendant-type', function(req, res){
        var defendants = req.session.defendants || [];

        if (!req.body.defendantType) {
            res.render('prototype-feb-2018/defendant-type', { defendants: defendants })
        }
        else {
            res.redirect('defendant-details')
        }
    });

    app.get('*/prototype-feb-2018/defendant-details', function(req, res){
        var defendants = req.session.defendants || [];

        res.render('prototype-feb-2018/defendant-details', { defendants: defendants })
    });

    app.get('*/prototype-feb-2018/defendant-reps-address', function(req, res){
        var defendants = req.session.defendants || [];

        res.render('prototype-feb-2018/defendant-reps-address', { defendants: defendants })
    });

    app.post('*/prototype-feb-2018/defendant-reps-address', function(req, res){

        if (req.session.data.defendant_service_country ) {

            req.session.defendantCountry = req.session.data.defendant_service_country;

            if ( req.session.data.defendant_service_country == 'England' || req.session.data.defendant_service_country == 'Wales' )  {
                res.redirect('defendant-add');

            } else if ( isConventionTerritory( req.session.data.defendant_service_country ) || isUK( req.session.data.defendant_service_country ) )  {
                res.redirect('jurisdiction-proceedings');
            } else {
                res.redirect('jurisdiction-statements-2'); 
            }

        } else {
            res.redirect('defendant-add')
        }
    });

    app.post('*/prototype-feb-2018/jurisdiction-proceedings', function(req, res){

        if ( req.session.data['proceedings'] == 'no' ) {
            res.render('prototype-feb-2018/jurisdiction-domiciled', { strCountry: req.session.defendantCountry } );
        } else if ( isConventionTerritory( req.session.defendantCountry ) ) {
            res.redirect('jurisdiction-statements-2');
        } else if ( isUK( req.session.defendantCountry ) ) {
            res.redirect('jurisdiction-statements');
        }

    });

    
    app.post('*/prototype-feb-2018/jurisdiction-domiciled', function(req, res){

        if ( req.session.data['domiciled'] == 'yes' && isUK( req.session.defendantCountry ) ) {
            res.render('prototype-feb-2018/jurisdiction-statements-1a', { strCountry: req.session.defendantCountry } );
        } else if ( req.session.data['domiciled'] == 'no' && isUK( req.session.defendantCountry ) ) {
           res.render('prototype-feb-2018/jurisdiction-statements', { strCountry: req.session.defendantCountry } );
        } else if ( req.session.data['domiciled'] == 'yes' && isConventionTerritory( req.session.defendantCountry ) ) {
            res.render('prototype-feb-2018/jurisdiction-statements-2a', { strCountry: req.session.defendantCountry } );
        } else if ( req.session.data['domiciled'] == 'no' && isConventionTerritory( req.session.defendantCountry ) ) {
            res.render('prototype-feb-2018/jurisdiction-statements-2', { strCountry: req.session.defendantCountry } );
        }

    });


    app.get('*/prototype-feb-2018/defendants-service-address', function(req, res){
        var defendants = req.session.defendants || [];

        res.render('prototype-feb-2018/defendants-service-address', { defendants: defendants })
    });

    app.post('*/prototype-feb-2018/defendants-service-address', function(req, res){
        if (req.body.defendantService === 'other') {
            res.redirect('defendants-service-address-other')
        } else if (req.session.data.defendant_country ) {

            req.session.defendantCountry = req.session.data.defendant_country;

            if ( req.session.defendantCountry == 'England' || req.session.defendantCountry == 'Wales' )  {
                res.redirect('defendant-add');

            } else if ( isConventionTerritory( req.session.defendantCountry ) || isUK( req.session.defendantCountry ) )  {
                res.redirect('jurisdiction-proceedings');
            } else {
                res.redirect('jurisdiction-statements-2'); 
            }

        } else {
            res.redirect('defendant-add')
        }

    });


    app.post('*/prototype-feb-2018/defendants-service-address-other', function(req, res){

        if ( req.session.data.defendant_service_country ) {

            req.session.defendantCountry = req.session.data.defendant_service_country;

            if ( req.session.defendantCountry == 'England' || req.session.defendantCountry == 'Wales' )  {
                res.redirect('defendant-add');

            } else if ( isConventionTerritory( req.session.defendantCountry ) || isUK( req.session.defendantCountry ) )  {
                res.redirect('jurisdiction-proceedings');
            } else {
                res.redirect('jurisdiction-statements-2'); 
            }

        } else {
            res.redirect('defendant-add')
        }

    });


    app.get('*/prototype-feb-2018/defendant-add', function(req, res){

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
        res.render('prototype-feb-2018/defendant-add', { defendants: defendants })
    });


    app.post('*/prototype-feb-2018/defendant-add', function(req, res){


        if (req.body.addDefendant && req.body.addDefendant.toString() === 'yes') {
            req.session.data['defendant_name'] = req.session.data['defendant_rep_company'] = req.session.data['defendant_AddressLine1'] = req.session.data['defendant_AddressLine2'] = undefined
            req.session.data['defendant_city'] = req.session.data['defendant_Postcode'] = req.session.data['defendant_service_AddressLine1'] = req.session.data['defendant_service_AddressLine2'] = undefined
            req.session.data['defendant_service_city'] = req.session.data['defendant_service_Postcode'] = req.session.data['defendant_company_name'] = req.session.data['defendantType'] = undefined
            req.session.data['defendantRepresented'] = req.session.data['defendantService'] = req.session.data['accept-service'] = undefined

            res.redirect('defendant-type')
        } else {
            res.redirect('type-of-claim');
        }

    });




    app.post('*/prototype-feb-2018/jurisdiction-statements', function(req, res){
        res.redirect('defendant-add');
    });

    app.post('*/prototype-feb-2018/jurisdiction-statements-2', function(req, res){
        res.redirect('defendant-add');
    });

    app.post('*/prototype-feb-2018/type-of-claim', function(req, res){
        if (!req.body.typeOfClaim) {
            res.render('prototype-feb-2018/type-of-claim')
        }
        else if (req.body.typeOfClaim.toString() === 'specified') {
            res.redirect('spec-claim-amount-type')
        }
        else {
            res.redirect('personal-injury')
        }
    });

    app.post('*/prototype-feb-2018/spec-claim-amount-type', function(req, res){
        if (!req.body.interestTotal) {
            res.render('prototype-feb-2018/spec-claim-amount-type')
        }
        else if (req.body.interestTotal.toString() === 'no') {
            res.redirect('fixed-claim-amount')
        }
        else {
            res.redirect('fixed-claim-amount-total')
        }
    });

    app.post('*/prototype-feb-2018/fixed-claim-amount-total', function(req, res){
        req.session.data.total = Number(req.body.spec_claim_total_amount)
        req.session.data.interestTotal = Number(req.body.spec_claim_total_interest)
        res.redirect('claim-details')
    });

    app.post('*/prototype-feb-2018/help-with-fees', function (req, res) {

        if (req.body.helpFees == 'yes') {
            res.render('prototype-feb-2018/choose-how-to-pay', { blnHelpFees: true });
        } else if (req.body.helpFees == 'no') {
            res.render('prototype-feb-2018/choose-how-to-pay');
        } else {
            res.render('prototype-feb-2018/help-with-fees')
        }

    });

    app.post('*/prototype-feb-2018/choose-how-to-pay', function (req, res) {
        if (!req.body.paymentType) {
            res.render('prototype-feb-2018/choose-how-to-pay')
        }
        else if (req.body.paymentType == 'card') {
            res.redirect('pay-by-card')
        } else {
            res.redirect('pay-by-account')
        }
    });

    app.post('*/prototype-feb-2018/defendant-represented', function(req, res){
        if (req.body.defendantRepresented === undefined) {
            res.render('prototype-feb-2018/defendant-represented')
        } else if (req.body.defendantRepresented.toString() === 'yes') {
            res.redirect('defendant-reps-address')
        }
        else {
            res.redirect('defendants-service-address')
        }
    });

    app.post('*/prototype-feb-2018/fixed-claim-amount', function (req, res) {
        var moment = require('moment');
        req.session.data.total = Number(req.body.timeline_amount_1) + Number(req.body.timeline_amount_2) + Number(req.body.timeline_amount_3) + Number(req.body.timeline_amount_4);
        var interest_1 = parseFloat(((Number(req.body.timeline_amount_1) * Number(moment().diff(moment(req.body.timeline_date_1), 'days')) * Number(req.body.timeline_interest_1)) / (365 * 100)).toFixed(2));
        var interest_2 = parseFloat(((Number(req.body.timeline_amount_2) * Number(moment().diff(moment(req.body.timeline_date_2), 'days')) * Number(req.body.timeline_interest_2)) / (365 * 100)).toFixed(2));
        var interest_3 = parseFloat(((Number(req.body.timeline_amount_3) * Number(moment().diff(moment(req.body.timeline_date_3), 'days')) * Number(req.body.timeline_interest_3)) / (365 * 100)).toFixed(2));
        var interest_4 = parseFloat(((Number(req.body.timeline_amount_4) * Number(moment().diff(moment(req.body.timeline_date_4), 'days')) * Number(req.body.timeline_interest_4)) / (365 * 100)).toFixed(2));

        req.session.data.interestTotal = interest_1 + interest_2 + interest_3 + interest_4;
        res.redirect('claim-details')
    });

    app.post('*/prototype-feb-2018/personal-injury', function (req, res) {
        res.redirect('housing-disrepair')
    });

    app.post('*/prototype-feb-2018/housing-disrepair', function (req, res) {
        res.redirect('claim-details')
    });

    app.post('*/prototype-feb-2018/claim-details', function (req, res) {
        if (req.session.data.typeOfClaim === 'specified') {
            res.redirect('claim-total')
        }
        else {
            res.redirect('claim-amount')
        }
    });

    app.post('*/prototype-feb-2018/claim-amount', function (req, res) {
        res.redirect('claim-total')
    });

    app.get('*/prototype-feb-2018/claim-total', function (req, res) {
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

            res.render('prototype-feb-2018/claim-total', { issueFeeAmount: formatter.format(issueFeeAmount), claimType: req.session.data.typeOfClaim, total: formatter.format(value), fee: formatter.format(fee)})
        }
        else {
            res.render('prototype-feb-2018/claim-total', { issueFeeAmount: formatter.format(issueFeeAmount) })
        }
    });

    app.post('*/prototype-feb-2018/claim-total', function (req, res) {
        res.redirect('claim-details-summary')
    })

    app.get('*/prototype-feb-2018/claim-details-summary', function (req, res) {
        var defendants = req.session.defendants || [];
        var claimants = req.session.claimants || [];
        var formatter = new Intl.NumberFormat('en-GB', {
            style: 'currency',
            currency: 'GBP',
            minimumFractionDigits: 2, /* this might not be necessary */
        });
        res.render('prototype-feb-2018/claim-details-summary', { issueFeeAmount: req.session.data.issueFeeAmount, defendants: defendants, claimants: claimants, value: formatter.format(req.session.data.value), claimType: req.session.data.typeOfClaim })
    })

    app.get('*/prototype-feb-2018/claim-submitted', function (req, res) {
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


        var blnNeedsLitigationFriend = false;

        if ( req.session.claimants ) {
            for ( i=0; i<req.session.claimants.length; i++ ) {

                if (req.session.claimants[i].friendName ) {
                    blnNeedsLitigationFriend = true;
                    break;
                }

            }
        }
        
        res.render('prototype-feb-2018/claim-submitted', {today: moment().format('D MMMM YYYY'), dueDate: objDueDate.format('D MMMM YYYY'), confirmDueDate: objConfirmDueDate.format('D MMMM YYYY'), claimType: req.session.data.typeOfClaim, issueDate: moment(issueDate).format('D MMMM YYYY'), issueFeeAmount: formatter.format(req.session.data.issueFeeAmount), value: formatter.format(req.session.data.value), 'blnNeedsLitigationFriend': blnNeedsLitigationFriend })
    })

    app.get('*/prototype-feb-2018/pay-by-card', function (req, res) {
        res.render('prototype-feb-2018/pay-by-card')
    })

    app.get('*/prototype-feb-2018/pay-by-account', function (req, res) {
        res.render('prototype-feb-2018/pay-by-account')
    })

    app.get('*/prototype-feb-2018/email', function (req, res) {
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
        res.render('prototype-feb-2018/email', {issueDate: moment(issueDate).format('D MMMM YYYY'), issueFeeAmount: formatter.format(req.session.data.issueFeeAmount)})
    })


    app.get('*/prototype-feb-2018/logout', function (req, res) {
        req.session.destroy()
        res.redirect('login')
    })

    app.get('*/prototype-feb-2018/certificate', function(req, res){

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
        if (defendants[0].defendantName == 'Jan Clarke trading as Clarke Construction' && defendants.length < 3) {
            defendants = getDummyDefendants();
            req.session.defendants = defendants;
        }


        req.session.defendant = defendants[0];
        req.session.defendants = defendants;

        res.render('prototype-feb-2018/certificate/index', { defendant: req.session.defendant })
    });


    app.get('*/prototype-feb-2018/certificate/upload', function(req, res){
        var defendant = req.session.defendant || getDummyDefendant();
        var defendants = req.session.defendants || getDummyDefendants();
        req.session.documents = req.body.documents || getDummyDocuments();
        documents = req.session.documents;

        res.render('prototype-feb-2018/certificate/upload', { defendant: defendant, defendants: defendants, documents: documents, uploads: req.session.uploads });

    });


    app.post('*/prototype-feb-2018/certificate/upload', function(req, res){
        var defendant = req.session.defendant || getDummyDefendant();
        var defendants = req.session.defendants || getDummyDefendants();

        if ( req.body.documents ) {
            req.session.documents = req.body.documents;

            res.render('prototype-feb-2018/certificate/upload', { defendant: defendant, defendants: defendants, documents: req.session.documents, others: req.body['other-doc'] });
        } else if ( defendant.defendantType == 'company' && defendant.solicitor == '-' ) {
            res.render('prototype-feb-2018/certificate/who', { defendant: defendant })
        } else if ( defendant.defendantType == 'friend' ) {
            res.render('prototype-feb-2018/certificate/litigation-friend-name', { defendant: defendant })
        } else {
            res.render('prototype-feb-2018/certificate/how', { defendant: defendant })
        }

    });


    app.get('*/prototype-feb-2018/certificate/upload-js', function(req, res){
        var defendant = req.session.defendant || getDummyDefendant();
        req.session.documents = req.body.documents || getDummyDocuments();
        documents = req.session.documents;

        res.render('prototype-feb-2018/certificate/upload-js', { defendant: defendant, documents: documents, uploads: req.session.uploads });

    });


    app.get('*/prototype-feb-2018/certificate/who', function(req, res){

        if ( req.session.defendant) {
            defendant = req.session.defendant;
        } else {
            arrDummyDefendants = getDummyDefendants();
            defendant = arrDummyDefendants[2];
        }

        res.render('prototype-feb-2018/certificate/who', { defendant: defendant })
    });


    app.post('*/prototype-feb-2018/certificate/who', function(req, res){
        var defendant = req.session.defendant || getDummyDefendant();
        var defendants = req.session.defendants || getDummyDefendants();

        if ( req.body['addressed-to'] || req.body['addressed-role'] ) {
            defendant.addressedTo = req.body['addressed-to'];
            defendant.addressedRole = req.body['addressed-role'];
            req.session.defendants = updateDefendant(defendant, defendants);
        }
        res.render('prototype-feb-2018/certificate/how', { defendant: defendant })
    });


    app.get('*/prototype-feb-2018/certificate/litigation-friend', function(req, res){
        res.render('prototype-feb-2018/certificate/litigation-friend', { defendant: req.session.defendant })
    });

    app.post('*/prototype-feb-2018/certificate/litigation-friend', function(req, res){
        var defendant = req.session.defendant || getDummyDefendant();
        var defendants = req.session.defendants || getDummyDefendants();

        if ( req.body['served-friend'] == 'no' ) {
            defendant.defendantName =  req.body['served-to'];
            defendant.defendantType =  'authority';
            req.session.defendants = updateDefendant(defendant, defendants);
            req.session.defendant = defendant;
            res.render('prototype-feb-2018/certificate/friend-address', { defendant: defendant })
        } else if ( req.body['friend_Postcode'] ) {

            req.session.documents = 'Certificate of suitability';
            res.render('prototype-feb-2018/certificate/upload', { defendant: defendant, defendants: req.session.defendants, documents: req.session.documents, uploads: req.session.uploads });

        } else {
            res.render('prototype-feb-2018/certificate/litigation-friend', { defendant: defendant })
        }


    });

    app.get('*/prototype-feb-2018/certificate/litigation-friend-name', function(req, res){
        var defs = getDummyDefendants();
        var defendant = defs[defs.length-1];
        req.session.defendants = [defendant];
        req.session.defendant = defendant;

        res.render('prototype-feb-2018/certificate/litigation-friend-name', { defendant: defendant })
    });


    app.get('*/prototype-feb-2018/certificate/how', function(req, res){
        var defendant = req.session.defendant || getDummyDefendant();

        res.render('prototype-feb-2018/certificate/how', { defendant: defendant })
    });

    app.post('*/prototype-feb-2018/certificate/how', function(req, res){
        var defendant = req.session.defendant || getDummyDefendant();
        if (req.body['files']) {
            req.session.files = req.body['files'].substring( 0, req.body['files'].length-1).split("|");
        } else {
            req.session.files = getDummyFiles();
        }

        if ( defendant.defendantType == 'company' && defendant.solicitor == '-' ) {
            res.render('prototype-feb-2018/certificate/who', { defendant: defendant })
        } else {
            res.render('prototype-feb-2018/certificate/how', { defendant: defendant })
        }
    });

    app.get('*/prototype-feb-2018/certificate/when', function(req, res){
        var defendant = req.session.defendant || getDummyDefendant();

        res.render('prototype-feb-2018/certificate/when', { defendant: defendant })
    });

    app.get('*/prototype-feb-2018/certificate/check-your-answers', function(req, res){
        var defendants = req.session.defendants || getDummyDefendants();
        var defendant = req.session.defendant || defendants[0];
        var documents = req.session.documents || getDummyDocuments();
        var files = req.session.files || getDummyFiles();
        var orgName = req.session.orgName || 'My Solicitor Firm';
console.log( defendant );
        res.render('prototype-feb-2018/certificate/check-your-answers', { documents: documents, defendant: defendant, defendants: defendants, files: files, orgName: orgName })
    });

    app.post('*/prototype-feb-2018/certificate/friend-address', function(req, res){
        var defendant = req.session.defendant || getDummyDefendant();
        var defendants = req.session.defendants || getDummyDefendants();

        var friendServiceAddress1 = (req.session.data['friend_AddressLine1']) ? req.session.data['friend_AddressLine1'] : '-'
        var friendServiceAddress2 = (req.session.data['friend_AddressLine2']) ? req.session.data['friend_AddressLine2'] : ''
        var friendServiceTown = (req.session.data['friend_city']) ? req.session.data['friend_city'] : ''
        var friendServicePostcode = (req.session.data['friend_Postcode']) ? req.session.data['friend_Postcode'] : ''
        defendant.serviceAddress = friendServiceAddress1 + ' ' + friendServiceAddress2 + ' ' + friendServiceTown + ' ' + friendServicePostcode

        req.session.defendants = updateDefendant(defendant, defendants);
        req.session.defendant = defendant;

        res.render('prototype-feb-2018/certificate/where', { defendant: defendant })

    });

    app.post('*/prototype-feb-2018/certificate/where', function(req, res){
        var defendant = req.session.defendant || getDummyDefendant();
        var defendants = req.session.defendants || getDummyDefendants();

        if ( req.body['how-served']) {
            defendant.howServed = req.body['how-served'];
            req.session.defendants = updateDefendant(defendant, defendants);
        }

        if ( defendant.howServed && defendant.defendantType == 'authority' ) {
            res.render('prototype-feb-2018/certificate/friend-address', { defendant: defendant });
        } else {
            res.render('prototype-feb-2018/certificate/where', { defendant: defendant, howServed: defendant.howServed });
        }

    });

    app.get('*/prototype-feb-2018/certificate/where', function(req, res){
        var defendants = req.session.defendants || getDummyDefendants();
        var defendant = req.session.defendant || defendants[0];

        res.render('prototype-feb-2018/certificate/where', { defendant: defendant, howServed: req.body['how-served'] });

    });

    app.post('*/prototype-feb-2018/certificate/when', function(req, res){

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
            res.render('prototype-feb-2018/certificate/when', { defendant: defendant, blnShowTime: blnShowTime, howServed: defendant.howServed });
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

                res.render('prototype-feb-2018/certificate/check-your-answers', { documents: documents, defendant: defendant, defendants: defendants, files: files, orgName: orgName });
            } else {


                //find the next one and go again
                var defendants = req.session.defendants || getDummyDefendants();

                for ( i=0; i<defendants.length; i++ ) {
                    if ( defendants[i].defendantNo == defendant.defendantNo ) {

                        req.session.defendant = defendants[i+1];

                        if ( req.session.defendant.defendantType == 'company' && req.session.defendant.solicitor == '-' ) {
                            res.render('prototype-feb-2018/certificate/who', { defendant: req.session.defendant })
                        } else if ( req.session.defendant.defendantType == 'friend') {
                            res.render('prototype-feb-2018/certificate/litigation-friend', { defendant: req.session.defendant })
                        } else {
                            res.render('prototype-feb-2018/certificate/how', { defendant: req.session.defendant })
                        }

                        break;
                    }
                }

            }
        }
    });

    app.post('*/prototype-feb-2018/certificate/submitted', function(req, res){
        var defendants = req.session.defendants || getDummyDefendants();

        res.render('prototype-feb-2018/certificate/submitted', { defendants: defendants })
    });

    app.get('*/prototype-feb-2018/certificate/submitted', function(req, res){
        var defendants = req.session.defendants || getDummyDefendants();

        res.render('prototype-feb-2018/certificate/submitted', { defendants: defendants })
    });

    app.get('*/prototype-feb-2018/certificate/view', function(req, res){
        var defendants = req.session.defendants || getDummyDefendants();
        var documents = req.session.documents || getDummyDocuments();
        var files = req.session.files || getDummyFiles();
        var orgName = req.session.orgName || 'My Solicitor Firm';

        res.render('prototype-feb-2018/certificate/view', { documents: documents, defendants: defendants, files: files, orgName: orgName })
    });

    app.get('*/prototype-feb-2018/certificateOfService', function(req, res){
        //var claimants  = [{ name: 'Jimmy Smith1' },{ name: 'Jimmy Smith2' },{ name: 'Jimmy Smith3' },{ name: 'Jimmy Smith4' }];
        var claimants  = [{ name: 'Jimmy Smith1' }];
        var defendant = { defendantNo: 2, defendantName: 'Mr Bob Goddard', defendantAddress: '30 LONGBRIDGE ROAD\n HORLEY\n RH6 7EL', solicitor: 'Keoghs LLP', serviceAddress: '2 COLCHESTER STREET\n COVENTRY\n CV1 5NZ', defendantCountry: 'England', howServed: 'Fax', serviceMethod: 'fax', serviceFax: '01483 562742', destination: 'place of business', serveDay: '8', serveMonth: '10', serveMonthWord: 'October', serveYear: '2017', serveDate: '9 October 2017', serveHour: '6', serveMinutes: '23', serveAmPm: 'PM' };

        serviceSentDate = defendant.serveDay + ' ' + getMonth( defendant.serveMonth ) + ' ' + defendant.serveYear;

        res.render('prototype-feb-2018/certificateOfService', { defendant: defendant, claimants: claimants, documents: getDummyDocuments(), signerName: 'Robert Wagner', signerCompany: 'Wagner & Co Legal', signerRole: 'Senior solicitor', signerDate: '14 October 2017', serviceSentDate: serviceSentDate, serviceDate: defendant.serveDate, claimReferenceNumber: '123ML143' });
    });



    app.post('*/prototype-feb-2018/respondent/litigation-friend-name', function(req, res){
        var defs = getDummyDefendants();
        var defendant = defs[0];
        req.session.defendants = [defendant];
        defendant.defendantName = 'Jan Clarke';
        req.session.defendant = defendant;
        res.render('prototype-feb-2018/respondent/litigation-friend-name', { defendant: defendant })
    });

    app.get('*/prototype-feb-2018/respondent/litigation-friend-name', function(req, res){
        var defs = getDummyDefendants();
        var defendant = defs[0];
        req.session.defendants = [defendant];
        defendant.defendantName = 'Jan Clarke';
        req.session.defendant = defendant;
        res.render('prototype-feb-2018/respondent/litigation-friend-name', { defendant: defendant })
    });

    app.post('*/prototype-feb-2018/respondent/litigation-friend-address-same', function(req, res){

        var defendants = req.session.defendants || getDummyDefendants();
        var defendant = req.session.defendant || defendants[0];
        var documents = req.session.documents || getDummyDocuments();

        if ( req.body['friend_address_same'] ) {

            if ( req.body['friend_address_same'] == 'yes' ) {
                req.session.documents = 'Certificate of suitability';
                res.render('prototype-feb-2018/certificate/upload', { defendant: defendant, defendants: req.session.defendants, documents: req.session.documents, uploads: req.session.uploads });

            } else {
                res.redirect('litigation-friend-address');
            }

        } else {

//            var defs = getDummyDefendants();
  //          var defendant = defs[0];

            defendant.defendantNameMinor = 'Jan Clarke';
            defendant.friendName = req.body['friend_name'];
            defendant.defendantName = req.body['friend_name'];
            req.session.defendants = [defendant];
            req.session.defendant = defendant;

            res.render('prototype-feb-2018/respondent/litigation-friend-address-same', { defendant: defendant })
        }

    });

    app.get('*/prototype-feb-2018/respondent/litigation-friend-address-same', function(req, res){
        var defs = getDummyDefendants();
        var defendant = defs[0];
        req.session.defendants = [defendant];
        defendant.defendantName = 'Jan Clarke';
        req.session.defendant = defendant;
        res.render('prototype-feb-2018/respondent/litigation-friend-address-same', { defendant: defendant })
    });

    app.get('*/prototype-feb-2018/respondent/litigation-friend-address', function(req, res){

        
        res.render('prototype-feb-2018/respondent/litigation-friend-address', { defendant: req.session.defendant })
    });



    app.post('*/prototype-feb-2018/acknowledgement/check-your-answers', function(req, res){

        if ( !req.session.data['intention'] ) {
            req = getResponseData(req);
        }
        res.render('prototype-feb-2018/acknowledgement/check-your-answers', { data: req.session.data } );
    });

    app.get('*/prototype-feb-2018/acknowledgement/check-your-answers', function(req, res){

        if ( !req.session.data['intention'] ) {
            req = getResponseData(req);
        }
        res.render('prototype-feb-2018/acknowledgement/check-your-answers', { data: req.session.data } );

    });

    app.get('*/prototype-feb-2018/acknowledgement/view', function(req, res){
        req = getResponseData(req);
        res.render('prototype-feb-2018/acknowledgement/view', { data: req.session.data } );
    });

    app.get('*/prototype-feb-2018/respondent/start-defence', function(req, res){
        req.session.data['response'] = 'Defence';
        res.render('prototype-feb-2018/respondent/representative-name', { data: req.session.data } );
    });

    app.get('*/prototype-feb-2018/respondent/start-admission', function(req, res){
        req.session.data['response'] = 'Admission';
        res.render('prototype-feb-2018/respondent/representative-name', { data: req.session.data } );
    });

    app.post('*/prototype-feb-2018/respondent/response', function(req, res){

        if ( req.session.data['response'] == 'Admission' ) {
            res.render('prototype-feb-2018/respondent/admission', { data: req.session.data } );            
        } else {
            res.render('prototype-feb-2018/respondent/upload', { data: req.session.data } );
        }
    });

    app.post('*/prototype-feb-2018/respondent/upload-admission', function(req, res){
//        req.session.data['response'] = 'Admission';
        res.redirect('upload');

    });

    


    app.post('*/prototype-feb-2018/respondent/check-your-answers', function(req, res){

        req.session.data['name'] = 'Jan Clarke';
        req.session.data['uploaded-file'] = req.session.data['name'] + ' ' + ( req.session.data['response'] || 'Defence' ) + '.pdf1';

        if ( req.session.data['day'] && req.session.data['month'] && req.session.data['year'] ) {
            req.session.data['dob'] = req.session.data['day'] + ' ' + getMonth( req.session.data['month']) + ' ' + req.session.data['year'];
        } else {
            req.session.data['dob'] = '2 September 1982';
        }

        if ( !req.session.data['response'] ) {
            req = getResponseData(req);
        }
        res.render('prototype-feb-2018/respondent/check-your-answers', { data: req.session.data } );
    });


    app.get('*/prototype-feb-2018/respondent/check-your-answers', function(req, res){

        req.session.data['name'] = 'Jan Clarke';

        if ( req.session.data['day'] && req.session.data['month'] && req.session.data['year'] ) {
            req.session.data['dob'] = req.session.data['day'] + ' ' + getMonth( req.session.data['month']) + ' ' + req.session.data['year'];
        } else {
            req.session.data['dob'] = '2 September 1982';
        }

        if ( !req.session.data['response'] ) {
            req = getResponseData(req);
        }

        req.session.data['uploaded-file'] = req.session.data['name'] + ' ' + ( req.session.data['response'] || 'Defence' ) + '.pdf';

        res.render('prototype-feb-2018/respondent/check-your-answers', { data: req.session.data } );

    });

    app.get('*/prototype-feb-2018/respondent/view', function(req, res){

        req.session.data['name'] = 'Jan Clarke';

        if ( req.session.data['day'] && req.session.data['month'] && req.session.data['year'] ) {
            req.session.data['dob'] = req.session.data['day'] + ' ' + getMonth( req.session.data['month']) + ' ' + req.session.data['year'];
        } else {
            req.session.data['dob'] = '2 September 1982';
        }

        if ( !req.session.data['response'] ) {
            req = getResponseData(req);
        }

        req.session.data['uploaded-file'] = req.session.data['name'] + ' ' + ( req.session.data['response'] || 'Defence' ) + '.pdf';

        res.render('prototype-feb-2018/respondent/view', { data: req.session.data } );

    });

    app.post('*/prototype-feb-2018/judgment/transfer', function(req, res){

        if ( req.session.data['transfer'] === 'yes' ) {
            res.redirect('business')
        } else {
            res.redirect('transferred')
        }
    });

    app.post('*/prototype-feb-2018/extension/respond', function(req, res){

        if ( req.session.data['extension'] === 'yes' ) {
            res.redirect('approved')
        } else {
            res.redirect('rejected')
        }
    });

    app.get('*/prototype-admin/view-data', function(req, res){
        res.render('prototype-admin/view-data', { data: JSON.stringify( req.session, null, 2) } )
    });

}





function getDummyDefendants() {

    var moment = require('moment');
    var today = moment();

    return [ { defendantNo: 1, defendantType: 'trader', defendantName: 'Jan Clarke trading as Clarke Construction', defendantAddress: '115 EASTWICK PARK AVENUE LEATHERHEAD KT23 3NW', solicitor: '-', serviceAddress: '115 EASTWICK PARK AVENUE\nLEATHERHEAD\nKT23 3NW', defendantCountry: 'England', howServed: 'First class post', destination: 'usual residence', serveDay: today.clone().subtract(2, 'days').format('D'), serveMonth: today.clone().subtract(2, 'days').format('MM'), serveMonthWord: today.clone().subtract(2, 'days').format('MMMM'), serveYear: today.clone().subtract(2, 'days').format('YYYY'), serveDate: today.clone().format('DD MMMM YYYY') }, { defendantNo: 2,  defendantType: 'company', defendantName: 'Goddard Plumbing', defendantAddress: '30 LONGBRIDGE ROAD\n HORLEY\n RH6 7EL', solicitor: 'Keoghs LLP', serviceAddress: '2 COLCHESTER STREET\n COVENTRY\n CV1 5NZ', defendantCountry: 'England', howServed: 'Fax', serviceFax: '01483 562742', destination: 'place of business', serveDay: today.clone().subtract(2, 'days').format('D'), serveMonth: today.clone().subtract(2, 'days').format('MM'), serveMonthWord: today.clone().subtract(2, 'days').format('MMMM'), serveYear: today.clone().subtract(2, 'days').format('YYYY'), serveDate: today.clone().subtract(1, 'days').format('DD MMMM YYYY'), serveHour: '6', serveMinutes: '23', amPm: 'PM' }, { defendantNo: 3,  defendantType: 'company', defendantName: 'Kingsley Building Ltd', defendantAddress: '31 TANGLEY LANE GUILDFORD GU3 3JU', solicitor: '-', serviceAddress: '31 TANGLEY LANE\n GUILDFORD\n GU3 3JU', defendantCountry: 'England', howServed: 'Personally handed to or left with with recipient', addressedTo: 'Jimmy Smith', addressedRole: 'Director', leftWith: 'Dave Smith', destination: 'principal place of business', serveDay: today.clone().subtract(2, 'days').format('D'), serveMonth: today.clone().subtract(2, 'days').format('MM'), serveMonthWord: today.clone().subtract(2, 'days').format('MMMM'), serveYear: today.clone().subtract(2, 'days').format('YYYY'), serveDate: today.clone().format('D MMMM YYYY') }, { defendantNo:4, defendantType: 'friend', defendantName: 'Stanley Jones', defendantNameMinor: 'Michael Jones', defendantAddress: '48A LONGBRIDGE ROAD HORLEY RH6 7EL', serviceAddress: '48A LONGBRIDGE ROAD HORLEY RH6 7EL', solicitor: '-', howServed: 'First class post', destination: 'usual residence', serveDay: today.clone().subtract(2, 'days').format('D'), serveMonth: today.clone().subtract(2, 'days').format('MM'), serveMonthWord: today.clone().subtract(2, 'days').format('MMMM'), serveYear: today.clone().subtract(2, 'days').format('YYYY'), serveDate: today.clone().format('DD MMMM YYYY') } ];
}

function getDummyDefendant() {
    var arrDummyDefendants = getDummyDefendants();
    return arrDummyDefendants[0];
}

function getDummyDocuments() {
    return [ 'Claim form', 'Particulars of claim', 'Response pack', 'Medical reports', 'Schedule of loss', 'Certificate of suitability' ];
}

function getDummyFiles() {
    return [ 'Particulars of claim.pdf', 'Medical report.jpg', 'Schedule of loss.xls', 'Certificate of suitability.pdf' ];
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

function getResponseData( req ) {
    req.session.data['rep_company_name'] = 'Smith & Co Solicitors';
    req.session.data['rep_AddressLine1'] = '173 High Holborn';
    req.session.data['rep_city'] = 'London';
    req.session.data['rep_Postcode'] = 'WC1V 7AA';
    req.session.data['rep_phone_number'] = '020 36258414';
    req.session.data['rep_email'] = 'admin@smiths.co.uk';
    req.session.data['rep_dx_number'] = 'CDE 823 London';
    req.session.data['name'] = 'Jan Clarke';
    req.session.data['your-ref'] = 'PW1348-151117';
    req.session.data['defendant-ref'] = 'JK/639127/134';
    req.session.data['dob'] = '2 September 1982';
    req.session.data['response'] = 'Defence';
    req.session.data['uploaded-file'] = 'Jan Clarke Defence.pdf';

    return req;
}

function getMonth( intMonth ) {
    var arrMonths = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];
    return arrMonths[ parseInt(intMonth, 10) ];
}

function isUK( strCountry ) {
    return ( strCountry.toLowerCase() == 'scotland' || strCountry.toLowerCase() == 'northern ireland' || strCountry.toLowerCase() == 'ni' ||  strCountry.toLowerCase().indexOf('bt') === 0 );
}

function isConventionTerritory( strCountry ) {
    arrTerritories = ['aland islands', 'åland islands', 'austria', 'azores', 'balgariya', 'bǎlgariya', 'belgie', 'belgië', 'belgien', 'belgique', 'belgium', 'bulgaria', 'canary islands', 'cesko', 'česko', 'ceuta', 'croatia', 'cyprus', 'czech republic', 'danmark', 'denmark', 'deutschland', 'deyrnas unedig', 'eesti', 'eire', 'éire', 'ellada', 'elláda', 'espana', 'españa', 'estonia', 'finland', 'france', 'germany', 'gibraltar', 'greece', 'guadeloupe', 'hrvatska', 'hungary', 'ireland', 'italia', 'italy', 'kibris', 'kipros', 'kípros', 'kıbrıs', 'latvia', 'latvija', 'letzebuerg', 'lëtzebuerg', 'lietuva', 'lithuania', 'luxembourg', 'luxemburg', 'madeira', 'magyarorszag', 'magyarország', 'malta', 'martinique', 'mayotte', 'melilla', 'nederland', 'netherlands', 'osterreich', 'österreich', 'plazas de soberania', 'plazas de soberanía', 'poland', 'polska', 'portugal', 'reunion', 'réunion', 'romania', 'românia', 'saint martin', 'slovakia', 'slovenia', 'slovenija', 'slovensko', 'spain', 'suomi', 'sverige', 'sweden', 'united kingdom', 'ελλάδα', 'κύπρος', 'българия', 'iceland', 'norway', 'switzerland', 'denmark'];
    return (arrTerritories.indexOf( strCountry.toLowerCase() ) >= 0 );
}

