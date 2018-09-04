// Required
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const massive = require("massive");
const dotenv = require("dotenv");
dotenv.config();

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(`${__dirname}/../build`));

const {

} = process.env;

massive(process.env.CONNECTION_STRING)
  .then(dbInstance => {
    app.set("db", dbInstance);
  })
  .catch(e => console.log(`Error: ${e}`));




  
// ##### ENDPOINTS ######

app.listen(port, () => {
  console.log(`Creeping on Port: ${port}`);
});

