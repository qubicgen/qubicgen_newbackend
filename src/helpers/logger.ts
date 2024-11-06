import { createLogger, format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import path from 'path';

// Set the log directory
const logDirectory = path.join(__dirname, 'logs');

// Create the logger
const logger = createLogger({
  level: 'info', // Set log level (can be 'info', 'debug', 'error', etc.)
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.errors({ stack: true }),  // Format for stack traces
    format.splat(),
    format.json()  // Log format in JSON
  ),
  transports: [
    // Console log output
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.simple()
      )
    }),

    // DailyRotateFile log output
    new DailyRotateFile({
      filename: path.join(logDirectory, 'application-%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true, // Compress old log files
      maxSize: '20m',      // Max size of each log file
      maxFiles: '14d',     // Keep logs for 14 days
      level: 'info'
    })
  ],
  exitOnError: false, // Do not exit on handled exceptions
});

// Export the logger
export default logger;
