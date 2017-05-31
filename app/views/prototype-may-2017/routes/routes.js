module.exports = function(app){

    app.post('*/prototype-may-2017/representation', function(req, res){
        if (req.body.representativeType.toString() === 'represent') {
            res.redirect('representatives-details')
        }
        else {
            res.redirect('not-supported')
        }
    });

    app.post('*/prototype-may-2017/what-type-of-claimant', function(req, res){
        if (req.body.claimantType.toString() === 'company') {
            res.redirect('company-details')
        }
        else {
            res.redirect('claimant-name')
        }
    });

    app.post('*/prototype-may-2017/defendant-type', function(req, res){

        console.log(req.body.defendantType)
        if (req.body.defendantType.toString() === 'company') {
            res.redirect('defendant-company-details')
        }
        else {
            res.redirect('defendant-details')
        }
    });


}