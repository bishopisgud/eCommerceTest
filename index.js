const express = require('express');
const session = require('express-session');

const bcrypt = require('bcrypt');  

const { signupRoute, loginRoute } = require('./routes/staffRegAndLogin'); // Staff Reg and Login
const {custSignupRoute, custLoginRoute}  = require('./routes/cusRegAndLogin');// Customer's Reg and Login
const product = require('./routes/product');// Products
const productSalesOp = require('./routes/productSales');//ProductSales Operation
const productStockOp = require('./routes/productStock');//ProductStock Operation
const orderOperation = require('./routes/orders');//Order Operation
const stateOperation = require('./routes/state');

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


//product Connection
app.post('/productCalc', product);

//productSales Connection
app.post('/onSales', productSalesOp);

//productStock Connection
app.post('/onStock', productStockOp);

//Orders Connection
app.post('/orders', orderOperation);

//State Connection
app.post('/state', stateOperation);

http.listen(port, () => {
    console.log('Running on port: '+port);
});