var log4js = require('log4js');

log4js.configure({
	appenders: {
		'console': {
			type: 'console'
		},
		'b': {
			type: 'stdout'
		},
		'log_file': {
			type: 'file',
			filename: __dirname + 'logs/test.log',
			maxLogSize: 10,
			encoding: 'utf-8',
		},
		'log_date': {
			type: "dateFile",
			filename: __dirname + 'logs/dateFileTest',
			alwaysIncludePattern: true,
			pattern: "-yyyy-MM-dd-hh.log",
			encoding: 'utf-8',
		}
	},
	replaceConsole: true,
	categories: {
		'log_file': {
			appenders: ['log_file'],
			level: 'info'
		},
		default: {
			appenders: ['log_file'],
			level: 'info'
		}
	}
});

/*log4js.configure({
    appenders: {
        ruleConsole: {
        	type: 'console'
        },
        ruleFile: {
            type: 'dateFile',
            filename: 'logs/server-',
            pattern: 'yyyy-MM-dd.log',
            maxLogSize: 10 * 1000 * 1000,
            numBackups: 3,
            alwaysIncludePattern: true
        }
    },
    categories: {
        default: {
        	appenders: ['ruleConsole', 'ruleFile'], 
        	level: 'info'
        }
    }
});*/

//1.test
var logger = log4js.getLogger('log_file');
var logger1 = log4js.getLogger('log_date');
var logger2 = log4js.getLogger();

logger.info("this is a log4js test1111111111!");
logger1.info("this is a log4js test111111111!");
logger1.info("this is a log4js test23423111!");
logger2.info("Test");
//console.log("test test!!!");

//2.
/*var logger3 = log4js.getLogger();
logger3.debug("Time:", new Date());
console.log("test test!!!--");*/