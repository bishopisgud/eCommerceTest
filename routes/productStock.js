const formidable = require('formidable');
const db = require('../db/dbConfig');


let productStockOp = (req, res) => {
    if (!req.session.loggedIn) {
        regEcommerce = new Object();

        new formidable.IncomingForm().parse(req)
            .on('field', (field, value) => {

                if (field == 'productsId') {
                    regEcommerce.productsId = value;
                }
                if (field == 'Quantity') {
                    regEcommerce.Quantity = value;
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
            let err;
            let userStaff = {productsId: regEcommerce.productsId, Quantity: regEcommerce.Quantity};
            let sql = 'INSERT INTO productStock SET ?';
            db.query(sql, userStaff, (err, results) =>{
                if(err) throw err;
                console.log(results);
            });
                
        });
    };
};

module.exports = productStockOp;