// Initialize database configuration
const mongoose = require('mongoose');

/**
 * @class DbConfig
 * 
 * @description Initialize the database configuration
 * 
 * @method initDatabaseConfig - Initialize the database configuration
 */
class DbConfig {
  constructor() {
    this.MONGO_URI = MONGO_URI;
    this.DB_NAME = DB_NAME;
    this.initDatabaseConfig();
  }
    /**
   * Initialize database configuration
   */
    initDatabaseConfig() {
        mongoose.connect(this.MONGO_URI, {
          dbName: this.DB_NAME,
        })
          .then(() => {
            global.logger.info('Successfully connected to MongoDB', {
              fileName: module.filename,
              methodName: 'initDatabaseConfig',
            });
          })
          .catch((error) => {
            global.logger.error('Error connecting to MongoDB', {
              fileName: module.filename,
              methodName: 'initDatabaseConfig',
              error: error.message ,
            });
            process.exit(1); // Exit the process if DB connection fails
          });
      }
}
module.exports = DbConfig

// module.exports = DbConfig; // Default export
// module.exports.DbConfig = DbConfig; // Named export
