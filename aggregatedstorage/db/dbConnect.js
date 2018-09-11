const mongoose = require('mongoose');
const dbHost = process.env.MONGO_DB_HOST || 27017;
const dbUrl = `mongodb://${dbHost}`;
const port = process.env.AGGREGATED_DB_EXTERNAL_PORT || 27017;
const dbName = 'aggregatedlogs';

function DbConnectionHandler() {
  mongoose.connect(`${dbUrl}:${port}/${dbName}`);

  mongoose.set('debug', true);

  this.connection = mongoose.connection;

  mongoose.connection.on('connected', () => {
    this.state = 'connected';
    console.log('aggregated storage db connected');
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