const { MONGO_DB_HOST } = process.env;
const mongoose = require('mongoose');
const host = MONGO_DB_HOST || 'localhost';
const dbUrl = `mongodb://${host}`;
const port = process.env.RAW_DB_EXTERNAL_PORT || 27017;
const dbName = 'rawlogs';

function DbConnectionHandler() {
  const dbStr = `${dbUrl}:${port}/${dbName}`;
  console.log(`dbStr: ${dbStr}`);
  mongoose.connect(dbStr);

  mongoose.set('debug', true);

  this.connection = mongoose.connection;

  mongoose.connection.on('connected', () => {
    this.state = 'connected';
    console.log('raw storage db connected');
  });

  mongoose.connection.on('error', (err) => {
    this.state = 'disconnected';
    console.error(`db connection error ${err}`);
  });

  mongoose.connection.on('disconnected', () => {
    this.state = 'disconnected';
  });

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      this.state = 'disconnected';
      process.exit(0);
    });
  });
}

module.exports = new DbConnectionHandler();