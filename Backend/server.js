const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });


var app = require("./app");
const mongoose = require('mongoose');

const port = process.env.PORT || 3003;
app.set("port", port);

const logger = require('./utils/logger.js').logger;
const timer = require('./utils/timer.js');




const connectDatabase = async () => {
  try {
    timer.time("connecting database");
    const DB = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD);
    const connect = await mongoose.connect(DB, {});
  } catch (error) {
    logger.error(`error in connecting database: ${error}`)
  }
  finally{
    timer.timeEnd("connecting database");
  }
}


const server = app.listen(port, () => {
  connectDatabase();
  logger.info(`App running on port ${port}...`);
});
