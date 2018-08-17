const mongoose = require('mongoose');
const dbUrl = 'mongodb://localhost';
const port = process.env.RAW_DB_EXTERNAL_PORT;
const dbName = 'rawlogs';

function DbConnectionHandler() {
  mongoose.connect(`${dbUrl}:${port}/${dbName}`);

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