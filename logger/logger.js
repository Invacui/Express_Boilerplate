const path = require('path');

/**
 * Logger class colors
 */
const colors = {
  reset: "\x1b[0m",
  red: "\x1b[31m",
  blue: "\x1b[34m",
  yellow: "\x1b[33m",
  green: "\x1b[32m",
};

/**
 * Logger class
 *
 * @param {string} level
 * @param {string} message
 * @param {object} context
 * @returns {void}
 */
global.logger = {
  logMessage: (level, message, context = {}) => {
    // select color based on log level if not found use reset
    const color =
      {
        error: colors.red,
        debug: colors.blue,
        warn: colors.yellow,
        info: colors.green,
      }[level] || colors.reset;
    
    let {fileName , methodName , ...variables} = context;
    // Get the current file name safely from module.filename
     fileName = global.logger.getFileNameFromModule(context.fileName) || context.fileName || "unknown_file";

     methodName = context.methodName || "unknown_method";

    // Constructing the log message
    let variableStr = "";

    // New line for variables if they exist
    if (Object.keys(variables).length > 0) {
      variableStr = "\n[VARIABLES]: ";
      for (const [key, value] of Object.entries(variables)) {
        if (typeof value === "string" && value.startsWith("http")) {
          value = `${colors.underline}${colors.blue}${value}${colors.reset}`;  // Underline and color the link
        }
        variableStr += `\n  ${key}: ${JSON.stringify(value)}`;
      }
    }

    console.log(`${color}[${level.toUpperCase()}] [${fileName}] [${methodName}] ${message}${colors.reset}${variableStr}`);
  },

  // Helper function to get the file name from module.filename
  getFileNameFromModule: (fileName) => {
    if (!fileName) {
      return null;
    }
    return fileName.slice(fileName.lastIndexOf(path.sep) + 1); // Extracts the file name
  },

  error: (message, context) => global.logger.logMessage("error", message, context),
  debug: (message, context) => global.logger.logMessage("debug", message, context),
  warn: (message, context) => global.logger.logMessage("warn", message, context),
  info: (message, context) => global.logger.logMessage("info", message, context),
};
