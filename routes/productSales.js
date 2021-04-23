const formidable = require('formidable');
const db = require('../db/dbConfig');


let productSalesOp = (req, res) => {
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
                    regEcommerce.staffId = value;
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
            let userStaff = {productStockId: regEcommerce.productStockId, Quantity: regEcommerce.Quantity, OrderId: regEcommerce.OrderId, staffId: regEcommerce.staffId};
            let sql = 'INSERT INTO productSales SET ?';
            db.query(sql, userStaff, (err, results) =>{
                if(err) throw err;
                console.log(results);
            });
                
        });
    };
};


module.exports = productSalesOp;