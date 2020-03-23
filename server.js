const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path'); // gives us pathing for our directory. native module

if (process.env.NODE_ENV !== 'production') require('dotenv').config(); // allows us to access secret key

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express(); // give us a new app
const port = process.env.PORT || 5000; // sets port. Heroku sets this automatically. go set proxy on client

app.use(bodyParser.json()); // process any request's body tag as json. a way to not have to call .json
app.use(bodyParser.urlencoded({extended: true})) //make sure that URLs are encoded properlu

app.use(cors()); //allows us to make requests from client which is at another origin (aka port)

// now we need to serve our client application
if (process.env.NODE_ENV === 'production') {
    // serve all static files in our build folder
    app.use(express.static(path.join(__dirname, 'client/build')));

    app.get('*', function (request, responseToSendBackToclient) {
        responseToSendBackToclient.sendFile(path.join(__dirname, 'client/build', 'index.html'))
    }) //for any url that the user tries to GET, perform the function included (which just gives the user the index.html
}

app.listen(port, error => { // listen for errors and do the following
    if (error) throw error;
    console.log('Server running on port: ' + port);
})

app.post('/payment', (req, res) => {
    const body = {
        source: req.body.token.id,
        amount: req.body.amount,
        currency: 'usd'
    };

    stripe.charges.create(body, (stripeError, stripeRes) => {
        if (stripeError) {
            res.status(500).send({error: stripeError});
        } else {
            res.status(200).send({success: stripeRes});
        }
    })
})
