const formidable = require('formidable');
const bcrypt = require('bcrypt');
const db = require('../db/dbConfig');


//Staff Signup Session
let salesOperation = (req, res) => {
    if (!req.session.loggedIn) {
        regEcommerce = new Object();

        new formidable.IncomingForm().parse(req)
            .on('field', (field, value) => {

                if (field == 'productStockId') {
                    regEcommerce.productStockId = value;
                }
                if (field == 'Quantity') {
                    regEcommerce.Quantity = value;
                }
                if (field == 'OrderId') {
                    regEcommerce.OrderId = value;
                }
                if (field == 'staffId') {
                    regEcommerce.OrderId = value;
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


                //create Staff Registration
                if (!err) {
                    let userStaff = {productStockId: regEcommerce.productStockId, Quantity: regEcommerce.Quantity, OrderId: regEcommerce.OrderId, staffId: regEcommerce.staffId}
                    let sql = 'INSERT INTO productSales SET ?';
                    db.query(sql, userStaff, (err, results) =>{
                        if(err) throw err;
                        console.log(results);
                    });
                    
                }

            })
    }
}

module.exports = salesOperation;