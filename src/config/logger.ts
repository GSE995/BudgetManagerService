import * as winston from 'winston' 
import * as appRoot from 'app-root-path'

let fileLogger = new winston.transports.File({
	level: 'info',
	filename: `${appRoot}/logs/app.log`,
	handleExceptions: true,
	maxsize: 5242880, // 5MB
	maxFiles: 5
})

let consoleLogger = new winston.transports.Console({
	level: 'debug',
	handleExceptions: true
})

let logger = winston.createLogger({
	transports: [
		fileLogger,
		consoleLogger
	],
	format: winston.format.json(),
	exitOnError: false
})

export default logger