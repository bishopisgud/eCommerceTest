const formidable = require('formidable');
const bcrypt = require('bcrypt');
const db = require('../db/dbConfig');


let orderOperation = (req, res) => {
    if (!req.session.loggedIn) {
        regEcommerce = new Object();

        new formidable.IncomingForm().parse(req)
            .on('field', (field, value) => {

                if (field == 'customersId') {
                    regEcommerce.customersId = value;
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
            let userStaff = {customersId: regEcommerce.customersId};
            let sql = `INSERT INTO orders SET ?`;
            db.query(sql, userStaff, (err, results) =>{
                if(err) throw err;
                console.log(results);
            });
                
        });
    }
}
module.exports = orderOperation;