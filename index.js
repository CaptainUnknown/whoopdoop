const PORT = 8000;
const express = require('express');
const { MongoClient } = require('mongodb');
const router = express.Router();
const axios = require('axios');
const cors = require('cors'); 
const fs = require('fs');
const { userInfo } = require('os');
const nodemailer = require('nodemailer');

const app = express();

app.use(cors());
app.use(express.static("."));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Home page
app.get('/', (request, response) => {
    fs.readFile('./index.html', 'utf8', (err, html) => {
        if (err) {
            response.status(500).send(err, 'failed to read file');
        }
        response.send(html);
    });
});

//=========================== ROUTES =================================
app.get('/merch', (request, response) => {
    fs.readFile('./merch/merch.html', 'utf8', (err, html) => {
        if (err) {
            response.status(500).send(err, 'failed to read file');
        }
        response.send(html);
    });
});

//=========================== REQUESTS =================================
//Prices of the merch
app.get('/prices', (request, response) => {
    fs.readFile('./merch/merchPrices.json', 'utf8', (err, json) => {
        if (err) {
            response.status(500).send(err, 'failed to get Prices');
        }
        response.send(json);
    });
});

//URLs of the merch images
app.get('/merchURLs', (request, response) => {
    fs.readFile('./merch/merchURLs.json', 'utf8', (err, json) => {
        if (err) {
            response.status(500).send(err, 'failed to get URLs');
        }
        response.send(json);
    });
});

//payment gateway
app.post('/pay', (request, response) => {
    const userInfo = request.body;
    
    if (createUserHandler(userInfo)){
        response.send('Success');
        writeEmail(userInfo);
    }
    else {
        response.send('Failed');
    }
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});


//=========================== EFFECTUATORS =================================
const createUserHandler = async (userInfo) => {
    const uri = "mongodb+srv://WhoopdoopMerch:xOE8g0I1VIF6JTiS@whoopdoopmerch.l9twx.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
    
    try {
        await client.connect();
        console.log('Connected to MongoDB');

        await createUser(client, userInfo);
    }
    catch (err) {
        console.log(err);
        return false;
    }
    finally {
        await client.close();
        return true;        
    }
}

//Creates a User in the database
const createUser = async (client, newUser) => {
    const result = await client.db('WhoopdoopMerch').collection('users').insertOne(newUser);

    console.log(`New User Created: ${result.insertedId}`);
}

//Generate an Email
const writeEmail = (userInfo) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'youremail@gmail.com', //  ADD EMAIL
          pass: 'yourpassword'        //   ADD PASSWORD
        }
    });

    var mailOptions = {
        from: 'fromThis@gmail.com', // ADD EMAIL
        to: 'toThis@gmail.com', // ADD EMAIL
        subject: 'Merch Request Recieved',
        text: 'User Wallet Addresses: ' + userInfo.walletAddress + '\n' + 'User Mail Addresses: ' + userInfo.mailaddress + '\n' + 'User Discord Nick: ' + userInfo.discordNickname + '\n' + 'User Bill Amount: ' + userInfo.totalBillingAmount + '\n' + 'User Generated Merch: ' + userInfo.generatedMerch + '\n' + 'Transaction Confirmed: ' + userInfo.transactionConfirmed + '\n',
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
    });
}