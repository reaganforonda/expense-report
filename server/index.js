// Required
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const massive = require("massive");
const session = require('express-session');
const dotenv = require("dotenv");
dotenv.config();
const authController = require('./controllers/authController');

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(`${__dirname}/../build`));

const {
    SERVER_PORT,
    SECRET_SESSION,
    CONNECTION_STRING
} = process.env;

massive(CONNECTION_STRING).then(dbInstance => {
    app.set("db", dbInstance);
}).catch(e => console.log(`Error: ${e}`));


app.use(
    session({
        secret: SECRET_SESSION,
        resave: false,
        saveUninitialized: true
    })
);


// ##### ENDPOINTS ######
// AUTH ENDPOINTS
app.get('/api/auth/me', authController.validate)
app.post('/api/auth/login', authController.login);
app.get('/api/auth/logout', authController.logout);
app.post('/api/auth/register', authController.register);


app.listen(SERVER_PORT, () => {
  console.log(`Creeping on Port: ${SERVER_PORT}`);
});

