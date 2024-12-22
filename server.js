// Get the logger
require('./logger/logger');

// Import Index to start the server
const App = require('./app');

// Import dotenv to use environment variables
const dotenv = require('dotenv');

// Load environment variables from Private.env
dotenv.config({ path: './Private.env' });

// Initialize the application
const app = new App().getApp();

// Explicitly define the port and base URL
const PORT = process.env.PORT || 3001;

// Variable 
const BASE_URL = process.env.BASE_URL;

// Start the server
app.listen(PORT, () => {
  global.logger.info(`Server started at ${BASE_URL}:${PORT}`, {
    fileName: module.filename,
    methodName: "startup",  // Explicitly passing methodName
    BaseUrl: BASE_URL,
    Port: PORT
  });
});
