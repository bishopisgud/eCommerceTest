const formidable = require('formidable');
const db = require('../db/dbConfig');


let product = (req, res) => {
    if (!req.session.loggedIn) {
        regEcommerce = new Object();

        new formidable.IncomingForm().parse(req)
            .on('field', (field, value) => {

                if (field == 'Name') {
                    regEcommerce.Name = value;
                }
                if (field == 'unitPrice') {
                    regEcommerce.unitPrice = value;
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
            let userStaff = {Name: regEcommerce.Name, unitPrice: regEcommerce.unitPrice};
            let sql = `INSERT INTO products SET ?`;
            db.query(sql, userStaff, (err, results) =>{
                if(err) throw err;
                console.log(results);
            });
                
        });
    }
};

// function computeRemainStock(productId){
//     let productId =
// }
module.exports = product;





