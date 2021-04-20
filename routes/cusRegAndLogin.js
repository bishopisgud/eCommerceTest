const formidable = require('formidable');
const bcrypt = require('bcrypt');
const db = require('../db/dbConfig');


//Customer Signup Session
let custSignupRoute = (req, res) => {
    if(!req.session.loggedIn){
        
        let customerSignup = new Object();

        new formidable.IncomingForm().parse(req)
        .on('field', (field, value) => {
            if(field == 'username'){
                customerSignup.username = value;
            }
            if(field == 'userPass'){
                customerSignup.userPass = value;
            }
            if(field == 'email'){
                customerSignup.email = value;
            }
            if(field == 'phone'){
                customerSignup.phone = value;
            }
            if(field == 'stateId'){
                customerSignup.stateId = value;
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


            //create Customer Registration
            let salt = 10;
            bcrypt.hash(customerSignup.userPass, salt, function (err, encrypted) {
                if (!err) {
                    let userCus = {username: customerSignup.username, email: customerSignup.email, phone: customerSignup.phone, userPass: encrypted, stateId: customerSignup.stateId}
                    let sql = 'INSERT INTO customers SET ?';
                    db.query(sql, userCus, (err, results) =>{
                        if(err) throw err;
                        console.log(results);
                    });
                    
                }
                else {
                    throw err;
                }
            })

        })
    }
}
//Staff Login Session
let custLoginRoute = (req, res) => {
    if(!req.session.loggedIn){ //User logged In
        let customerLogin = new Object();

        new formidable.IncomingForm().parse(req)
    
        .on('field', (field, value) => {

            if(field == 'email'){
                customerLogin.email = value;
            }
            if(field == 'userPass'){
                customerLogin.userPass = value;
            }
    
        })
        .on('aborted', () => {
            console.error('Request aborted by the user')
        })
        .on('error', (err) => {
            console.error('Error', err)
            throw err
        })
        .on('end', (err) => {
                if(err) throw err;
                let email = customerLogin.email;
                let sql = "SELECT * FROM staff WHERE email = ?";
                db.query(sql, [email], (err, result) => {
                    if(err) throw err;
                    if(result.length >= 1) {
                        userRow = JSON.parse(JSON.stringify(result[0]));
                
                        let password = userRow.userPass;
                        bcrypt.compare(customerLogin.userPass, password, function (err, result) {
                            if (result == true) {
                                res.sendStatus(200);
                            }
                            else{
                                res.sendStatus(404);
                            }
                        });
                    }
                });
        });
        
    }
   
}


module.exports = {custSignupRoute, custLoginRoute};