const express = require('express');
const session = require('express-session');

const bcrypt = require('bcrypt');

const { signupRoute, loginRoute } = require('./routes/staffRegAndLogin');
const {custSignupRoute, custLoginRoute}  = require('./routes/cusRegAndLogin');
const salesOperation = require('./routes/salesOperation');

const db = require('./db/dbConfig');
const app = express();

const http = require('http').Server(app);

const port = 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());


//Session setup
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}));

//DB connection
db.connect((err) => {
    if(err) {
        console.log('DB Error: '+err);
    }
    console.log('DB connected');
})

//Customers Reg and Login Connection
app.post('/customerSignup', custSignupRoute);
app.post('/customerLogin', custLoginRoute);

//Staff Reg and Login Connection
app.post('/staffSignup', signupRoute);
app.post('/staffLogin', loginRoute);

//Sales Operation Connection
app.post('/salesOp', salesOperation);

console.log('here');
http.listen(port, () => {
    console.log('Running on port: '+port);
});