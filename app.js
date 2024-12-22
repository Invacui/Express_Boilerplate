// Import BodyParser and Express
const bodyParser = require('body-parser');

// Import CORS
const cors = require('cors');

// Import DbConfig
const DbConfig = require('./db/db.config');

// Import Express and other required modules
const express = require('express');

// Import env
const dotenv = require('dotenv');

// Import routes
const routes  = require('./routes'); // Assuming routes and authorizer context are imported from other files

/**
 * Main application class
 * 
 * @class App
 * 
 * @description Initialize the Express app, set up middleware, database, routes, and error handling
 */
class App {
  // Variables 
  MONGO_URI
  DB_NAME

  constructor() {
    // Initialize environment variables
    this.loadEnvVariables();

    // Initialize Express app
    this.app = express();

    // Set up application middleware, database, routes, and error handling
    this.defineGlobals();
    this.dbConfig = new DbConfig(); // Initialize the database configuration
    this.registerMiddleWares();
    this.registerAppRoutes();
    this.registerErrorHandlingRoutes();

    // Log middleware registration success
    global.logger.info('Middleware registered successfully', {
      fileName: module.filename,
      methodName: 'registerMiddleWares',
    });
  }

  /**
   * Load environment variables from .env file
   */
  loadEnvVariables() {
    dotenv.config({ path: './Private.env' });

    // Validate environment variables
    this.MONGO_URI = process.env.MONGO_URI || '';
    this.DB_NAME = process.env.DB_NAME || '';

    if (!this.MONGO_URI || !this.DB_NAME) {
      throw new Error('Missing required environment variables: MONGO_URI or DB_NAME');
    }
  }

  /**
   * Define global variables required for the application
   */
  defineGlobals() {
    // Define any global variables here (if required)
    // Variables 
        // If required, define any global variables here
        global.MONGO_URI = this.MONGO_URI;
        global.DB_NAME = this.DB_NAME;
    
  }


  /**
   * Register necessary middlewares
   */
  registerMiddleWares() {
    // Use CORS to allow requests from all origins (adjust as needed)
    this.app.use(cors({ origin: '*' }));

    // Parse incoming URL-encoded data
    this.app.use(bodyParser.urlencoded({ extended: false }));

    // Parse incoming JSON data
    this.app.use(express.json());
  }

  /**
   * Register application routes
   */
  registerAppRoutes() {
    this.app.use('/', routes);
  }

  /**
   * Register error handling routes (catch-all)
   */
  registerErrorHandlingRoutes() {
    this.app.use((req, res, next) => {
      res.status(404).json({ message: 'Route not found' });
    });

    this.app.use((error, req, res, next) => {
      global.logger.error('Unhandled error', {
        fileName: module.filename,
        methodName: 'registerErrorHandlingRoutes',
        variables: { error: error.message },
      });
      res.status(500).json({ message: 'Internal Server Error' });
    });
  }

   // Expose Express app instance for server to start listening
   getApp() {
    return this.app;
  }
}

module.exports = App;