const dotenv = require('dotenv');
dotenv.config({path : './config.env'});


var app = require("./app");


const port = process.env.PORT || 3003;
app.set("port", port);

try {
  const DB = process.env.DATABASE.replace('<password>',process.env.DATABASE_PASSWORD);
  const connect = await mongoose.connect(DB,{});
} catch (error) {
  console.log(`error in connecting database: ${error}`)
}


const server = app.listen(port, () => {
    console.log(`App running on port ${port}...`);
  });
