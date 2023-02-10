// Need to install express, mongoose, nodemon, and body-parser. Check dependencies in package.json
const express = require("express");

// parse data from POST methods into JSON format since MongoDB stores it in JSON
const bodyParser = require("body-parser");

//create data models for MongoDB
const mongoose = require("mongoose");

//create the express app
const app = express();

//Tells express we're using EJS as a template engine 
app.set('view engine' , 'ejs');

//set Strict Query parameters to false to fix Deprecation warning
mongoose.set('strictQuery', false);

//create the connection to the mongoDB hosted in cloud
mongoose.connect('mongodb+srv://eCommerceDB:NYknicks72@cluster0.rpuki8v.mongodb.net/?retryWrites=true&w=majority')

//create variable to store connection 
const db = mongoose.connection;

db.on("error", ()=> console.log("Connection to database Failed"));
db.once("open", () => console.log("Connection to Database successful"));

app.use(bodyParser.json());
app.use(express.static('docs'));
//parses any url
app.use(bodyParser.urlencoded({
    extended:true
}));

//TODO: future implementation for sending email notifications to users
app.post("/send_email", (req, res)=>{
    window.open('mailto:test@example.com?subject=subject&body=body');
    console.log("email sent!");
})

//Read the user details from database, send to array and render it
app.get("/", function (req, res) {
    db.collection("customers").find().toArray()
        .then(results=>{
            res.render('account-details.ejs', {customers: results})
        })
        .catch()
  });

//Handling the user login
app.post("/login", (req, res)=>{
    const email = req.body.input_login_email;
    const password = req.body.input_password;

    //not storing the session client side 
    db.collection("customers").findOne({
        email : email,
        password: password
        }, function(err, collection){
            //messages to show login response
            if(collection){
                console.log("Login Successful");
            } else {
                console.log("Login Failed");
            }
            return res.redirect('index.html')
        })
})

//Handling the user sign up
app.post("/sign_up", (req,res)=>{
    const firstName = req.body.input_first_name;
    const lastName = req.body.input_last_name;
    const email = req.body.input_email;
    const accountType = req.body.input_account_type;
    const address = req.body.input_address;
    const city = req.body.input_city;
    const country = req.body.input_country;
    const zipCode = req.body.input_zip_code;
    const phoneNumber = req.body.input_phone_number;
    const creditCardNum = req.body.input_credit_card;
    
    //create object to store customer data
    const customerData = {
        "firstName": firstName,
        "lastName": lastName,
        "email": email,
        "accountType": accountType,
        "address": address,
        "city": city,
        "country": country,
        "zipCode": zipCode,
        "phoneNumber": phoneNumber,
        "creditCardNum": creditCardNum
    }

    //insert the customerData document into customers schema
    db.collection('customers').insertOne(customerData,(err, collection)=>{
        if(err){
            throw err();
        }
        console.log("Customer data upload successful");
    });
    return res.redirect('log-in.html');
})

//allow requesting code from any origin to access resource
app.get("/", (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": "*"
    });
    return res.redirect('index.html')
}).listen(3000);
console.log("Server start, begin to listen on PORT 3000");
