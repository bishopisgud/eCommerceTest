const formidable = require('formidable');
const db = require('../db/dbConfig');


let stateOperation = (req, res) => {
    if (!req.session.loggedIn) {
        regEcommerce = new Object();

        new formidable.IncomingForm().parse(req)
            .on('field', (field, value) => {

                if (field == 'state') {
                    regEcommerce.state = value;
                }
            })
            .on('aborted', () => {
                console.error('request aborted by user')
            })
            .on('error', (err) => {
                console.error('Error', err)
                throw err
            })
            .on('end', () => {

            //Insertion of Products
            let userStaff = {state: regEcommerce.state};
            let sql = `INSERT INTO state SET ?`;
            db.query(sql, userStaff, (err, results) =>{
                if(err) throw err;
                console.log(results);
            });
                
        });
    }
}
module.exports = stateOperation;