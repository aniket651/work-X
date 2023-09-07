const dotenv = require('dotenv');
dotenv.config({path : './config.env'});


var app = require("./app");


const port = process.env.PORT || 3003;
app.set("port", port);

const server = app.listen(port, () => {
    console.log(`App running on port ${port}...`);
  });
