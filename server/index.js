// Required
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const massive = require("massive");
const session = require('express-session');
const dotenv = require("dotenv");
dotenv.config();
const middleware = require('./middlewares/middleware');
const authController = require('./controllers/authController');
const companyController = require('./controllers/companyController');

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

app.use(middleware.checkSession);

// ##### ENDPOINTS ######
// AUTH ENDPOINTS
app.get('/api/auth/me', authController.validate)
app.post('/api/auth/login', authController.login);
app.get('/api/auth/logout', authController.logout);
app.post('/api/auth/register', authController.register);

// COMPANY ENDPOINTS
app.post('/api/company', companyController.createNewCompany);
app.get('/api/company/:userID', companyController.getCompany);
app.put('/api/company', companyController.editCompany);
app.get('/api/departments', companyController.getDepartments);
app.post('/api/department', companyController.addDepartment);
app.get('/api/employees', companyController.getEmployees);

app.listen(SERVER_PORT, () => {
  console.log(`Creeping on Port: ${SERVER_PORT}`);
});

