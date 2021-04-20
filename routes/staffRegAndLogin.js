const formidable = require('formidable');
const bcrypt = require('bcrypt');
const db = require('../db/dbConfig');

//Staff Signup Session
let signupRoute = (req, res) => {
    if (!req.session.loggedIn) {
        regEcommerce = new Object();

        new formidable.IncomingForm().parse(req)
            .on('field', (field, value) => {

                if (field == 'name') {
                    regEcommerce.name = value;
                }
                if (field == 'email') {
                    regEcommerce.email = value;
                }
                if (field == 'userPass') {
                    regEcommerce.userPass = value;
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
                let salt = 10;
                bcrypt.hash(regEcommerce.userPass, salt, function (err, encrypted) {
                    if (!err) {
                        let userStaff = {name: regEcommerce.name, email: regEcommerce.email, userPass: encrypted}
                        let sql = 'INSERT INTO staff SET ?';
                        db.query(sql, userStaff, (err, results) =>{
                            if(err) throw err;
                            console.log(results);
                        });
                        
                    }

                })

            })
    }
}

//Staff Login Session
let loginRoute = (req, res) => {
    if(!req.session.loggedIn){ //User logged In
        let loginEcommerce = new Object();

        new formidable.IncomingForm().parse(req)
    
        .on('field', (field, value) => {

            if(field == 'email'){
                loginEcommerce.email = value;
            }
            if(field == 'userPass'){
                loginEcommerce.userPass = value;
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
                let email = loginEcommerce.email;
                let sql = "SELECT * FROM staff WHERE email = ?";
                db.query(sql, [email], (err, result) => {
                    if(err) throw err;
                    if(result.length >= 1) {
                        userRow = JSON.parse(JSON.stringify(result[0]));
                
                        let password = userRow.userPass;
                        bcrypt.compare(loginEcommerce.userPass, password, function (err, result) {
                            if (result == true) {
                                //res 200 not found
                                res.sendStatus(200);
                            }
                            else{
                                //res 400 when successful
                                res.sendStatus(404);
                            }
                        });
                    }
                });
        });
        
    }
   
}
module.exports = { signupRoute, loginRoute };