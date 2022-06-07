const PORT = 8000;
const express = require('express');
const { MongoClient } = require('mongodb');
const router = express.Router();
const axios = require('axios');
const cors = require('cors'); 
const fs = require('fs');
const { userInfo } = require('os');

const app = express();

app.use(cors());
app.use(express.static("."));

app.get('/', (request, response) => {
    fs.readFile('./index.html', 'utf8', (err, html) => {
        if (err) {
            response.status(500).send(err, 'failed to read file');
        }
        response.send(html);
    });
});

app.get('/merch', (request, response) => {
    fs.readFile('./merch/merch.html', 'utf8', (err, html) => {
        if (err) {
            response.status(500).send(err, 'failed to read file');
        }
        response.send(html);
    });
});


app.get('/prices', (request, response) => {
    fs.readFile('./merch/merchPrices.json', 'utf8', (err, json) => {
        if (err) {
            response.status(500).send(err, 'failed to get Prices');
        }
        response.send(json);
    });
});

app.get('/merchURLs', (request, response) => {
    fs.readFile('./merch/merchURLs.json', 'utf8', (err, json) => {
        if (err) {
            response.status(500).send(err, 'failed to get URLs');
        }
        response.send(json);
    });
});

app.post('/pay', async (request, response) => {
    const userInfo = JSON.parse(request.body);

    const uri = "mongodb+srv://WhoopdoopMerch:xOE8g0I1VIF6JTiS@whoopdoopmerch.l9twx.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
    
    try {
        await client.connect();
        console.log('Connected to MongoDB');

        await createUser(client, userInfo);
    }
    catch (err) {
        console.log(err);
    }
    finally {
        await client.close();
    }

    response.send('Success');
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});


//Creates a User in the database
const createUser = async (client, newUser) => {
    const result = await client.db('WhoopdoopMerch').collection('users').insertOne(newUser);

    console.log(`New User Created: ${result.insertedId}`);
}