// import{index} from "./js/index"

// Need to install express, mongoose, nodemon, and body-parser. Check dependencies in package.json
const express = require("express");

// parse data from POST methods into JSON format since MongoDB stores it in JSON
const bodyParser = require("body-parser");

//create data models for MongoDB
const mongoose = require("mongoose");

//create the express app
const app = express();

//set Strict Query parameters to false to fix Deprecation warning
mongoose.set('strictQuery', false);

//create the connection to the mongoDB hosted in cloud
mongoose.connect('mongodb+srv://eCommerceDB:NYknicks72@cluster0.rpuki8v.mongodb.net/?retryWrites=true&w=majority')

//create variable to store connection 
const db = mongoose.connection;

db.on("error", ()=> console.log("Connection to database Failed"));
db.once("open", () => console.log("Connection to Database successful"));

//Create the customers collection that will hold our customerData object
// db.createCollection("customers", function(err, res){
//     if(err) throw err;
//     console.log("Collection created");
// })

//Tells system that you want JSON to be used which we can send to mongoDB
app.use(bodyParser.json());

//You can find the static files in the public director
app.use(express.static('public'));
//parses any url
app.use(bodyParser.urlencoded({
    extended:true
}));

app.post("/sign_up", (req,res)=>{
    const firstName = req.body.input_first_name;
    const lastName = req.body.input_last_name;
    const email = req.body.input_email;
    const password = req.body.input_password;
    const address = req.body.input_address;
    const city = req.body.input_city;
    const country = req.body.input_country;
    const zipCode = req.body.input_zip_code;
    const phoneNumber = re.body.input_phone_number;
    const creditCardNum = req.body.input_credit_card;
    
    //create object to store customer data
    const customerData = {
        "firstName": firstName,
        "lastName": lastName,
        "email": email,
        "password": password,
        "address": address,
        "city": city,
        "country": country,
        "zipCode": zipCode,
        "phoneNumber": phoneNumber,
        "creditCardNum": creditCardNum
    }

    //insert the customerData document into customers schema
    db.collection("customers").insertOne(customerData,(err, collection)=>{
        if(err){
            throw err;
        }
        console.log("Customer data upload successful");
    });

    return res.redirect('login.html');
})

//allow requesting code from any origin to access resource
app.get("/", (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": "*"
    });
    return res.redirect('index.html')
}).listen(3000);
console.log("Server start, begin to listening on PORT 3000");