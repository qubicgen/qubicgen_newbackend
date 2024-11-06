"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
const path_1 = __importDefault(require("path"));
// Set the log directory
const logDirectory = path_1.default.join(__dirname, 'logs');
// Create the logger
const logger = (0, winston_1.createLogger)({
    level: 'info', // Set log level (can be 'info', 'debug', 'error', etc.)
    format: winston_1.format.combine(winston_1.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
    }), winston_1.format.errors({ stack: true }), // Format for stack traces
    winston_1.format.splat(), winston_1.format.json() // Log format in JSON
    ),
    transports: [
        // Console log output
        new winston_1.transports.Console({
            format: winston_1.format.combine(winston_1.format.colorize(), winston_1.format.simple())
        }),
        // DailyRotateFile log output
        new winston_daily_rotate_file_1.default({
            filename: path_1.default.join(logDirectory, 'application-%DATE%.log'),
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true, // Compress old log files
            maxSize: '20m', // Max size of each log file
            maxFiles: '14d', // Keep logs for 14 days
            level: 'info'
        })
    ],
    exitOnError: false, // Do not exit on handled exceptions
});
// Export the logger
exports.default = logger;
