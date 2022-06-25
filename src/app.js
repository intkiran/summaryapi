const express = require('express');
const cors = require('cors');
const ErrorMiddleware = require('./middlewares/error');

const port = 3000;
const app = express();
const bodyParser = require('body-parser');
const routes = require('./routes/index.js');


// Adding BodyParser to parse the body of POST requests.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", routes);
// if error is not an instanceOf APIError, convert it.
app.use(ErrorMiddleware.converter);

// catch 404 and forward to error handler
app.use(ErrorMiddleware.notFound);

// error handler, send stacktrace only during development
app.use(ErrorMiddleware.handler);


// allow cross origin requests
// configure to only allow requests from certain origins

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    );
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept',
    );
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});



app.listen(port, (err) => {
    if (err) {
        return console.log('Error occured in Starting Server', err)
    }
    console.log(`Summary Service API listening at http://localhost:${port}`);
});



module.exports = app;
